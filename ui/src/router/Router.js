import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routes } from "./routes";
import { connect } from "../context";

export const Router = connect((props) => {
  const { isAuthenticated } = props;
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(({ name, path, Component, exact,  }) => {
          return (
            <Route key={name} exact={exact} path={path} component={Component} />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
});
