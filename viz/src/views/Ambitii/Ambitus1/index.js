import React, { Component } from "react";
import { PitchCircle } from "../../../components";

class Ambitus1 extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "200px",
            height: "200px",
            display: "flex",
          }}
        >
          <PitchCircle shapeData={["C", "D", "E"]} />
        </div>
      </div>
    );
  }
}

export { Ambitus1 };
