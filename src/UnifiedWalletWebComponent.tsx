import {
  UnifiedWalletButton,
  UnifiedWalletProvider,
  type Wallet,
  useUnifiedWallet,
  useUnifiedWalletContext,
} from "@jup-ag/wallet-adapter";
import { useEffect } from "react";

export type WalletEvent =
  | {
      type: "onWalletChanged";
      wallet: Wallet | null;
    }
  | {
      type: "onConnecting";
      isConnecting: boolean;
    };

export type WalletAction = {
  type: "setShowModal";
  showModal: boolean;
};

/**
 * The name of the event that is fired whenever an event from within this web
 * component is emitted.
 */
const WALLET_EVENT_TYPE = "@coinhall/wallet-adapter-wc:wallet-event";

/**
 * The name of the event that should be fired to perform an action within this
 * web component.
 */
const WALLET_ACTION_TYPE = "@coinhall/wallet-adapter-wc:wallet-action";

/**
 * Subscribes to events that can be emitted by this web component. Returns an
 * `unsubscribe` callback that should be called when the subscription is no longer
 * needed.
 */
export function subscribeToWalletEvents(cb: (event: WalletEvent) => unknown) {
  const onEvent = (event: Event) => {
    if (!(event instanceof CustomEvent)) {
      return;
    }
    const { detail } = event as CustomEvent<WalletEvent>;
    cb(detail);
  };
  window.addEventListener(WALLET_EVENT_TYPE, onEvent);
  return () => window.removeEventListener(WALLET_EVENT_TYPE, onEvent);
}

/**
 * Invokes an action on the web component.
 */
export function invokeWalletAction(action: WalletAction) {
  window.dispatchEvent(
    new CustomEvent<WalletAction>(WALLET_ACTION_TYPE, { detail: action })
  );
}

/**
 * Subscribes to actions that can be emitted by consumers of this web component.
 */
function subscribeToWalletActions(cb: (event: WalletAction) => unknown) {
  const onAction = (event: Event) => {
    if (!(event instanceof CustomEvent)) {
      return;
    }
    const { detail } = event as CustomEvent<WalletAction>;
    cb(detail);
  };
  window.addEventListener(WALLET_ACTION_TYPE, onAction);
  return () => window.removeEventListener(WALLET_ACTION_TYPE, onAction);
}

/**
 * Emit events to consumers of this web component.
 */
function emitWalletEvent(event: WalletEvent) {
  window.dispatchEvent(
    new CustomEvent<WalletEvent>(WALLET_EVENT_TYPE, { detail: event })
  );
}

export const UnifiedWalletWebComponent = () => (
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
    <Button />
  </UnifiedWalletProvider>
);

const Button = () => {
  const { connecting, wallet, publicKey } = useUnifiedWallet();
  const { setShowModal } = useUnifiedWalletContext();

  useEffect(() => {
    emitWalletEvent({
      type: "onConnecting",
      isConnecting: connecting,
    });
  }, [connecting]);

  /**
   * We depend on `publicKey` instead of `wallet` as depending on `wallet` will
   * NOT trigger the effect when the public key stored within the wallet mutates.
   *
   * This effect will thus trigger for the following cases:
   * 1. Wallet is fully connected
   * 2. Wallet is fully disconnected
   * 3. Wallet account changes
   */
  useEffect(() => {
    emitWalletEvent({
      type: "onWalletChanged",
      wallet: wallet,
    });
  }, [publicKey]);

  useEffect(() => {
    const unsubscribe = subscribeToWalletActions((action: WalletAction) => {
      switch (action.type) {
        case "setShowModal":
          setShowModal(action.showModal);
          return;
        default:
          return;
      }
    });
    return () => unsubscribe();
  }, [setShowModal]);

  return <UnifiedWalletButton />;
};
