import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import LoggedIn from "./LoggedIn";

export default function routes({ token, history }) {
  return (
    <Switch>
      <Route path="/callback/loggedIn" component={LoggedIn} />
    </Switch>
  );
}
