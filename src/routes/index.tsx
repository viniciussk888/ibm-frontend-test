import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//PAGES
import { Home } from "../pages/Home";
import { Book } from "../pages/Book";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/book" component={Book} />
      </Switch>
    </BrowserRouter>
  );
};
