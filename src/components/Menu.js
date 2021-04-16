import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MenuBlock = styled.header`
  background-color: #000;
  width: 100%;
`;

const SyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 3rem;

  &:hover {
    color: #7e6969;
  }
`;

const StyledItem = styled.li`
  text-align: center;
`;

const Menu = () => {
  return (
    <MenuBlock>
      <ul>
        <StyledItem>
          <SyledLink to="/red">Red</SyledLink>
        </StyledItem>
        <StyledItem>
          <SyledLink to="/blue">Blue</SyledLink>
        </StyledItem>
        <StyledItem>
          <SyledLink to="/users">Users</SyledLink>
        </StyledItem>
      </ul>
    </MenuBlock>
  );
};

export default Menu;
