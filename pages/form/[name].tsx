// @ts-nocheck
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button/Button";
import "formeo/dist/formeo.min.css";
import { Editor } from "../../components/Editor";
import { typeRapport } from "../../helpers/dictionnary";
import { useForm } from "../../context/form.context";

const Post = () => {
  const [formeo, setFormeo] = useState<any>();
  const { forms } = useForm();
  const renderer = useRef<any>();
  const router = useRouter();
  const { name } = router.query;
  const textTomodify = useRef("");
  const [textModified, setTextModified] = useState("");
  const [type, setType] = useState("");
  const input = useRef();

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
      }
    }
  }, [formeo, forms, name, forms.length]);

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
      {textTomodify.current === ""
        ? <p className="bg-red-400 p-8 text-white">Pas de rapport trouvé</p>
        : <>
          <label className=" flex flex-col w-1/2">
            <span className="text-white">Formulaire Généré :</span>
            {type === typeRapport.Intranet ? (
              <textarea
                ref={input}
                className="h-full text-black whitespace-pre-wrap"
                value={textModified}
              />
            ) : (
              <Editor
                ref={input}
                content={textModified}
                setContent={setTextModified}
              />
            )}
          </label>
          <div className="flex gap-6">
            <Button onClick={() => onClickButton()}>Générer</Button>
          </div>
        </>
      }
    </>
  );
};

export default Post;
