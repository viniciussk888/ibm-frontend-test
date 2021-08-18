import React from "react";
import { Routes } from "./routes";
import GlobalStyle from "./styles/global";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </>
);

export default App;
