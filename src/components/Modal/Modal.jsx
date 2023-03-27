import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, ImageContainer } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ src, alt, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const onKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={onBackdropClick}>
      <ImageContainer>
        <img src={src} alt={alt} />
      </ImageContainer>
    </Overlay>,
    modalRoot
  );
};
