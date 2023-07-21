const grey50 = '#FEFEFE';
const grey100 = '#F7F7FC';
const grey200 = '#EFF0F6';
const grey300 = '#D9DBE9';
const grey400 = '#BEC1D5';
const grey500 = '#A0A3BD';
const grey600 = '#6E7191';
const grey700 = '#4E4B66';
const grey800 = '#2A2A44';
const grey900 = '#14142B';
const blue = '#007AFF';
const navy = '#0025E6';
const red = '#FF3B30';

export const designSystem = {
  colors: {
    grey50,
    grey100,
    grey200,
    grey300,
    grey400,
    grey500,
    grey600,
    grey700,
    grey800,
    grey900,
    blue,
    navy,
    red,
  },
  colorSystem: {
    textStrong: grey900,
    textBold: grey700,
    textDefault: grey600,
    textWeak: grey500,
    textWhiteDefault: grey50,
    textWhiteWeak: grey100,
    textBrand: blue,
    textDanger: red,
    surfaceDefault: grey50,
    surfaceAlt: grey100,
    surfaceBrand: blue,
    surfaceDanger: red,
    borderDefault: grey200,
  },
  opacity: {
    hover: 0.8,
    disabled: 0.3,
  },
  font: {
    displayBold24: '700 24px Pretendard, sans-serif',
    displayBold16: '700 16px Pretendard, sans-serif',
    displayBold14: '700 14px Pretendard, sans-serif',
    displayBold12: '700 12px Pretendard, sans-serif',
    displayMD16: '500 16px/22px Pretendard, sans-serif',
    displayMD14: '500 14px Pretendard, sans-serif',
    displayMD12: '500 12px Pretendard, sans-serif',
    selectedBold16: '700 16px Pretendard, sans-serif',
    selectedBold14: '700 14px Pretendard, sans-serif',
    availableMD16: '500 16px/22px Pretendard, sans-serif',
    availableMD14: '500 14px Pretendard, sans-serif',
  },
  objectStyles: {
    radius: {
      s: '8px',
      m: '16px',
      l: '50%',
    },
    dropShadow: {
      normal: '0px 1px 4px 0px rgba(110, 128, 145, 0.24)',
      up: '0px 2px 8px 0px rgba(110, 128, 145, 0.16), 0px 2px 8px 0px rgba(110, 128, 145, 0.16)',
      floating:
        '0px 16px 16px 0px rgba(110, 128, 145, 0.24), 0px 0px 4px 0px rgba(110, 128, 145, 0.08)',
    },
  },
};
