"use client";
import { useEffect, useState } from "react";
import { createWalletClient, custom } from "viem";
import { mainnet } from "viem/chains";

const walletClient = createWalletClient({
  transport: custom(window.ethereum),
});

export default function Home() {
  const [accounts, setAccounts] = useState<string[] | string>();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        // Request user's addresses from MetaMask
        const accountsList = await walletClient.requestAddresses();
        setAccounts(accountsList);
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
        setAccounts("Error fetching accounts");
      }
    };

    fetchAccounts();
  }, []);

  const handleConnectWallet = async () => {
    try {
      // Request user's addresses from MetaMask
      const accountsList = await walletClient.requestAddresses();
      setAccounts(accountsList);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setAccounts("Error connecting wallet");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <button onClick={handleConnectWallet}>Connect Wallet</button>
      <p>
        Accounts: {Array.isArray(accounts) ? accounts.join(", ") : accounts}
      </p>
      <p>Balance:</p>
    </main>
  );
}
