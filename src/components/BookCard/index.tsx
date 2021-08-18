import React, { ReactNode } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { BookResponse } from "../../pages/Home/getBooksService";

interface ComponentProps {
  bookItem: BookResponse;
  children?: ReactNode;
}
export const BookCard: React.FC<ComponentProps> = (props) => {
  const { imageLinks, authors, title } = props.bookItem;
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.bookItem.title}
          height="140"
          image={imageLinks?.thumbnail || ""}
          title={props.bookItem.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="p">
            {authors.slice(0, 20)}
          </Typography>
          <Typography variant="body2" component="p">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Ver detalhes
        </Button>
      </CardActions>
    </Card>
  );
};
