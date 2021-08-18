import React, { useState, useCallback } from "react";
import { Title, Form } from "./styles";
// material
import { Container, IconButton, CircularProgress } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import { BookList } from "../../components/BookList";
//import Pagination from '@material-ui/lab/Pagination';
//service
import getbooks from "./getBooksService";
import { BookData } from "./getBooksService";

export const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useState("");
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<BookData>();
  const [totalItems, setTotalItems] = useState(-1);
  const [indexPagination] = useState(0);

  const searchBooks = useCallback(async () => {
    if (searchParams === "") {
      return alert("Informe o nome do livro!");
    }
    setLoading(true);
    const result = await getbooks({ searchParams, indexPagination });
    setBooks(result);
    setTotalItems(result.totalItems);
    setLoading(false);
  }, [searchParams, indexPagination]);

  return (
    <>
      <Container>
        <Title>Explore livros na biblioteca da Google</Title>

        <IconButton>
          Meus Favoritos <Favorite />
        </IconButton>

        <Form>
          <input
            onChange={(e) => setSearchParams(e.target.value)}
            placeholder="Digite o nome do livro"
          />
          {loading ? (
            <CircularProgress />
          ) : (
            <button onClick={searchBooks}>Buscar</button>
          )}
        </Form>
        {totalItems > 0
          ? books && <BookList listBooks={books} />
          : totalItems === 0 && <span>Nenhum resultado encontado!</span>}
      </Container>
    </>
  );
};
