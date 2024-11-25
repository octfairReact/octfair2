import React, { createContext, useContext, useState, FC, ReactNode } from "react";
import { Modal, Button } from "react-bootstrap";

// Context 타입 정의
interface ConfirmModalContextType {
  showModal: (message: string, onConfirm: () => void) => void;
  hideModal: () => void;
}

const ConfirmModalContext = createContext<ConfirmModalContextType | null>(null);

export const useConfirmModal = () => {
  const context = useContext(ConfirmModalContext);
  if (!context) {
    throw new Error("useConfirmModal must be used within a ConfirmModalProvider");
  }
  return context;
};

export const ResumeModalConfirm: FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState<() => void>(() => () => {});

  const showModal = (message: string, onConfirm: () => void) => {
    setMessage(message);
    setOnConfirm(() => onConfirm);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setMessage("");
    setOnConfirm(() => () => {});
  };

  const handleConfirm = () => {
    onConfirm();
    hideModal();
  };

  return (
    <ConfirmModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal show={isVisible} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>
            취소
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </ConfirmModalContext.Provider>
  );
};
