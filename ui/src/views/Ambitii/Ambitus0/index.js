import React, { Component } from "react";
import { PitchCircle } from "../../../components";

class Ambitus0 extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <div
          style={{
            width: "200px",
            height: "200px",
          }}
        >
          <h1>Ambitus 0 <br/> (Unison)</h1>

          <PitchCircle shapeData={["C"]} />
        </div>
      </div>
    );
  }
}

export { Ambitus0 };
