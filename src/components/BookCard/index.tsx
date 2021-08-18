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
export const BookCard: React.FC<ComponentProps> = (props) => (
  <Card>
    <CardActionArea>
      <CardMedia
        component="img"
        alt={props.bookItem.title}
        height="140"
        // image={props.bookItem.imageLinks.smallThumbnail}
        title={props.bookItem.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.bookItem.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.bookItem.title}
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
