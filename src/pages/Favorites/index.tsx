import React, { useState, useCallback, useEffect } from "react";
import { Title } from "../Home/styles";
// material
import { Container } from "@material-ui/core";
import { BookList } from "../../components/BookList";
import IconButton from "@material-ui/core/IconButton";
import { ArrowBackOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
//service
import { BookData, BookResponse } from "../Home/getBooksService";
import { favoriteLocalStorage } from "../../hooks/favoriteLocalStorage";

export const Favorites: React.FC = () => {
  const history = useHistory();
  const [books, setBooks] = useState<BookData>();

  const getFavoritesBooks = useCallback(() => {
    let favorites = [];
    favorites = favoriteLocalStorage("getFavorites", []);
    const bookList = {
      books: favorites.map((favorite: BookResponse) => {
        return favorite;
      }),
      totalItems: favorites.length,
    };
    setBooks(bookList);
  }, []);

  useEffect(() => {
    getFavoritesBooks();
  }, [getFavoritesBooks]);

  return (
    <>
      <Container>
        <IconButton onClick={() => history.goBack()}>
          <ArrowBackOutlined />
        </IconButton>
        <Title>Meus livros favoritos</Title>
        <br />
        {books && <BookList listBooks={books} />}
      </Container>
    </>
  );
};
