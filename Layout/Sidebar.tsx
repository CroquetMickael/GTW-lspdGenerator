import { useEffect, useState } from "react";
import { useForm } from "../context/form.context";
import { typeRapport } from "../helpers/dictionnary";
import Image from "next/image";
import LSPDIcon from "../public/lspd.png";
import useLocalStorage from "../hooks/useLocalStorage";
import { FaCopy } from "react-icons/fa";
import { Tooltip } from "../components/Tooltip";

type Links = {
  label: string;
  link: string;
  mdc?: boolean;
};

const Sidebar = () => {
  const [mdcLinks, setMdcLinks] = useState<Links[]>();
  const [intranetLinks, setIntranetLinks] = useState<Links[]>();
  const [forumLinks, setForumLinks] = useState<Links[]>();
  const { value: name, setLocalValue: setName } = useLocalStorage("name");
  const [copySuccess, setCopySuccess] = useState("Copier");
  const { forms } = useForm();
  useEffect(() => {
    const links = forms?.map((form: any) => {
      return {
        label: `Formulaire ${form.nom}`,
        type: form.type,
        link: `/form/${form.id}`,
      };
    });
    const mdcLinks = links.filter((link) => link.type === typeRapport.MDC);
    const intranetLinks = links.filter(
      (link) => link.type === typeRapport.Intranet
    );
    const ForumLinks = links.filter((link) => link.type === typeRapport.Forum);
    setIntranetLinks(intranetLinks);
    setMdcLinks(mdcLinks);
    setForumLinks(ForumLinks);
  }, [forms]);

  return (
    <nav className="flex-grow flex justify-between bg-white flex-col px-4 pb-4 md:pb-0 md:overflow-y-auto border-r-2 border-white">
      <div className="flex flex-col w-full p-2">
        <div className="flex items-center justify-center">
          <Image src={LSPDIcon} className="text-center" alt="lspdlogo" />
        </div>
        <h2 className="font-bold text-xl py-4">Générateur de rapport</h2>
        <h3 className="font-semibold text-lg">Rapport MDC</h3>
        {mdcLinks?.map((link) => (
          <a
            key={link.label}
            className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            href={link.link}
          >
            {link.label}
          </a>
        ))}
        <hr className="my-4" />
        <h3 className="font-semibold text-lg">Rapport Intranet</h3>
        {intranetLinks?.map((link) => (
          <a
            key={link.label}
            className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            href={link.link}
          >
            {link.label}
          </a>
        ))}
        <hr className="my-4" />
        <h3 className="font-semibold text-lg">Rapport Forum GTW</h3>
        {forumLinks?.map((link) => (
          <a
            key={link.label}
            className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            href={link.link}
          >
            {link.label}
          </a>
        ))}
      </div>
      <div>
        {sessionStorage.getItem("isLogged") === "true" && (
          <a
            className="block px-4 py-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            href={"/admin"}
          >
            Panneau admin
          </a>
        )}
        <div className="flex py-2 mb-4 justify-center items-center">
          <input
          className="mx-2 border-b-2 border-b-blue-800"
            value={name || ""}
            placeholder="Grade Nom Prénom"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <Tooltip message={copySuccess}>
            <button
              onClick={() => {
                navigator.clipboard.writeText(name || "");
                setCopySuccess("Copié");
                setTimeout(() => {
                  setCopySuccess("Copier");
                }, 2000);
              }}
            >
              <FaCopy />
            </button>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
};

export { Sidebar };
