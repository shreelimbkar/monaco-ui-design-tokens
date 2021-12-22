import { camelize } from "./camelize.mjs";
import { formatName } from "./formatName.mjs";

export function setupKerningTokens(kerningFrame, format) {
  if (kerningFrame) {
    const kernings = kerningFrame.children;
    const kerningsObject = {};
    let normalizedUnit;

    kernings.forEach(kerning => {
      let normalizedName = camelize(kerning.name);
      normalizedName = formatName(normalizedName);

      if (format == "js") {
        normalizedUnit = kerning.style.letterSpacing + "px ";
      } else {
        normalizedUnit = {
          value: kerning.style.letterSpacing + "px",
          type: "kerning"
        };
      }

      kerningsObject[normalizedName] = normalizedUnit;
    });

    return kerningsObject;
  } else {
    throw new Error("No frame for setupkerningTokens()!");
  }
}
