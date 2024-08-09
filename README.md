<!-- omit in toc -->
# `@coinhall/wallet-adapter-wc`

Web Component wrapper around [@jup-ag/wallet-adapter](https://github.com/TeamRaccoons/Unified-Wallet-Kit), allowing it to be imported into **any** web framework (ie. not just React).

- [Usage](#usage)
  - [SolidJS Example](#solidjs-example)
- [Contributing](#contributing)
  - [Further Improvements](#further-improvements)

## Usage

### SolidJS Example

```tsx
import { Component, onCleanup, onMount } from "solid-js";
import { subscribeToWalletEvents } from "@coinhall/wallet-adapter-wc";

const Wallet: Component = () => {
  onMount(() => {
    // 1) Subscribe to wallet events
    const unsubscribe = subscribeToWalletEvents((event) => {
      switch (event.type) {
        case "onConnecting":
          console.log("connecting status changed", event.isConnecting);
          return;
        case "onWalletChanged":
          console.log("wallet changed", event.wallet);
          return;
        default:
          return;
      }
    });

    // 2) Unsubscribe from wallet events on cleanup
    onCleanup(() => unsubscribe());

    // 3) Import the web component after subscribing to wallet events
    import("@coinhall/wallet-adapter-wc");
  });

  return <unified-wallet-web-component />;
};

export default Wallet;
```

## Contributing

### Further Improvements

- Fix linting issues (eg. running `pnpm lint`)
- Handle for more events and actions where necessary
