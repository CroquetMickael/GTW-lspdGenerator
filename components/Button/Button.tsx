import { ButtonHTMLAttributes, FunctionComponent } from "react";

const Button: FunctionComponent<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <button
    {...props}
    className="p-2 pl-5 my-2 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300"
  >
    {children}
  </button>
);

export { Button };
