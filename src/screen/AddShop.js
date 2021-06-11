import { darkModeVar, isLoggedInVar } from "../apollo";
import styled from "styled-components";
import AuthLayout from "./components/auth/AuthLayout";
import Separator from "./components/auth/Separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import WhiteBox from "./components/auth/WhiteBox";
import { useHistory } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Pagetitle from "./components/PageTitile";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import routes from "../routes";
import jwt from "jsonwebtoken";

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

const SHOPCREATE_MUTATION = gql`
  mutation createcoffeeshop(
    $name: String!
    $latitude: String!
    $longitude: String
    $categories: String
    $id: Int
  ) {
    CreateCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      categories: $categories
      id: $id
    ) {
      ok
    }
  }
`;

function AddShop() {
  // history.push(routes.home, {
  //   message: "Acount created please log in",
  // });
  const history = useHistory();
  const token = localStorage.getItem("token");
  const { id } = jwt.verify(token, "<M0(8%K=.zxP?zj%h%ltq2c5z{ZNi6");

  const [createShop, { loading }] = useMutation(SHOPCREATE_MUTATION, {
    onCompleted: (data) => {
      const history = createHistory();

      history.push(routes.home, {});
      history.go(0);
    },
  });
  const { register, handleSubmit } = useForm();
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    console.log(data);
    createShop({
      variables: {
        ...data,
        id,
      },
    });
  };

  return (
    <AuthLayout>
      <Pagetitle title="Sign up" />
      <Heading>Create new Coffee shop</Heading>
      <WhiteBox>
        <Icon>
          <FontAwesomeIcon icon={faCoffee} size="3x" />
        </Icon>

        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({ required: "user name required" })}
            name="name"
            type="text"
            placeholder="name"
          />
          <Input
            ref={register}
            name="latitude"
            type="text"
            placeholder="latitude"
          />
          <Input
            ref={register}
            name="longitude"
            type="text"
            placeholder="longitude"
          />
          <Input
            ref={register}
            name="categories"
            type="text"
            placeholder="categories"
          />

          <Input ref={register} name="file" type="text" placeholder="file" />

          <Button type="submit" value="Add shop" />
        </form>
        <TextWrapper></TextWrapper>
      </WhiteBox>
    </AuthLayout>
  );
}

export default AddShop;
