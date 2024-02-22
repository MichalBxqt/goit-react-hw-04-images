import css from './ImageGallery.module.css';
export const ImageGallery = props => {
  return <ul className={css.imageGallery}>{props.children}</ul>;
};
