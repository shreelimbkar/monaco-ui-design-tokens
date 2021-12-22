import { camelize } from "./camelize.mjs";
import { formatName } from "./formatName.mjs";
import { normalizeUnits } from "./normalizeUnits.mjs";

export function setupLineHeightTokens(frame, format) {
  if (frame) {
    let lineHeightObject = {};
    let lineHeight;

    frame.children.forEach(type => {
      let name = camelize(type.name);
      name = formatName(name);

      if (format == "js") {
        lineHeight = type.style.lineHeightPx + "px";
      } else {
        lineHeight = {
          value: type.style.lineHeightPx + "px",
          type: "typography"
        };
      }

      lineHeightObject[name] = lineHeight;
    });

    return lineHeightObject;
  } else {
    throw new Error("No frame for setupLineHeightTokens()!");
  }
}
