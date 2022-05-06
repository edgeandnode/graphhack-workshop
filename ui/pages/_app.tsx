import type { AppProps } from "next/app";
import { createClient, Provider } from "wagmi";
import { ThemeProvider } from "theme-ui";

import { theme } from "../src/theme";

import "../styles/globals.css";

const client = createClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Provider client={client}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}
