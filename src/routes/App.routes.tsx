import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import UsersContainer from "../components/user/UsersContainer";

export const AppRoutes = (): ReactElement => {
  return (
    <Routes>
      <Route path={"/"} element={<UsersContainer />} />
      <Route path={"/user/:userId"} element={<UsersContainer />} />
    </Routes>
  );
};
