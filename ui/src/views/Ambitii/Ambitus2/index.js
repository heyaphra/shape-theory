import React, { Component } from "react";
import { PitchCircle } from "../../../components";
import { Scale } from "@tonaljs/tonal";

const chroma = Scale.get("C chromatic").notes;

class Ambitus2 extends Component {
  componentDidMount() {
    this.computeAmbitus();
  }
  computeAmbitus = (interval = "M3") => {
    const subring = chroma.slice(0, chroma.indexOf());
    console.log(subring);
  };
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
            Ambitus 2 <br /> (Wholetone)
          </h1>

          <PitchCircle shapeData={["C", "D"]} />
        </div>
      </div>
    );
  }
}

export { Ambitus2 };
