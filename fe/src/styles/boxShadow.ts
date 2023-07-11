import { css } from 'styled-components';

export const boxShadow = {
  normal: css`
    box-shadow: 0px 1px 4px rgba(110, 128, 145, 0.24);
  `,

  up: css`
    box-shadow: 0px 2px 8px rgba(110, 128, 145, 0.32);
  `,

  floating: css`
    box-shadow: 0px 0px 4px rgba(110, 128, 145, 0.08);
  `,

  floatingBefore: css`
    content: '';
    box-shadow: 0px 16px 16px rgba(110, 128, 145, 0.24);
  `,
};
