import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import { StyledAppContainer } from './App.styled';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { SearchBar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ToastNotify } from './ToastNotify/ToastNotify';

export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showBtnLoad, setShowBtnLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (search) {
      setIsLoading(true);
      fetchImages(search, page);
    }
  }, [search, page]);

  async function fetchImages(searchWord, page) {
    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          q: searchWord,
          page,
          key: '32598481-51c6e368c4b2f2440a6e9b5e3',
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: 12,
        },
      });
      const { hits, totalHits } = response.data;
      if (!hits.length) {
        setIsEmpty(true);
        toast.info('Nothing not found');
        return;
      }
      setImages(prev => [...prev, ...hits]);
      setShowBtnLoad(page < Math.ceil(totalHits / 12));
    } catch (e) {
      toast.error('Somthing wrong. Please, try again');
    } finally {
      setIsLoading(false);
    }
  }

  const onSearch = searchValue => {
    if (searchValue !== search || page !== 1) {
      setSearch(searchValue);
      setPage(1);
      setImages([]);
      setIsEmpty(false);
      setShowBtnLoad(false);
    }
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <StyledAppContainer>
      <SearchBar onSubmit={onSearch} />
      {isEmpty && <ToastNotify />}
      {isLoading && <Loader />}
      <ImageGallery images={images} />
      {showBtnLoad && <Button loadMore={loadMore} />}
    </StyledAppContainer>
  );
};
