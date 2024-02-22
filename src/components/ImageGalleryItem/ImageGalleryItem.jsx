import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = props => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        id={props.id}
        className={css.imageGalleryItemImage}
        src={props.src}
        alt={props.alt}
        onClick={() => {
          props.showModal(props.id);
        }}
      />
    </li>
  );
};
