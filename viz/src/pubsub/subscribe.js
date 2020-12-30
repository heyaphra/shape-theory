import React from "react";
import { Subscriber } from "./Subscriber";

export const subscribe = (Comp, topic) => {
  return (
    <Subscriber topic={topic}>
      <Comp />
    </Subscriber>
  );
};

export const withSubscription = (Comp, props) => {
  const WrappedComponent = class extends React.Component {
    render() {
      return (
        <Subscriber {...props}>
          <Comp />
        </Subscriber>
      )
    }
  }
  return <WrappedComponent />
}
