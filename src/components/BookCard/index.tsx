import React, { ReactNode } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import { BookResponse } from "../../pages/Home/getBooksService";
import { useHistory } from "react-router-dom";
interface ComponentProps {
  bookItem: BookResponse;
  children?: ReactNode;
}
export const BookCard: React.FC<ComponentProps> = (props) => {
  const history = useHistory();
  const { id, imageLinks, authors, title } = props.bookItem;
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.bookItem.title}
          image={imageLinks?.thumbnail || ""}
          title={props.bookItem.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="p">
            {authors}
          </Typography>
          <Typography variant="body2" component="p">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={() => history.push(`book/${id}`)}
          size="small"
          color="primary"
        >
          Ver detalhes
        </Button>
      </CardActions>
    </Card>
  );
};
