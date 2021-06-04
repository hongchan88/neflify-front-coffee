import { darkModeVar, isLoggedInVar } from "../apollo";
import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.fontcolor};
`;
const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

function Login() {
  return (
    <Container>
      <Title>Login</Title>
      <button onClick={() => darkModeVar(true)}>Dark mode</button>
      <button onClick={() => darkModeVar(false)}>Light mode</button>

      <button onClick={() => isLoggedInVar(true)}>Log in now!</button>
    </Container>
  );
}

export default Login;
