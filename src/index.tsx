import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthStore } from "./store";

export const Context = createContext(new AuthStore());

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Context.Provider value={new AuthStore()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
);
