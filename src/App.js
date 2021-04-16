import React from "react";
import { Route } from "react-router";
import Menu from "./components/Menu";
import BluePage from "./pages/BluePage";
import RedPage from "./pages/RedPage";
import "./App.css";
import UsersPage from "./pages/UsersPage";

const App = () => {
  return (
    <div className="app">
      <Menu />
      <hr />
      <Route path="/red" component={RedPage} />
      <Route path="/blue" component={BluePage} />
      <Route path="/users" component={UsersPage} />
    </div>
  );
};

export default App;
