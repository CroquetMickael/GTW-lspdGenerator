import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import "formeo/dist/formeo.min.css";
import { Button } from "./Button/Button";
import dynamic from "next/dynamic";

const Editor: FunctionComponent<{
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}> = ({ content, setContent }) => {
  const importJodit = () => import("jodit-react");

  const JoditEditor = dynamic(importJodit, {
    ssr: false,
  });

  return (
    <JoditEditor
      value={content}
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => {}}
    />
  );
};

const FormBuilder: FunctionComponent<{ formData?: any }> = ({ formData }) => {
  const [formName, setFormName] = useState("");
  const [formeo, setFormeo] = useState<any>();
  const [content, setContent] = useState<string>("");
  const [isBBCode, setIsBBCode] = useState(false);
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
      setFormName(formData?.nom);
      setContent(formData?.textToEdit);
      setIsBBCode(formData?.isBBCode);
    }
  }, [formeo, formData]);

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
                isBBCode ? "border-b-8 border-green-300" : ""
              }`}
              onClick={() => setIsBBCode(true)}
            >
              BBCode
            </li>
            <li
              className={`bg-white rounded-lg p-2 cursor-pointer ${
                !isBBCode ? "border-b-8 border-green-300" : ""
              }`}
              onClick={() => setIsBBCode(false)}
            >
              HTML
            </li>
          </ul>
        </div>
        <div className="bg-white">
          {isBBCode ? (
            <textarea
              className="w-full h-96 flex"
              placeholder="Mettre le BBCode à modifier ici"
              onChange={(value) => setContent(value.target.value)}
            >
              {content}
            </textarea>
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
                      isBBCode,
                      form: editor?.current?.formData,
                      textToEdit: content,
                    }),
                  })
                : fetch("/api/forms/update", {
                    method: "PUT",
                    body: JSON.stringify({
                      oldName: formData?.nom,
                      isBBCode,
                      nom: formName,
                      form: editor?.current?.formData,
                      textToEdit: content,
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
