import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppContainer from "./modules/AppContainer";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </div>
  );
}
