const fs = require("fs");
const _ = require("lodash");
var Color = require("tinycolor2");
const digitsFromString = str => {
  return +str.replace(/[a-zA-Z]/gi, "");
};
const fontDimensTemplate = _.template(
  fs.readFileSync("custom_templates/android/fontDimens.template")
);
const colorsTemplate = _.template(
  fs.readFileSync("custom_templates/android/colors.template")
);
const dimensTemplate = _.template(
  fs.readFileSync("custom_templates/android/dimens.template")
);
const StyleDictionary = require("style-dictionary").extend({
  source: ["json/**/*.json"],
  platforms: {
    scss: {
      transformGroup: "scss",
      buildPath: "_scss/",
      files: [
        {
          destination: "_variables.scss",
          format: "scss/variables"
        }
      ]
    },
    css: {
      transformGroup: "css",
      buildPath: "css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables"
        }
      ]
    },
    android: {
      transforms: [
        "attribute/cti",
        "name/cti/snake",
        "color/rgbToHex",
        "spacing/remToFontSp",
        "spacing/emTodp",
        "spacing/pxTodp",
        "droid/removePx-Rem"
      ],
      buildPath: "android/",
      files: [
        {
          destination: "colors.xml",
          format: "android/allColor"
        },
        {
          destination: "dimens.xml",
          format: "android/allDimens"
        },
        {
          destination: "fontDimens.xml",
          format: "android/font"
        }
      ]
    },
    iosSwift: {
      transforms: [
        "attribute/cti",
        "name/cti/camel",
        "color/rgbToUIColor",
        "content/swift/literal",
        "asset/swift/literal",
        "spacing/remToiOSConst",
        "spacing/removePx-Rem",
        "font/swift/literal"
      ],
      buildPath: "ios-swift/",
      files: [
        {
          destination: "design-tokens.swift",
          format: "ios-swift/class.swift",
          className: "MTokens",
          filter: token =>
            !token.name.includes("droidkerning") &&
            !(token.name.includes("font") && !token.name.includes("fontSize"))
        }
      ]
    },
    flutter: {
      transformGroup: "flutter",
      buildPath: "flutter/",
      files: [
        {
          destination: "design-tokens.dart",
          format: "flutter/class.dart",
          className: "MTokens",
          filter: {}
        }
      ]
    }
  }
});
StyleDictionary.registerFormat({
  name: "android/allColor",
  formatter: colorsTemplate
});
StyleDictionary.registerFormat({
  name: "android/allDimens",
  formatter: dimensTemplate
});
StyleDictionary.registerFormat({
  name: "android/font",
  formatter: fontDimensTemplate
});
StyleDictionary.registerTransform({
  name: "spacing/remToFontSp",
  type: "value",
  matcher: function(prop) {
    return prop.attributes.category === "fontSize";
  },
  transformer: function(prop) {
    return digitsFromString(prop.original.value) * 16 + "sp";
  }
});
StyleDictionary.registerTransform({
  name: "droid/removePx-Rem",
  type: "value",
  matcher: function(prop) {
    return prop.attributes.category === "kerning";
  },
  transformer: function(prop) {
    return prop.original.value.replace(/px|rem/gi, "");
  }
});
StyleDictionary.registerTransform({
  name: "spacing/emTodp",
  type: "value",
  matcher: function(prop) {
    return prop.attributes.category === "spacing";
  },
  transformer: function(prop) {
    return parseInt(digitsFromString(prop.original.value) * 16) + "dp";
  }
});
StyleDictionary.registerTransform({
  name: "spacing/pxTodp",
  type: "value",
  matcher: function(prop) {
    return (
      prop.attributes.category === "borderRadius" ||
      prop.attributes.category === "lineHeight"
    );
  },
  transformer: function(prop) {
    return parseInt(digitsFromString(prop.original.value)) + "dp";
  }
});
StyleDictionary.registerTransform({
  name: "spacing/remToiOSConst",
  type: "value",
  matcher: function(prop) {
    return (
      prop.attributes.category === "fontSize" ||
      prop.attributes.category === "size" ||
      prop.attributes.category === "spacing"
    );
  },
  transformer: function(prop) {
    // console.log('prop.original.value', digitsFromString(prop.original.value) * 16)
    return digitsFromString(prop.original.value) * 16;
  }
});
StyleDictionary.registerTransform({
  name: "color/rgbToHex",
  type: "value",
  matcher: function(prop) {
    return (
      prop.attributes.category === "brand" ||
      prop.attributes.category === "color"
    );
  },
  transformer: function(prop) {
    return "#" + Color(prop.original.value).toHex();
  }
});
StyleDictionary.registerTransform({
  name: "color/rgbToUIColor",
  type: "value",
  matcher: function(prop) {
    return (
      prop.attributes.category === "brand" ||
      prop.attributes.category === "color"
    );
  },
  transformer: function(prop) {
    const { r, g, b, a } = Color(prop.original.value).toRgb();
    const rFixed = (r / 255.0).toFixed(3);
    const gFixed = (g / 255.0).toFixed(3);
    const bFixed = (b / 255.0).toFixed(3);
    return `UIColor(red: ${rFixed}, green: ${gFixed}, blue: ${bFixed}, alpha:${a})`;
  }
});
StyleDictionary.registerTransform({
  name: "spacing/removePx-Rem",
  type: "value",
  matcher: function(prop) {
    return (
      prop.attributes.category === "borderRadius" ||
      prop.attributes.category === "borderSize" ||
      prop.attributes.category === "breakpoint" ||
      prop.attributes.category === "shadow" ||
      prop.attributes.category === "droidkerning" ||
      prop.attributes.category === "kerning" ||
      prop.attributes.category === "lineHeight"
    );
  },
  transformer: function(prop) {
    return prop.original.value.replace(/px|rem/gi, "");
  }
});
StyleDictionary.buildAllPlatforms();

// console.log("Done!");
