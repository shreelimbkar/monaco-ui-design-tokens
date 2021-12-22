# Design Tokens

A design token is an abstraction of a visual property such as color, font, width, animation, etc. These raw values are language application agnostic and once transformed and formatted can be used on any platform.

Automates the generation of design tokens from our [Figma master stylesheet](https://www.figma.com/file/SKkSxha8LQG7lPvIJ2PWHf/Design-Tokens?node-id=0%3A1) and [Figma icon library](https://www.figma.com/file/a0PPJFXpjjP0ClDygSP8Uf/Blocks-Icons?node-id=0%3A1).

Built using:

- Figmagic
- Amazon Style Dictionary
- Figma-assets-generator
- Svg-to-jsx

Extracts design tokens for colors, typography (line heights, font sizes, font families, font weights), borders, breakpoints, shadows, spacing, z-index, and SVG assets. A typical use case for the generated documents is to use the extracted values as a token base in CSS systems that support external values (such as Styled Components, other CSS-in-JS libraries, CSS3, or Sass).

Design tokens are currently extracted in the following formats:

- JSON objects
- ES6 modules
- SCSS variables
- CSS3 variables

This uses ESM imports, so make sure you have a recent Node version, preferably version 10+.

### Installation

- Clone the repo
- Step into the project root directory, and run `npm setup` to add it globally to your system
- Run `npm run tokens` to generate the tokens
- Once you have generated the tokens, uptick the version appropriately and run `npm publish` to publish to NPM.

# Including tokens

It's very easy to include design tokens in your projects using any of the following methods. The goal is to provide developers with a toolset that can be used across languages but that is always consistent. This is achieved by generating all of the tokens from a single source in Figma.

## Structure

- `./_scss` will contain a SCSS variables token file
- `./css` will contain a CSS3 variables token file
- `./json` will contain JSON object token files
- `./js` will contain ES6 module token files
- `./img` will contain SVG asset files such as logos, graphics, and icons
