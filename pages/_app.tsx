import "../styles/globals.css";
import type { AppProps } from "next/app";
import { FormProvider } from "../context/form.context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FormProvider>
      <Component {...pageProps} />
    </FormProvider>
  );
}

export default MyApp;
