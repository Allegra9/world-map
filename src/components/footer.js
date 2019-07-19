// eslint-disable-next-line
import React from "react";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const footer = () => (
  <div css={container}>
    Powered by <a href="http://api.population.io/">World Population API</a>
  </div>
);

export default footer;

const skinColor = "#d6d0b1";
const fontFamily = "Open Sans, sans-serif";
const positionCenter =
  "display: flex; align-items: center; justify-content: center;";

const container = css`
  background-color: #000;
  color: ${skinColor};
  height: 200px;
  margin: 0;
  margin-top: 150px;
  font-size: 1.1em;
  font-family: ${fontFamily};
  ${positionCenter};
  a {
    color: ${skinColor};
    padding-left: 10px;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;
