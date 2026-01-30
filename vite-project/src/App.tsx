import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <button onClick={() => window.onShow()}>全局弹窗</button>
    </>
  );
}

export default App;
