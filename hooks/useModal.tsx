import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    openModal: () => setIsOpen(!isOpen),
  };
};

export { useModal };
