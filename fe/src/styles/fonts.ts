import { css } from 'styled-components';

const bold = {
  L: css`
    font-size: 24px;
    line-height: auto;
    font-weight: 700;
  `,
  M: css`
    font-size: 16px;
    line-height: auto;
    font-weight: 700;
  `,
  R: css`
    font-size: 14px;
    line-height: auto;
    font-weight: 700;
  `,
  S: css`
    font-size: 12px;
    line-height: auto;
    font-weight: 700;
  `,
};

const medium = {
  M: css`
    font-size: 16px;
    line-height: 22px;
    font-weight: 500;
  `,
  R: css`
    font-size: 14px;
    line-height: auto;
    font-weight: 500;
  `,
  S: css`
    font-size: 12px;
    line-height: auto;
    font-weight: 500;
  `,
};

export const fonts = {
  displayBold24: bold.L,
  displayBold16: bold.M,
  displayBold14: bold.R,
  displayBold12: bold.S,
  displayMedium16: medium.M,
  displayMedium14: medium.R,
  displayMedium12: medium.S,
  selectedBold16: bold.M,
  selectedBold14: bold.R,
  availableMedium16: medium.M,
  availableMedium14: medium.R,
};
