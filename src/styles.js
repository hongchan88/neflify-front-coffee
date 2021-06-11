import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "#2c2c2c",
  bgColor: "white",
  accent: "blue",
};

export const darkTheme = {
  fontColor: "lightgray",
  bgColor: "grey",
  accent: "blue",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
      background-color:${(props) => props.theme.bgColor};
      font-size:14px;
        font-family:'Open Sans', sans-serif;
        color:${(props) => props.theme.fontColor};
        
    }
`;
