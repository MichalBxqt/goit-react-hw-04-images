import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchImages } from '../services/api';

const App = () => {
  const appStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '16px',
    paddingBottom: '24px',
  };

  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [perPage, setPerPage] = useState(12);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const [pict, setPict] = useState({ id: '0', url: null, alt: 'no image' });
  const [error, setError] = useState(null);

  const handleSearch = searchQuery => {
    setImages([]);
    setSearchQuery(searchQuery);
    setPerPage(12);
    setPage(1);
    setIsLoading(false);
    setIsLoadMore(false);
    setIsModalShow(false);
    setPict({ id: '0', url: null, alt: 'no image' });
    setError(null);
  };

  const hendleLoadMore = () => {
    setPage(page + 1);
  };

  const showModal = id => {
    let localPict = { id: null, url: null, alt: 'no image' };
    for (const img of images) {
      if (img.id.toString() === id.toString()) {
        localPict = img;
        break;
      }
    }
    setIsModalShow(true);
    setPict(localPict);
  };

  const closeModal = () => {
    setIsModalShow(false);
  };

  // componentDidUpdate(prevProps, prevState, snapshot)
  useEffect(() => {
    console.log('Updating phase: same when componentDidUpdate runs');
    if (searchQuery && searchQuery.length > 0) {
      setIsLoading(true);

      fetchImages(searchQuery, perPage, page)
        .then(el => {
          let localIsLoadMore = true;
          if (el.totalHits <= page * perPage) {
            localIsLoadMore = false;
            window.alert(
              "We're sorry, but you've reached the end of search results."
            );
          }

          setImages(prevState => [...prevState, ...el.hits]);
          setIsLoadMore(localIsLoadMore);
        })
        .catch(err => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [searchQuery, page, perPage]);

  return (
    <div style={appStyles}>
      <Searchbar handleSearch={handleSearch} />
      <ImageGallery>
        {images.map(el => {
          return (
            <ImageGalleryItem
              key={el.id}
              id={el.id}
              src={el.webformatURL}
              alt={el.tags}
              showModal={showModal}
            />
          );
        })}
      </ImageGallery>
      {isLoadMore && <Button hendleLoadMore={hendleLoadMore} />}
      {error != null && <p>{error}</p>}
      {isLoading && <Loader />}
      {isModalShow && (
        <Modal
          src={pict.largeImageURL}
          alt={pict.tags}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default App;
