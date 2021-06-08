import { darkModeVar, isLoggedInVar, logUserIn, logUserOut } from "../apollo";
import styled from "styled-components";
import AuthLayout from "./components/auth/AuthLayout";
import Separator from "./components/auth/Separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import routes from "../routes";
import { Link } from "react-router-dom";
import WhiteBox from "./components/auth/WhiteBox";

import AuthButton from "./components/auth/AuthButton";

import Pagetitle from "./components/PageTitile";
import { useForm } from "react-hook-form";
import FormError from "./components/FormError";
import { gql, useMutation } from "@apollo/client";
import { useLocation } from "react-router-dom";

const TextWrapper = styled.h3`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Heading = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 30px;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
`;

const Notification = styled.div`
  display: flex;
  justify-content: center;
  color: blueviolet;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

function Login() {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });
  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;

    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  };

  const clearLoginError = () => {
    clearErrors("result");
  };
  return (
    <AuthLayout>
      <Pagetitle title="log in" />
      <Heading>Sign in to your Account</Heading>

      <WhiteBox>
        <TextWrapper>
          <FontAwesomeIcon icon={faCoffee} size="3x" />
        </TextWrapper>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "Username is required",
              minLength: 5,
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars.",
              },
            })}
            onChange={clearLoginError}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: "Password is required.",
            })}
            onChange={clearLoginError}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <AuthButton
            type="submit"
            value="Log in"
            disabled={!formState.isValid || loading}
          />
        </form>
        <FormError message={errors?.result?.message} />
        <TextWrapper>
          <span>Forgot password?</span>
        </TextWrapper>
      </WhiteBox>
      <Separator />
      <WhiteBox>
        <div>
          <form>
            <Link to="/sign-up">
              <AuthButton type="button" value="Sign up" />
            </Link>
          </form>
        </div>
      </WhiteBox>
    </AuthLayout>
  );
}

export default Login;
