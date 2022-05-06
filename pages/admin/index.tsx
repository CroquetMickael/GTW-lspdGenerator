import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormBuilder } from "../../components/FormBuilder";
import { Modal } from "../../components/Modal/Modal";
import { useModal } from "../../hooks/useModal";
import { Layout } from "../../Layout/Layout";

const Home: NextPage = () => {
  const [deleteName, setDeleteName] = useState("");
  const [forms, setForms] = useState([]);
  const { isOpen, openModal } = useModal();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/forms")
      .then((result) => result.json())
      .then((forms) => setForms(forms));
  }, []);

  const deleteForm = () => {
    fetch("/api/forms/delete", {
      method: "DELETE",
      body: JSON.stringify({
        name: deleteName,
      }),
    })
      .then((result) => router.reload())
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal
        isOpen={isOpen}
        openModal={openModal}
        action={deleteForm}
        title="Retrait de formulaire"
      >
        <p>Vous êtes sur le point de retirer le formulaire {deleteName}.</p>
        <p>êtes-vous sur de votre action ?</p>
      </Modal>
      <Layout>
        <div className="w-full xl:w-1/3">
          <table className="w-full bg-white shadow-md rounded">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-2 px-5">Rapport</th>
                <th className="text-left p-2 px-5">Type</th>
                <th></th>
              </tr>
              {forms?.map((form: { nom: string; isBBCode: boolean }) => (
                <tr key={form.nom} className="border-b">
                  <td className="p-2 px-5 text-xl">{form.nom}</td>
                  <td className="p-2 px-5 text-xl">
                    {form.isBBCode ? "Intranet" : "MDC"}
                  </td>
                  <td className="p-2 px-5 flex justify-end">
                    <a
                      href={`/admin/form/${form.nom.toLocaleLowerCase()}`}
                      type="button"
                      className="mr-3  bg-blue-500 hover:bg-blue-700 text-white p-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Editer
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        openModal();
                        setDeleteName(form.nom);
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white p-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <a
            href={`/admin/form`}
            type="button"
            className="mt-3 flex justify-center bg-blue-500 hover:bg-blue-700 text-white p-2 rounded focus:outline-none focus:shadow-outline"
          >
            Ajouter un formulaire
          </a>
        </div>
      </Layout>
    </>
  );
};

export default Home;