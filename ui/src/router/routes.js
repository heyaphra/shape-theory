import React from "react";
import { Ambitus } from "../views";
import { Redirect, withRouter } from "react-router-dom";

export const routes = [
  {
    path: "/",
    name: "Home",
    Component: (props) => <Redirect to="/ambitus" />,
    exact: true,
  },
  {
    path: "/ambitus",
    name: "Ambitus",
    Component: withRouter(Ambitus),
    exact: false,
  },
];
