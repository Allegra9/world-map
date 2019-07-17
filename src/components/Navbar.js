// eslint-disable-next-line
import React from "react";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const Navbar = () => {
  return (
    <Container>
      <Content>
        <div>
          <span css={title}>
            <span>W</span>
          </span>
          <span>
            <img
              src="https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/d8f2a26e920f903d68359038bd4cf588/large.gif"
              css={img}
              alt=""
            />
          </span>
          <span css={title}>
            <span css={rld}>rld</span>
          </span>
        </div>
        <div css={subtitle}>Data is the first step to sustainable world</div>
      </Content>
    </Container>
  );
};

export default Navbar;

const skinColor = "#d6d0b1";
const fontFamily = "Cinzel, serif";
const contentCenter = "display: flex; justify-content: center;";

const Container = styled.div`
  background: #000;
  color: ${skinColor};
  font-family: ${fontFamily};
  height: 230px;
  margin-bottom: 100px;
  ${contentCenter};
`;

const Content = styled.div``;

const title = css`
  font-size: 8em;
  padding: 40px 40px 40px 0px;
  text-align: left;
  margin-top: -10px;
  position: absolute;
`;

const rld = css`
  margin-left: -30px;
`;
const subtitle = css`
  font-size: 1em;
  text-align: left;
  padding-left: 200px;
`;
const img = css`
  width: 250px;
  height: auto;
  margin-top: 20px;
  margin-left: 90px;
`;
