// @ts-nocheck
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button/Button";
import "formeo/dist/formeo.min.css";
import { Layout } from "../../Layout/Layout";

const Post = () => {
  const [formeo, setFormeo] = useState<any>();
  const renderer = useRef<any>();
  const router = useRouter();
  const { name } = router.query;
  const textTomodify = useRef("");
  const [textModified, setTextModified] = useState("");

  useEffect(() => {
    const findFormeo = async () => {
      const result = await import("formeo");
      setFormeo(result);
    };
    findFormeo();
  }, []);

  useEffect(() => {
    if (name && formeo) {
      fetch(`/api/forms/${name}`)
        .then((res) => res)
        .then((data: any) => data.json())
        .then((formData) => {
          renderer.current = new formeo.FormeoRenderer({
            renderContainer: ".formeo-wrap",
          });
          renderer.current?.render(formData.form);
          textTomodify.current = formData.textToEdit;
        });
    }
  }, [formeo, name]);

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
        finalValues.push(values.join("\n"));
      } else {
        formItem.querySelectorAll("textarea, input").forEach((input) => {
          finalValues.push(input?.value);
        });
      }
    });
    const formatedValues = finalValues.filter((value) => value !== undefined);
    console.log(finalValues);
    formatedValues.forEach((value: any, index) => {
      const localIndex = index + 1;
      localtext = localtext.replace(`{${localIndex}}`, value);
    });
    setTextModified(localtext);
  };
  return (
    <Layout>
      <form className="formeo-wrap" id="form"></form>
      <label className="text-white flex flex-col w-1/2">
        Formulaire :
        <textarea
          className="h-full text-black whitespace-pre-wrap"
          value={textModified}
        />
      </label>
      <Button onClick={() => onClickButton()}>Générer</Button>
    </Layout>
  );
};

export default Post;
