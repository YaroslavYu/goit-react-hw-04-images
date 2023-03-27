import { useState } from 'react';

import {
  StyledSearchBar,
  StyledSearchForm,
  StyledSubmitButton,
  StyledButtonLabel,
  StyledInput,
} from './Searchbar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const onChange = e => {
    const searchValue = e.currentTarget.value;
    setSearch(searchValue);
  };

  const hendlerSubmit = e => {
    e.preventDefault();

    const searchWord = search.trim();
    if (!searchWord) return;

    onSubmit(searchWord);
    setSearch('');
  };

  return (
    <StyledSearchBar>
      <StyledSearchForm onSubmit={hendlerSubmit}>
        <StyledSubmitButton type="submit">
          <StyledButtonLabel>Search</StyledButtonLabel>
        </StyledSubmitButton>

        <StyledInput
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={onChange}
        />
      </StyledSearchForm>
    </StyledSearchBar>
  );
};
