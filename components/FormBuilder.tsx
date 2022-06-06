import { FunctionComponent, useEffect, useRef, useState } from "react";

import "formeo/dist/formeo.min.css";
import { Button } from "./Button/Button";
import { Editor } from "./Editor";
import { typeRapport } from "../helpers/dictionnary";

const FormBuilder: FunctionComponent<{ formData?: any }> = ({ formData }) => {
  const [formName, setFormName] = useState("");
  const [formeo, setFormeo] = useState<any>();
  const [content, setContent] = useState<string>("");
  const [type, setType] = useState(typeRapport.Intranet);
  const editor = useRef<any>();
  useEffect(() => {
    const findFormeo = async () => {
      const result = await import("formeo");
      setFormeo(result);
    };
    findFormeo();
    if (formeo) {
      editor.current = new formeo.FormeoEditor(
        {
          editorContainer: ".editor-wrap",
          actions: {
            onSave: console.log,
          },
          controls: {
            disable: {
              elements: [
                "hidden",
                "upload",
                "radio",
                "checkbox",
                "button",
                "select",
              ],
            },
            groupOrder: ["common", "html"],
          },
        },
        formData?.form
      );
      if (formData && formData?.textToEdit) {
        setFormName(formData?.nom);
        setContent(formData?.textToEdit.text);
        setType(formData?.type);
      }
    }
  }, [formeo, formData?.textToEdit?.text, formData]);

  return (
    <div className="w-full px-6 xl:px-96 flex gap-4">
      <form className="w-full flex flex-col gap-6">
        <div className="flex py-2">
          <label
            htmlFor="nomForm"
            className="text-xl border-2 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap"
          >
            Nom du fomulaire (ex: Arrestation)
          </label>
          <input
            id="nomForm"
            name="nomForm"
            className="border-2 rounded-r px-4 py-2 w-full"
            type="text"
            value={formName}
            required
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Nom du formulaire...."
          />
        </div>
        <div className="editor-wrap"></div>
        <div>
          <ul className="flex gap-6">
            <li
              className={`bg-white rounded-lg p-2 cursor-pointer ${
                typeRapport.Intranet === type
                  ? "border-b-8 border-green-300"
                  : ""
              }`}
              onClick={() => setType(typeRapport.Intranet)}
            >
              Intranet
            </li>
            <li
              className={`bg-white rounded-lg p-2 cursor-pointer ${
                typeRapport.MDC === type ? "border-b-8 border-green-300" : ""
              }`}
              onClick={() => setType(typeRapport.MDC)}
            >
              MDC
            </li>
            <li
              className={`bg-white rounded-lg p-2 cursor-pointer ${
                typeRapport.Forum === type ? "border-b-8 border-green-300" : ""
              }`}
              onClick={() => setType(typeRapport.Forum)}
            >
              Forum
            </li>
          </ul>
        </div>
        <div className="bg-white">
          {typeRapport.Intranet === type ? (
            <textarea
              className="w-full h-96 flex"
              placeholder="Mettre le BBCode à modifier ici"
              value={content}
              onChange={(value) => setContent(value.target.value)}
            />
          ) : (
            <Editor content={content} setContent={setContent} />
          )}
        </div>
        <Button
          onClick={() => {
            if (formName) {
              !formData
                ? fetch("/api/forms/create", {
                    method: "POST",
                    body: JSON.stringify({
                      nom: formName,
                      type,
                      form: editor?.current?.formData,
                      textToEdit: { text: content},
                    }),
                  })
                : fetch("/api/forms/update", {
                    method: "PUT",
                    body: JSON.stringify({
                      oldName: formData?.id,
                      type,
                      nom: formName,
                      form: editor?.current?.formData,
                      textToEdit: { text: content},
                    }),
                  });
            }
          }}
        >
          Sauvegarder le formulaire
        </Button>
      </form>
    </div>
  );
};

export { FormBuilder };
