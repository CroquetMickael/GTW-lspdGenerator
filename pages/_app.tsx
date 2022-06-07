import "../styles/globals.css";
import type { AppProps } from "next/app";
import { FormProvider } from "../context/form.context";
import { Layout } from "../Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FormProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </FormProvider>
  );
}

export default MyApp;
