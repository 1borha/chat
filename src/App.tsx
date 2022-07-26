import React from "react";
import "./App.scss";
import AppRouter from "./components/AppRouter";

/**
 * Main file.
 * @return {JSX.Element}
 */
function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default React.memo(App);
