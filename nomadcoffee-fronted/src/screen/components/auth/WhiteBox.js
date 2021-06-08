import styled from "styled-components";

const SWhitebox = styled.div`
  background-color: white;
  border: 1px solid #8e8e8e;
  margin-top: 20px;
  padding: 10px;
  form {
    display: flex;
    flex-direction: column;
  }
`;

function WhiteBox({ children }) {
  return <SWhitebox>{children}</SWhitebox>;
}

export default WhiteBox;
