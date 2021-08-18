import React, { ReactNode } from "react";
import { Grid } from "@material-ui/core";
import { BookCard } from "../BookCard";
import { BookData } from "../../pages/Home/getBooksService";
// ----------------------------------------------------------------------
interface ComponentProps {
  listBooks: BookData;
  children?: ReactNode;
}
export const BookList: React.FC<ComponentProps> = (props) => (
  <Grid container spacing={3}>
    {props.listBooks.books.map((book) => (
      <Grid key={book.id} item xs={6} sm={4} md={3}>
        <BookCard bookItem={book} />
      </Grid>
    ))}
  </Grid>
);
