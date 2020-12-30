import React from "react";
import { Provider } from "./context";
import { Router } from "./router";

export default () => (
  <Provider>
    <Router />
  </Provider>
);
