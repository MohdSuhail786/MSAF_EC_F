import React from "react";
import { Route, Switch } from "react-router-dom";
import CustomAdmin from "./AdminComponents/CustomAdmin";
import MainAdmin from "./AdminComponents/MainAdmin";
import MainAuth from "./AuthComponents/MainAuth";
import MainForm from "./FormComponents/MainForm";
import ListComponent from "./ListComponent/ListComponent";
import Protected from "./MiddlewareComponents/Protected";

const App = () => {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <Protected Comp={MainAuth} />
        </Route>
        <Route exact path="/form">
          <Protected Comp={MainForm} />
        </Route>
        <Route exact path="/admin">
          <Protected Comp={MainAdmin} />
        </Route>
      </Switch>
    </main>
  );
};

export default App;
