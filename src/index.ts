import r2wc from "@r2wc/react-to-web-component";

import { CustomComponent } from "./CustomComponent";

customElements.define(
  "custom-component",
  r2wc(CustomComponent, {
    props: {
      onWalletChanged: "function",
    },
  })
);
