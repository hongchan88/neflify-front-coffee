import { darkModeVar, isLoggedInVar } from "../apollo";
import styled from "styled-components";
import AuthLayout from "./components/auth/AuthLayout";
import Separator from "./components/auth/Separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import WhiteBox from "./components/auth/WhiteBox";
import { useHistory } from "react-router-dom";

import Pagetitle from "./components/PageTitile";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import routes from "../routes";

const Button = styled.input`
  border: none;
  border-radius: 3px;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
`;

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

const Icon = styled.div`
  display: flex;
  justify-content: center;
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

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $name: String!
    $location: String!
    $password: String!
  ) {
    createAccount(
      username: $username
      email: $email
      name: $name
      location: $location
      password: $password
    ) {
      ok
    }
  }
`;

function Signup() {
  const history = useHistory();
  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;
    console.log(data);
    if (!ok) {
      return;
    }
    const { username, password } = getValues();
    history.push(routes.home, {
      message: "Acount created please log in",
      username,
      password,
    });
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, getValues } = useForm({ mode: "onChange" });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };

  return (
    <AuthLayout>
      <Pagetitle title="Sign up" />
      <Heading>Sign in to your Account</Heading>
      <WhiteBox>
        <Icon>
          <FontAwesomeIcon icon={faCoffee} size="3x" />
        </Icon>

        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({ required: "user name required" })}
            name="username"
            type="text"
            placeholder="username"
          />
          <Input
            ref={register({ required: "password required" })}
            name="password"
            type="text"
            placeholder="password"
          />
          <Input
            ref={register({ required: "email required" })}
            name="email"
            type="text"
            placeholder="email"
          />
          <Input
            ref={register({ required: "name required" })}
            name="name"
            type="text"
            placeholder="name"
          />
          <Input
            ref={register({ required: "location required" })}
            name="location"
            type="text"
            placeholder="location"
          />

          <Button type="submit" value="Sign up" />
        </form>
        <TextWrapper></TextWrapper>
      </WhiteBox>
    </AuthLayout>
  );
}

export default Signup;
