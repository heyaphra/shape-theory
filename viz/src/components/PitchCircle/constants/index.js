import Color from "color";

export const MerrickColorModel = {
  "B#": "#1892CB",
  C: "#1892CB",
  "C#": "#3D5AA7",
  Db: "#3D5AA7",
  D: "#463E8C",
  "D#": "#783A91",
  Eb: "#783A91",
  E: "#F5BC1A",
  "E#": "#EFE83D",
  F: "#EFE83D",
  "F#": "#CBDC3E",
  "F##": "#64AE51",
  G: "#64AE51",
  "G#": "#A5264B",
  Ab: "#A5264B",
  A: "#E93229",
  "A#": "#EA522A",
  Bb: "#EA522A",
  B: "#F29622",
};

export const Point = class {
  constructor(x, y, radius, theta, ctx, noteName, colorModel) {
    this.coords = { x, y };
    this.radius = radius;
    this.ctx = ctx;
    this.theta = theta;
    this.noteName = noteName;
    this.color = colorModel
      ? colorModel[this.noteName.replace(/[0-9]/g, "")]
      : "black";
  }

  draw = () => {
    this.ctx.fillStyle = this.color;
    this.ctx.moveTo(this.coords.x, this.coords.y);
    this.ctx.beginPath();
    this.ctx.arc(this.coords.x, this.coords.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  };

  distanceFrom = ([x, y]) => {
    const [deltaX, deltaY] = [x - this.coords.x, y - this.coords.y];
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  };
};

export const Line = class {
    constructor({ head, tail }, ctx) {
      this.head = head;
      this.tail = tail;
      this.ctx = ctx;
      const colorA = Color(this.head.color);
      const colorB = Color(this.tail.color);
      this.color = colorA.mix(colorB);
    }
  
    draw(mode = "circle") {
      // TO DO: get a basic arc chart mode working, then work out a smoother integration
      // Also, detect if mouse over or under point and draw arc accordingly
      const { ctx } = this;
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(this.head.coords.x, this.head.coords.y);
      if (mode === "line") {
        ctx.bezierCurveTo(
          this.head.coords.x,
          this.head.coords.y + 80,
          this.tail.coords.x,
          this.tail.coords.y + 80,
          this.tail.coords.x,
          this.tail.coords.y
        );
      } else {
        ctx.lineTo(this.tail.coords.x, this.tail.coords.y);
      }
      ctx.stroke();
      ctx.closePath();
    }
  };
  