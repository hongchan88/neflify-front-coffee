import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screen/Home";
import Login from "./screen/Login";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";

import { isLoggedInVar, darkModeVar, client } from "./apollo.js";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import Signup from "./screen/Signup";
import AddShop from "./screen/AddShop";
import Shop from "./screen/ShopEdit";
import ShopEdit from "./screen/ShopEdit";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path="/" exact>
                {isLoggedIn ? <Home /> : <Login />}
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/sign-up" exact>
                <Signup />
              </Route>
              <Route path="/add" exact>
                <AddShop />
              </Route>
              <Route path="/shopEdit/:id" exact>
                <ShopEdit />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}
export default App;
