import Typography from "typography";

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.666,
  scaleRatio: 2,
  bodyFontFamily: ["Montserrat", "sans-serif"],
  headerFontFamily: ["Montserrat", "sans-serif"],
});

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
