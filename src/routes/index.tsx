import React from "react";
import { Route, Switch } from "react-router-dom";

//PAGES
import { Home } from "../pages/Home";
import { Book } from "../pages/Book";
import { Favorites } from "../pages/Favorites";

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/book/:id" component={Book} />
      <Route path="/favorites" component={Favorites} />
    </Switch>
  );
};
