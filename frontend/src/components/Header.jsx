import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <div className="logo">
        <h2>VTV</h2>
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Log In " : "Sign In"}
      </button>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  h2 {
    padding: 0.5rem;
    background-color: yellow;
    border: none;
    cursor: pointer;
    color: black;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }
  button {
    padding: 0.5rem;
    background-color: yellow;
    border: none;
    cursor: pointer;
    color: black;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }
`;
export default Header;
