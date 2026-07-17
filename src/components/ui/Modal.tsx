import { createPortal } from "react-dom";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {children}
    </div>,
    document.body,
  );
};

export default Modal;
