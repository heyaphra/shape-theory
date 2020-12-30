import React, { Component } from "react";
import { PitchCircle } from "../../../components";

class Ambitus0 extends Component {
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
          <PitchCircle shapeData={["F#"]} />
        </div>
      </div>
    );
  }
}

export { Ambitus0 };
