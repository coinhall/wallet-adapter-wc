import {
  UnifiedWalletButton,
  UnifiedWalletProvider,
  useWallet,
  Wallet,
} from "@jup-ag/wallet-adapter";
import { useEffect } from "react";

type Props = {
  onWalletChanged: (wallet: Wallet | null) => any;
};

export const CustomComponent = (props: Props) => (
  <UnifiedWalletProvider
    wallets={[]}
    config={{
      autoConnect: true,
      env: "mainnet-beta",
      metadata: {
        name: "UnifiedWallet",
        description: "UnifiedWallet",
        url: "https://jup.ag",
        iconUrls: ["https://jup.ag/favicon.ico"],
      },
      walletlistExplanation: {
        href: "https://station.jup.ag/docs/additional-topics/wallet-list",
      },
      theme: "jupiter",
      lang: "en",
    }}
  >
    <Button {...props} />
  </UnifiedWalletProvider>
);

const Button = (props: Props) => {
  const { wallet } = useWallet();

  useEffect(() => {
    props.onWalletChanged(wallet);
  }, [wallet]);

  return <UnifiedWalletButton />;
};
