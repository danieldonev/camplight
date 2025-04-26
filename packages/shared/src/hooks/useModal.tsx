import { useState, useCallback, memo } from 'react';
import { Modal } from '../molecules/Modal';

interface ModalState {
  isOpen: boolean;
  component: React.ReactNode | null;
  title?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const useModal = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    component: null,
  });

  const openModal = useCallback(
    (
      component: React.ReactNode,
      options?: { title?: string; maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }
    ) => {
      setModalState({
        isOpen: true,
        component,
        title: options?.title,
        maxWidth: options?.maxWidth,
      });
    },
    []
  );

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const ModalComponent = memo(() => (
    <Modal
      open={modalState.isOpen}
      onClose={closeModal}
      title={modalState.title}
      maxWidth={modalState.maxWidth}
    >
      {modalState.component}
    </Modal>
  ));

  return {
    openModal,
    closeModal,
    ModalComponent,
  };
};
