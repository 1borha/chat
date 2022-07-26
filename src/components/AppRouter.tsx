import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Context } from "../index";
import { privateRoutes, publicRoutes } from "../router";

const AppRouter = observer(() => {
  const auth = useContext(Context);

  return auth.isAuth ? (
    <Routes>
      {privateRoutes.map((route, index) => (
        <Route path={route.path} element={route.element} key={index} />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route, index) => (
        <Route path={route.path} element={route.element} key={index} />
      ))}
    </Routes>
  );
});

export default AppRouter;
