import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    font-weight: 300;
    font-display: swap;
    src: local('Pretendard Black'), url('./assets/fonts/woff2/Pretendard-Black.woff2') format('woff2');
  }

  body {
    font-family: 'Pretendard', sans-serif;
    margin: 0;
    padding: 0;
  }
  
  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    width: 100%;
  }
`;

export default GlobalStyles;
