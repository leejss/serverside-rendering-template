import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UsersBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ListBlock = styled.ul`
  list-style: none;
  font-size: 3rem;
  text-align: center;
  a {
    text-decoration: none;
    color: #db2e1a;
    transition: 0.2s;
  }
  a:hover {
    color: #f59d93;
  }
`;

const Users = ({ users }) => {
  if (!users) return null;
  return (
    <UsersBlock>
      <ListBlock>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ListBlock>
    </UsersBlock>
  );
};

export default Users;
