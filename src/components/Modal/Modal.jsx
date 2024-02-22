import React, { useEffect } from 'react';
import css from './Modal.module.css';
export const Modal = props => {
  useEffect(() => {
    const escFunction = event => {
      if (event.key === 'Escape') {
        props.closeModal();
      }
    };
    //componentDidMount()
    document.addEventListener('keydown', escFunction, false);
    console.log('addEventListener');
    return () => {
      //componentWillUnmount()
      document.removeEventListener('keydown', escFunction, false);
      console.log('removeEventListener');
    };
  }, [props]);

  return (
    <div
      className={css.overlay}
      onClick={() => {
        props.closeModal();
      }}
    >
      <div className={css.modal}>
        <img src={props.src} alt={props.alt} />
      </div>
    </div>
  );
};
