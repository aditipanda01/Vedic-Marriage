import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const GlobalStyles = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,700|Plus+Jakarta+Sans:700");

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${theme.typography.fontFamily};
    background-color: ${theme.colors.background.default};
    color: ${theme.colors.text.primary};
    line-height: 1.5;
  }

  /* Custom font classes */
  .font-montserrat {
    font-family: "Montserrat", Helvetica;
  }

  .font-plus-jakarta {
    font-family: "Plus Jakarta Sans", Helvetica;
  }

  /* CSS Variables from original design */
  :root {
    --background-color: rgba(244, 247, 254, 1);
    --black: rgba(50, 50, 50, 1);
    --blue: rgba(68, 120, 255, 1);
    --body-14pt-font-family: "Montserrat", Helvetica;
    --body-14pt-font-size: 14px;
    --body-14pt-font-style: normal;
    --body-14pt-font-weight: 400;
    --body-14pt-letter-spacing: 0px;
    --body-14pt-line-height: 16px;
    --caption-12pt-font-family: "Montserrat", Helvetica;
    --caption-12pt-font-size: 12px;
    --caption-12pt-font-style: normal;
    --caption-12pt-font-weight: 400;
    --caption-12pt-letter-spacing: 0px;
    --caption-12pt-line-height: normal;
    --e-84420: rgba(237, 97, 41, 1);
    --grey: rgba(153, 153, 153, 1);
    --label-11pt-font-family: "Montserrat", Helvetica;
    --label-11pt-font-size: 11px;
    --label-11pt-font-style: normal;
    --label-11pt-font-weight: 400;
    --label-11pt-letter-spacing: 0px;
    --label-11pt-line-height: 16px;
    --orange: rgba(231, 95, 40, 1);
    --pink: rgba(242, 69, 136, 1);
    --variable-collection-light-grey: rgba(150, 150, 150, 1);
    --variable-collection-1light-grey: rgba(184, 180, 196, 1);
    --white: rgba(255, 255, 255, 1);
  }

  a {
    color: ${theme.colors.primary.main};
    text-decoration: none;
    transition: color ${theme.transitions.fast};

    &:hover {
      color: ${theme.colors.primary.dark};
    }
  }

  button {
    font-family: ${theme.typography.fontFamily};
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
  }

  input, textarea, select {
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography.body1.fontSize};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.h1.fontWeight};
    line-height: ${theme.typography.h1.lineHeight};
  }

  h1 { font-size: ${theme.typography.h1.fontSize}; }
  h2 { font-size: ${theme.typography.h2.fontSize}; }
  h3 { font-size: ${theme.typography.h3.fontSize}; }
  h4 { font-size: ${theme.typography.h4.fontSize}; }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background.default};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.secondary.light};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.secondary.main};
  }
`;

export default GlobalStyles; 