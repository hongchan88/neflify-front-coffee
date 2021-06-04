import { useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screen/Home";
import Login from "./screen/Login";
import { ThemeProvider } from "styled-components";

import { isLoggedInVar, darkModeVar } from "./apollo.js";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          <Route></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
export default App;
