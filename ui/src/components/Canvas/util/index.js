export const getSize = (el) => {
  if (el === window || el === document.body) {
    return [window.innerWidth, window.innerHeight];
  }
  const { width, height } = el.getBoundingClientRect();
  return { width: Math.floor(width), height: Math.floor(height) };
};

export const getParentDimensions = (canvas) => {
  if (!canvas || !canvas.parentElement) return { width: 0, height: 0 };
  const { width, height } = getSize(canvas.parentElement);
  return { width, height };
};

export const scale = () => window.devicePixelRatio || 1;

