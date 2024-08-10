import r2wc from "@r2wc/react-to-web-component";

import { WalletAdapter } from "./WalletAdapter";

customElements.define("unified-wallet-web-component", r2wc(WalletAdapter));
