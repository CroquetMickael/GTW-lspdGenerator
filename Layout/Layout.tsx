import { FunctionComponent, PropsWithChildren } from "react";
import { Sidebar } from "./Sidebar";

export const Layout: FunctionComponent<PropsWithChildren<any>> = ({ children }) => (
  <div className="md:flex md:min-h-screen w-full">
    <Sidebar />
    <main className="main">
      {children}
      <footer className="w-full justify-center flex">
        Made by @Haze for LSPD GTW 2022-2023
      </footer>
    </main>
  </div>
);
