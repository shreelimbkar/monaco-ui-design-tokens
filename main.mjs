#!/bin/sh
":"; //# ; exec /usr/bin/env node --experimental-modules --no-warnings "$0" "$@"

import { getFromApi } from "./src/functions/getFromApi.mjs";
import { createPage } from "./src/functions/createPage.mjs";
import { writeTokens } from "./src/functions/writeTokens.mjs";

import dotenv from "dotenv";
dotenv.config();

(async () => {
  //NSM_0.6 - Tokens
  const data = await getFromApi(
    "167492-5f9776fa-31c5-44b3-93d2-e19957a0410d",
    "hXDj8zQ2Z33q7w7WKRqZS8"
  );

  const tokens = createPage(data.document.children);

  writeTokens(tokens.children, "json");
  writeTokens(tokens.children, "js");
  writeTokens(tokens.children, "d.ts");
})();
