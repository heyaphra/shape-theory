import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "../../context";
import {
  Ambitus1,
  Ambitus2,
  Ambitus3,
  Ambitus4,
  Ambitus5,
  Ambitus6,
  Ambitus7,
  Ambitus8,
  Ambitus9,
  Ambitus10,
  Ambitus11,
} from "../Ambitii";

const ambitii = [
  {
    name: "Ambitus 1",
    route: "1",
    component: Ambitus1,
  },
  {
    name: "Ambitus 2",
    route: "2",
    component: Ambitus2,
  },
  {
    name: "Ambitus 3",
    route: "3",
    component: Ambitus3,
  },
  {
    name: "Ambitus 4",
    route: "4",
    component: Ambitus4,
  },
  {
    name: "Ambitus 5",
    route: "5",
    component: Ambitus5,
  },
  {
    name: "Ambitus 6",
    route: "6",
    component: Ambitus6,
  },
  {
    name: "Ambitus 7",
    route: "7",
    component: Ambitus7,
  },
  {
    name: "Ambitus 8",
    route: "8",
    component: Ambitus8,
  },
  {
    name: "Ambitus 9",
    route: "9",
    component: Ambitus9,
  },
  {
    name: "Ambitus 10",
    route: "10",
    component: Ambitus10,
  },
  {
    name: "Ambitus 11",
    route: "11",
    component: Ambitus11,
  },
];

const Ambitus = connect(
  class extends Component {
    renderAmbitii = () => {
      const { match } = this.props;
      return ambitii.map(({ name, route, component }) => {
        return (
          <Route
            exact
            key={name}
            path={`${match.path}/${route}`}
            component={component}
          />
        );
      });
    };

    render() {
      const { match } = this.props;
      return (
        <Switch>
          {this.renderAmbitii()}
          <Redirect from="*" to={`${match.url}/${ambitii[0].route}`} />
        </Switch>
      );
    }
  }
);

export { Ambitus };
