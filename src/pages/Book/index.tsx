import React, { useEffect, useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { FavoriteOutlined, FavoriteBorder } from "@material-ui/icons";
import ShareIcon from "@material-ui/icons/Share";
import { ArrowBackOutlined } from "@material-ui/icons";
import { useRouteMatch } from "react-router-dom";
import getBookService, { BookResponse } from "./getBookService";
import { useHistory } from "react-router-dom";
import { favoriteLocalStorage } from "../../hooks/favoriteLocalStorage";

interface BookParams {
  id: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
  },
}));

export const Book: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const { params } = useRouteMatch<BookParams>();
  const id = params.id;
  const [book, setBook] = useState<BookResponse>();
  const [favorite, setFavorite] = useState(false);

  const getBook = useCallback(async () => {
    try {
      const result = await getBookService({ id });
      setBook(result);
    } catch (error) {
      alert(error);
    }
  }, [id]);

  const shareBook = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: book?.title,
          url: book?.previewLink,
        })
        .then(() => {
          console.log("Compartilhado com sucesso!");
        })
        .catch(console.error);
    }
  }, [book]);

  const checkFavorite = useCallback(() => {
    if (favorite === false) {
      favoriteLocalStorage("addFavorite", book);
      setFavorite(true);
    } else {
      favoriteLocalStorage("removeFavorite", id);
      setFavorite(false);
    }
  }, [favorite, book]);

  useEffect(() => {
    getBook();
  }, [id, getBook]);

  useEffect(() => {
    let favorites = favoriteLocalStorage("getFavorites", []);
    let index = favorites.findIndex(
      (obj: BookResponse) => obj !== null && obj.id === id
    );
    if (index !== -1) {
      setFavorite(true);
    }
  }, []);

  return (
    <>
      <IconButton onClick={() => history.goBack()}>
        <ArrowBackOutlined />
      </IconButton>

      <Card className={classes.root}>
        <CardHeader title={book?.title} subheader={book?.publishedDate} />
        <CardMedia
          component="img"
          alt={book?.title}
          image={book?.imageLinks?.medium}
          title={book?.title}
        />
        <CardContent>
          <Typography variant="h5" component="p">
            {book?.authors}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={checkFavorite} aria-label="add to favorites">
            {favorite ? <FavoriteOutlined /> : <FavoriteBorder />}
          </IconButton>
          <IconButton onClick={shareBook} aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
        <CardContent>
          <Typography paragraph>{book?.description}</Typography>
          <Button href={book?.previewLink} color="primary" variant="contained">
            ACESSAR LIVRO
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
