import { createGlobalStyle } from "styled-components";

export const FontToken = createGlobalStyle`
:root{
  --font-family-base: "Nato Sans JP", sans-serif;

  --font-size-10: 10px;
  --font-size-11: 11px;
  --font-size-12: 12px;
  --font-size-14: 14px;
  --font-size-16: 16px;
  --font-size-18: 18px;
  --font-size-20: 20px;
  --font-size-24: 24px;

  --font-line-height-160: 160%;

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semi-bold: 600;
  --font-weight-bold: 700;
}
`;
