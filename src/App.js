import React from "react";
import MyApp from "./context/user";
import MyRouter from "./router";
import "./App.css";
function App() {
  return (
    <MyApp>
      <MyRouter />
    </MyApp>
  );
}

export default App;
