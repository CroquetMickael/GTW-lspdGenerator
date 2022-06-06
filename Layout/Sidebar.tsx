import { useEffect, useState } from "react";
import { useForm } from "../context/form.context";
import { typeRapport } from "../helpers/dictionnary";

type Links = {
  label: string;
  link: string;
  mdc?: boolean;
};

const Sidebar = () => {
  const [mdcLinks, setMdcLinks] = useState<Links[]>();
  const [intranetLinks, setIntranetLinks] = useState<Links[]>();
  const [forumLinks, setForumLinks] = useState<Links[]>();
  const { forms } = useForm();
  useEffect(() => {
    const links = forms.map((form: any) => {
      return {
        label: `Formulaire ${form.nom}`,
        type: form.type,
        link: `/form/${form.id}`,
      };
    });
    const mdcLinks = links.filter(
      (link) => link.type === typeRapport.MDC
    );
    const intranetLinks = links.filter((link) => link.type === typeRapport.Intranet);
    const ForumLinks = links.filter((link) => link.type === typeRapport.Forum);
    setIntranetLinks(intranetLinks);
    setMdcLinks(mdcLinks);
    setForumLinks(ForumLinks);
  }, [forms]);

  return (
    <nav className="flex-grow bg-white md:block px-4 pb-4 md:pb-0 md:overflow-y-auto border-r-2 border-white">
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
    </nav>
  );
};

export { Sidebar };
