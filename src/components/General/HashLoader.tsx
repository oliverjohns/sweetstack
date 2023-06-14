import type { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";

interface LengthObject {
  value: number;
  unit: string;
}

const cssUnit: { [unit: string]: boolean } = {
  cm: true,
  mm: true,
  in: true,
  px: true,
  pt: true,
  pc: true,
  em: true,
  ex: true,
  ch: true,
  rem: true,
  vw: true,
  vh: true,
  vmin: true,
  vmax: true,
  "%": true,
};

/**
 * If size is a number, append px to the value as default unit.
 * If size is a string, validate against list of valid units.
 * If unit is valid, return size as is.
 * If unit is invalid, console warn issue, replace with px as the unit.
 *
 * @param {(number | string)} size
 * @return {LengthObject} LengthObject
 */
export function parseLengthAndUnit(size: number | string): LengthObject {
  if (typeof size === "number") {
    return {
      value: size,
      unit: "px",
    };
  }
  let value: number;
  const valueString: string = (size.match(/^[0-9.]*/) || "").toString();
  if (valueString.includes(".")) {
    value = parseFloat(valueString);
  } else {
    value = parseInt(valueString, 10);
  }

  const unit: string = (size.match(/[^0-9]*$/) || "").toString();

  if (cssUnit[unit]) {
    return {
      value,
      unit,
    };
  }

  console.warn(`${size} is not a valid css value. Defaulting to ${value}px.`);

  return {
    value,
    unit: "px",
  };
}

/**
 * Take value as an input and return valid css value
 *
 * @param {(number | string)} value
 * @return {string} valid css value
 */
export function cssValue(value: number | string): string {
  const lengthWithUnit = parseLengthAndUnit(value);

  return `${lengthWithUnit.value}${lengthWithUnit.unit}`;
}

export type LengthType = number | string;

interface HashLoaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  color?: string;
  loading?: boolean;
  cssOverride?: CSSProperties;
  speedMultiplier?: number;
  size?: LengthType;
}

enum BasicColors {
  maroon = "#800000",
  red = "#FF0000",
  orange = "#FFA500",
  yellow = "#FFFF00",
  olive = "#808000",
  green = "#008000",
  purple = "#800080",
  fuchsia = "#FF00FF",
  lime = "#00FF00",
  teal = "#008080",
  aqua = "#00FFFF",
  blue = "#0000FF",
  navy = "#000080",
  black = "#000000",
  gray = "#808080",
  silver = "#C0C0C0",
  white = "#FFFFFF",
}

export const calculateRgba = (color: string, opacity: number): string => {
  if (Object.keys(BasicColors).includes(color)) {
    color = BasicColors[color as keyof typeof BasicColors];
  }

  if (color[0] === "#") {
    color = color.slice(1);
  }

  if (color.length === 3) {
    let res = "";
    color.split("").forEach((c: string) => {
      res += c;
      res += c;
    });
    color = res;
  }

  const rgbValues: string = (color.match(/.{2}/g) || [])
    .map((hex: string) => parseInt(hex, 16))
    .join(", ");

  return `rgba(${rgbValues}, ${opacity})`;
};

export const createAnimation = (
  loaderName: string,
  frames: string,
  suffix: string
): string => {
  const animationName = `react-spinners-${loaderName}-${suffix}`;

  if (typeof window == "undefined" || !window.document) {
    return animationName;
  }

  const styleEl = document.createElement("style");
  document.head.appendChild(styleEl);
  const styleSheet = styleEl.sheet;

  const keyFrames = `
    @keyframes ${animationName} {
      ${frames}
    }
  `;

  if (styleSheet) {
    styleSheet.insertRule(keyFrames, 0);
  }

  return animationName;
};

export function HashLoader({
  loading = true,
  color = "#4169E1",
  speedMultiplier = 1,
  cssOverride = {},
  size = 50,
  ...additionalProps
}: HashLoaderProps): JSX.Element | null {
  const { value, unit } = parseLengthAndUnit(size);

  const wrapper: CSSProperties = {
    display: "inherit",
    width: cssValue(size),
    height: cssValue(size),
    transform: "rotate(165deg)",
    ...cssOverride,
  };

  const thickness = value / 5;

  const lat = (value - thickness) / 2;

  const offset = lat - thickness;

  const colorValue = calculateRgba(color, 0.75);

  const before = createAnimation(
    "HashLoader",
    `0% {width: ${thickness}px; box-shadow: ${lat}px ${-offset}px ${colorValue}, ${-lat}px ${offset}px ${colorValue}}
    35% {width: ${cssValue(
      size
    )}; box-shadow: 0 ${-offset}px ${colorValue}, 0 ${offset}px ${colorValue}}
    70% {width: ${thickness}px; box-shadow: ${-lat}px ${-offset}px ${colorValue}, ${lat}px ${offset}px ${colorValue}}
    100% {box-shadow: ${lat}px ${-offset}px ${colorValue}, ${-lat}px ${offset}px ${colorValue}}`,
    "before"
  );

  const after = createAnimation(
    "HashLoader",
    `0% {height: ${thickness}px; box-shadow: ${offset}px ${lat}px ${color}, ${-offset}px ${-lat}px ${color}}
    35% {height: ${cssValue(
      size
    )}; box-shadow: ${offset}px 0 ${color}, ${-offset}px 0 ${color}}
    70% {height: ${thickness}px; box-shadow: ${offset}px ${-lat}px ${color}, ${-offset}px ${lat}px ${color}}
    100% {box-shadow: ${offset}px ${lat}px ${color}, ${-offset}px ${-lat}px ${color}}`,
    "after"
  );

  const style = (i: number): CSSProperties => {
    return {
      position: "absolute",
      top: "50%",
      left: "50%",
      display: "block",
      width: `${value / 5}${unit}`,
      height: `${value / 5}${unit}`,
      borderRadius: `${value / 10}${unit}`,
      transform: "translate(-50%, -50%)",
      animationFillMode: "none",
      animation: `${i === 1 ? before : after} ${2 / speedMultiplier}s infinite`,
    };
  };

  if (!loading) {
    return null;
  }

  return (
    <span style={wrapper} {...additionalProps}>
      <span style={style(1)} />
      <span style={style(2)} />
    </span>
  );
}
