import React, { Component } from "react";
import { Canvas } from "../Canvas";
import createInputEvents from "simple-input-events";
import Color from "color";
import { Line } from "./constants";
import { distributePolar, hitTest } from "./util";

class PitchCircle extends Component {
  selection = {};
  _points = [];
  _lines = [];

  init = async (stage) => {
    this.stage = stage;
    this.draw();
    if (this.props.interactive) {
      this.activateInputEvents();
    }
  };

  draw = () => {
    const { ctx, width, height } = this.stage;
    ctx.clearRect(0, 0, width, height);
    if (!this._points.length) {
      this._points = distributePolar({
        ctx,
        cx: width / 2,
        cy: height / 2,
        r: height / 2.25,
        N_NOTES: 12,
        colorModel: this.props.ColorModel,
      });
    }
    this._points.forEach((p) => p.draw(ctx));
    this._lines.forEach((l) => l.draw(ctx));
    if (this._tmp_line) this._tmp_line.draw(ctx);
  };

  trace = (noteSource) => {
    const nodes = noteSource.map((note, index) =>
      this._points.find((p) => p.noteName === note)
    );
    const nextLines = nodes.map((p, i) => {
      return new Line(
        { head: p, tail: nodes[(i + 1) % nodes.length] },
        this.stage.ctx
      );
    });
    this._lines = nextLines;
    this.draw();
  };

  onResize = async (stage) => {
    this.stage = stage;
    this.draw();
  };

  activateInputEvents = () => {
    this.pointer = createInputEvents({
      target: this.stage.canvas,
      passive: false,
    });
    this.pointer.on("down", ({ position, event }) => {
      event.preventDefault();
      this.InputEvents.pointerDown(position);
    });
    this.pointer.on("move", ({ position, event }) => {
      this.InputEvents.pointerMove(position);
    });
  };

  InputEvents = {
    pointerDown: (position) => {
      const nextPoints = this.InputEvents.selectPoint(position);
      this._points = nextPoints;
      delete this._tmp_line;
      this.draw();
    },
    pointerMove: (position) => {
      if (!this.selection.head) return;
      delete this.selection.tail;
      const nextPoints = this.InputEvents.snapToPoint(position);
      this.InputEvents.extendLineTool(position);
      this._points = nextPoints;
      this.draw();
    },
    selectPoint: (position) => {
      let clickedPoint = false;
      const nextPoints = this._points.map((point) => {
        hitTest(point, position, {
          hit: () => {
            console.log(point.noteName);
            clickedPoint = true;
            if (!this.selection.head) {
              this.selection.head = point;
            } else {
              this.selection.tail = point;
              this._lines.push(
                new Line(
                  { head: this.selection.head, tail: this.selection.tail },
                  this.stage.ctx
                )
              );
              this.selection = {
                head: this.selection.tail,
                tail: null,
              };
            }
            point.radius = 6;
          },
          miss: () => {
            point.radius = 3;
          },
        });
        return point;
      });
      if (!clickedPoint) this.selection = {};
      return nextPoints;
    },
    snapToPoint: (position) => {
      return this._points.map((point) => {
        hitTest(point, position, {
          hit: () => {
            point.radius = 6;
            this.selection.tail = point;
          },
          miss: () => {
            point.radius = 3;
          },
        });
        return point;
      });
    },
    extendLineTool: (position) => {
      const { ctx } = this.stage;
      ctx.lineCap = "round";
      const [pointerX, pointerY] = position;
      this._tmp_line = new Line(
        {
          head: this.selection.head,
          tail: {
            coords: {
              x: this.selection.tail ? this.selection.tail.coords.x : pointerX,
              y: this.selection.tail ? this.selection.tail.coords.y : pointerY,
            },
          },
        },
        ctx
      );
      this._tmp_line.color = Color(this.selection.head.color).mix(
        Color(
          this._points.reduce((a, b) =>
            a.distanceFrom([pointerX, pointerY]) <
            b.distanceFrom([pointerX, pointerY])
              ? a
              : b
          ).color
        )
      );
    },
  };

  render() {
    const { dimensions, style } = this.props;
    return (
      <Canvas
        onMount={this.init}
        onResize={this.onResize}
        refreshRate={0}
        style={style}
      />
    );
  }
}

export { PitchCircle };
