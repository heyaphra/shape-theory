import { Scale } from "@tonaljs/tonal";
import { Point } from "../constants";

export const range = (count) => {
  return Array.from(Array(count).keys());
};

export const degreesToRadians = (angleInDegrees) => {
  return (Math.PI * angleInDegrees) / 180;
};

export const distributePolar = (config) => {
  const { ctx, cx, cy, r, N_NOTES, colorModel } = config;
  const chromatic_scale = Scale.get("C chromatic").notes;
  const points = [];
  const angle = 360 / N_NOTES;
  const vertices = range(N_NOTES);
  vertices.forEach((vertex, index) => {
    const theta = degreesToRadians(-90 + angle * index);
    const point = new Point(
      cx + r * Math.cos(theta),
      cy + r * Math.sin(theta),
      3,
      theta,
      ctx,
      chromatic_scale[index],
      colorModel
    );
    points.push(point);
  });
  return points;
};

export const scalePointerToCanvas = (canvas, position) => {
  const rect = canvas.getBoundingClientRect(),
    scaleX = canvas.width / rect.width, // relationship bitmap vs. element for X
    scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y
  return [
    (position[0] - rect.left) * scaleX,
    (position[1] - rect.top) * scaleY,
  ];
};

export const hitTest = (point, [pointerX, pointerY], { hit, miss }) => {
  // Mickey-mouse. Should query noteName instead of color
  // if (this.selection.head && point.color === this.selection.head.color) {
  //   return;
  // }
  const dist = point.distanceFrom([pointerX, pointerY]);
  if (dist < 15) {
    hit();
  } else {
    miss();
  }
  return point;
};
