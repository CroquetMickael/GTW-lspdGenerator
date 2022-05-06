import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormBuilder } from "../../../components/FormBuilder";
import { Layout } from "../../../Layout/Layout";

const Home: NextPage = () => {
  const [currentForm, setCurrentForm] = useState({
    form: undefined,
  });
  const router = useRouter();
  const { name } = router.query;
  useEffect(() => {
    if (name) {
      fetch(`/api/forms/${name}`)
        .then((res) => res.json())
        .then((data: any) => setCurrentForm(data));
    }
  }, [name]);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <FormBuilder formData={currentForm} />
      </Layout>
    </>
  );
};

export default Home;