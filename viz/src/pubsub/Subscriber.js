import React, { Component, cloneElement, Children } from "react";
import { publisher } from ".";

class Subscriber extends Component {
    state = publisher.getState(this.props.topic) // get initial state

    onMessage = ({ eventName, value }) => {
        const { transform } = this.props;
        this.setState({ value: transform ? transform(value) : value });
        return this.state;
    }

    componentDidMount() {
        this.subscription = publisher
            .subscribe(this.props.topic, this.onMessage);
    }

    componentWillUnmount() {
        publisher.unsubscribe(this.props.topic, this.onMessage);
    }

    render() {
        const {
            props: { children }
        } = this;
        return Children.map(children, child =>
            cloneElement(child, { ...this.props, ...this.state })
        );
    }
}

export { Subscriber };
