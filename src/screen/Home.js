import { isLoggedInVar, logUserIn, logUserOut } from "../apollo";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Notification = styled.div`
  display: flex;
  justify-content: center;
  color: blueviolet;
`;

const GET_COFFEESHOPS = gql`
  query GET_COFFEESHOPS($page: Int, $id: Int) {
    seeCoffeeShops(page: $page, id: $id) {
      ok
      CoffeeShop {
        name
        longitude
        id
      }
    }
  }
`;

function Home() {
  const location = useLocation();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const token = localStorage.getItem("token");
  const { id } = jwt.verify(token, "<M0(8%K=.zxP?zj%h%ltq2c5z{ZNi6");

  const { data, loading } = useQuery(GET_COFFEESHOPS, {
    variables: { page: 1, id },
  });

  if (!loading) {
    var shopName = () =>
      data.seeCoffeeShops.CoffeeShop.map(({ name, id }) => {
        return (
          <div>
            <span>
              Shop Name: <Link to={`shopEdit/${id}`}>{name}</Link>
            </span>
            <span>
              &nbsp;&nbsp;&nbsp;
              {location?.state?.editId === id ? location?.state?.message : null}
            </span>
          </div>
        );
      });

    console.log(data);
  }
  console.log(data);
  // function getShopNames() {
  //   if (!loading) {
  //     const { name } = data.seeCoffeeShop.CoffeeShop;
  //     return name;
  //   }
  // }

  return (
    <div>
      <h1>Welcome we did it </h1>
      <div>
        <h1>List of the shops you registered</h1>
        {!loading ? shopName() : undefined}
      </div>

      <button onClick={() => logUserOut()}>Log out now!</button>
    </div>
  );
}

export default Home;
