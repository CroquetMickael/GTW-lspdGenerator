// @ts-nocheck
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button/Button";
import "formeo/dist/formeo.min.css";
import { Editor } from "../../components/Editor";
import { typeRapport } from "../../helpers/dictionnary";
import { useForm } from "../../context/form.context";
import useLocalStorage from "../../hooks/useLocalStorage";

const Post = () => {
  const [formeo, setFormeo] = useState<any>();
  const { forms } = useForm();
  const renderer = useRef<any>();
  const router = useRouter();
  const { name } = router.query;
  const textTomodify = useRef("");
  const [textModified, setTextModified] = useState("");
  const [copySuccess, setCopySuccess] = useState("Copier le code");
  const [type, setType] = useState("");
  const input = useRef();
  const { value: grade } = useLocalStorage("grade");
  const { value: nom } = useLocalStorage("nom");
  const { value: prenom } = useLocalStorage("prenom");

  useEffect(() => {
    const findFormeo = async () => {
      const result = await import("formeo");
      setFormeo(result);
    };
    findFormeo();
  }, []);

  useEffect(() => {
    if (name && formeo && forms.length > 0) {
      const currentForm = forms.find((form: any) => form.id === name);
      if (currentForm) {
        textTomodify.current = currentForm.textToEdit.text;
        renderer.current = new formeo.FormeoRenderer({
          renderContainer: ".formeo-wrap",
        });
        renderer.current?.render(JSON.parse(currentForm.form));
        setType(currentForm.type);
        let input: HTMLInputElement;
        input = document.getElementById("officier");
        if (input) {
          input.value = `${grade} ${nom} ${prenom}`;
        }
        input = document.getElementById("grade");
        if (input) {
          input.value = `${grade}`;
        }
        input = document.getElementById("identite");
        if (input) {
          input.value = `${nom} ${prenom}`;
        }
      }
    }
  }, [formeo, forms, name, forms.length, grade, nom, prenom]);

  const onClickButton = () => {
    let localtext = textTomodify.current;
    const formWrapper = document?.getElementById("form");
    const form = formWrapper?.querySelectorAll(".formeo-row-wrap");
    const finalValues: string[] = [];
    form?.forEach((formItem) => {
      if (formItem.classList.contains("f-input-group-wrap")) {
        const values: string[] = [];
        formItem.querySelectorAll("textarea, input").forEach((textArea) => {
          values.push(textArea.value as string);
        });
        const valuesJoined =
          type === typeRapport.Intranet
            ? values.join("\n")
            : values.join("<br/>");
        finalValues.push(valuesJoined);
      } else {
        formItem.querySelectorAll("textarea, input").forEach((input) => {
          finalValues.push(input?.value);
        });
      }
    });
    const formatedValues = finalValues.filter((value) => value !== undefined);
    formatedValues.forEach((value: any, index) => {
      const localIndex = index + 1;
      localtext = localtext.replace(`{${localIndex}}`, value);
    });
    setTextModified(localtext);
  };

  return (
    <>
      <form className="formeo-wrap" id="form"></form>
      {textTomodify.current === "" ? (
        <p className="bg-red-400 p-8 text-white">Pas de rapport trouvé</p>
      ) : (
        <>
          <label className=" flex flex-col w-1/2">
            <span className="text-white">Formulaire Généré :</span>
            {type === typeRapport.Intranet ? (
              <textarea
                ref={input}
                className="h-96 text-black whitespace-pre-wrap"
                value={textModified}
              />
            ) : (
              <Editor
                ref={input}
                content={textModified}
                setContent={setTextModified}
              />
            )}
            <textarea id="copyText" className="hidden" value={textModified} />
          </label>
          {type === typeRapport.Forum && (
            <span className="text-white py-2">
              Pour les rapports Forum GTW, il faut copier manuellement.
            </span>
          )}
          <div className="flex gap-6">
            <Button onClick={() => onClickButton()}>Générer</Button>
            {type !== typeRapport.Forum && (
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(textModified);
                  setCopySuccess("Copie du code effectué :)");
                  setTimeout(() => {
                    setCopySuccess("Copier le code");
                  }, 2000);
                }}
              >
                {copySuccess}
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Post;
