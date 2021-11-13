import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Home from "../Home";
import InitialiseGame from "../InitialiseGame";
import Result from "../Result";
import AppContext from "./AppContext";
import { ALLOWED_ATTEMPTS } from "./constants";
import reducer from "./reducer";

function AppContainer(props) {
  const [state, dispatch] = React.useReducer(
    reducer,
    { allowedAttempts: ALLOWED_ATTEMPTS },
    reducer.initReducer
  );

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Header />
      <Routes>
        <Route path="/" element={<InitialiseGame />} />
        <Route path="/home" element={<Home />} />
        <Route path="/find_falcone" element={<Result />} />
        <Route path="*" element={<InitialiseGame />} />
      </Routes>
      <Footer />
    </AppContext.Provider>
  );
}

export default AppContainer;
