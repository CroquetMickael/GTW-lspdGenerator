import dynamic from "next/dynamic";
import { Dispatch, FunctionComponent, SetStateAction } from "react";

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

export { Editor };
