import r2wc from "@r2wc/react-to-web-component";

import { UnifiedWalletWebComponent } from "./UnifiedWalletWebComponent";

customElements.define(
  "unified-wallet-web-component",
  r2wc(UnifiedWalletWebComponent)
);

export {
  subscribeToWalletEvents,
  invokeWalletAction,
  type WalletEvent,
  type WalletAction,
} from "./UnifiedWalletWebComponent";
