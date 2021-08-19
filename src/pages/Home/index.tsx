import React, { useState, useCallback } from "react";
import { Title, Form } from "./styles";
// material
import { Container, IconButton, CircularProgress, Box } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import { Favorite } from "@material-ui/icons";
import { BookList } from "../../components/BookList";
import { makeStyles } from '@material-ui/core/styles';
//service
import getbooks from "./getBooksService";
import { BookData } from "./getBooksService";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export const Home: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [searchParams, setSearchParams] = useState("");
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<BookData>();
  const [totalItems, setTotalItems] = useState(-1);

  const searchBooks = useCallback(async (page) => {
    if (searchParams === "") {
      return alert("Informe o nome do livro!");
    }
    setLoading(true);
    const result = await getbooks({ searchParams, page });
    setBooks(result);
    setTotalItems(result.totalItems);
    setLoading(false);
  }, [searchParams]);

  return (
    <>
      <Container>
        <Title>Explore livros na biblioteca da Google</Title>

        <IconButton onClick={() => history.push("favorites")}>
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
            <button id="button-search" onClick={()=>searchBooks(1)}>
              Buscar
            </button>
          )}
        </Form>
        {totalItems > 0
          ? books &&<> <BookList listBooks={books}/> <Box className={classes.root} justifyContent="center"> <Pagination onChange={(event: object, page: number)=>searchBooks(page)} count={Math.floor(totalItems/10)} color="primary" /></Box> </>
          : totalItems === 0 && <span>Nenhum resultado encontado!</span>}
      </Container>
    </>
  );
};
