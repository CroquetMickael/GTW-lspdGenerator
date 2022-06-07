import {
  createContext,
  useEffect,
  useState,
  FunctionComponent,
  PropsWithChildren,
  useContext,
} from "react";
import useSWR from "swr";
import { Loadable } from "../components/Loadable";

const FormContext = createContext({
  forms: [],
});

const FormProvider: FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  
  const fetcher = async (
    input: RequestInfo,
    init: RequestInit,
    ...args: any[]
  ) => {
    const res = await fetch(input, init);
    return res.json();
  };

  const { data: forms, error } = useSWR("/api/forms", fetcher);

  return (
    <FormContext.Provider
      value={{
        forms,
      }}
    >
      <Loadable error={error} isLoading={!forms}>
        {children}
      </Loadable>
    </FormContext.Provider>
  );
};

const useForm = () => useContext(FormContext);

export { FormContext, FormProvider, useForm };
