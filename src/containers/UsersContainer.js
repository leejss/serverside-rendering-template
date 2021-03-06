import React, { useEffect } from "react";
import { connect } from "react-redux";
import Users from "../components/Users";
import { Preloader } from "../lib/PreloadContext";
import { getUsers } from "../modules/users";

const UsersContainer = ({ users, getUsers }) => {
  useEffect(() => {
    if (users) return;
    getUsers();
  }, [users, getUsers]);

  return (
    <>
      <Users users={users} />
      <Preloader resolve={getUsers} />
    </>
  );
};

export default connect(
  (state) => ({
    users: state.users.users,
  }),
  {
    getUsers,
  }
)(UsersContainer);
