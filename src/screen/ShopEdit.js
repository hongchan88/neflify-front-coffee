import { darkModeVar, isLoggedInVar } from "../apollo";
import styled from "styled-components";
import AuthLayout from "./components/auth/AuthLayout";
import Separator from "./components/auth/Separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import WhiteBox from "./components/auth/WhiteBox";
import { useHistory, useParams, useLocation } from "react-router-dom";

import Pagetitle from "./components/PageTitile";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client";
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

const EDIT_COFFEESHOP = gql`
  mutation EDIT_COFFEESHOP(
    $shopid: Int
    $name: String
    $latitude: String
    $longitude: String
  ) {
    editCoffeeShop(
      shopid: $shopid
      name: $name
      latitude: $latitude
      longitude: $longitude
    ) {
      ok
    }
  }
`;

function ShopEdit() {
  const history = useHistory();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { id } = useParams();
  const ShopId = parseInt(id);

  const onCompleted = (data) => {
    const {
      editCoffeeShop: { ok },
    } = data;
    console.log(data);
    if (!ok) {
      return;
    }
    history.push(routes.home, {
      message: "<-edited done. please refresh to see updated",
      editId: ShopId,
    });
  };
  const [editShop, { loading }] = useMutation(EDIT_COFFEESHOP, {
    onCompleted,
  });
  const { register, handleSubmit, getValues } = useForm({ mode: "onChange" });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    editShop({
      variables: {
        ...data,
        shopid: ShopId,
      },
    });
  };

  return (
    <AuthLayout>
      <Pagetitle title="Sign up" />
      <Heading>Edit your shop</Heading>
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

          <Button type="submit" value="Edit shop" />
        </form>
        <TextWrapper></TextWrapper>
      </WhiteBox>
    </AuthLayout>
  );
}

export default ShopEdit;
