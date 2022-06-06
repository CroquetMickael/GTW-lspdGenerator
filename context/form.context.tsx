import {
  createContext,
  useEffect,
  useState,
  FunctionComponent,
  PropsWithChildren,
  useContext,
} from "react";

const FormContext = createContext({
  forms: [],
});

const FormProvider: FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [forms, setForms] = useState([]);
  useEffect(() => {
    fetch("/api/forms")
      .then((result) => result.json())
      .then((forms) => setForms(forms));
  }, []);

  return (
    <FormContext.Provider
      value={{
        forms,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

const useForm = () => useContext(FormContext);

export { FormContext, FormProvider, useForm };
