import { camelize } from "./camelize.mjs";
import { formatName } from "./formatName.mjs";

export function setupDroidKerningTokens(kerningFrame, format) {
  if (kerningFrame) {
    const kernings = kerningFrame.children;
    const kerningsObject = {};
    let normalizedUnit;

    kernings.forEach(kerning => {
      let normalizedName = camelize(kerning.name);
      normalizedName = formatName(normalizedName);

      if (format == "js") {
        normalizedUnit = (
          Math.round(
            (kerning.style.letterSpacing / kerning.style.fontSize) * 100
          ) / 100
        ).toFixed(2);
      } else {
        normalizedUnit = {
          value: (
            Math.round(
              (kerning.style.letterSpacing / kerning.style.fontSize) * 100
            ) / 100
          ).toFixed(2),
          type: "kerning"
        };
      }

      kerningsObject[normalizedName] = normalizedUnit;
    });

    return kerningsObject;
  } else {
    throw new Error("No frame for setupDroidKerningTokens()!");
  }
}
