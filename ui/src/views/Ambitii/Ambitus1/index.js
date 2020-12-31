import React, { Component } from "react";
import { PitchCircle } from "../../../components";

class Ambitus1 extends Component {
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
          <h1>
            Ambitus 1 <br /> (Semitone)
          </h1>

          <PitchCircle shapeData={["C", "C#"]} />
        </div>
      </div>
    );
  }
}

export { Ambitus1 };
