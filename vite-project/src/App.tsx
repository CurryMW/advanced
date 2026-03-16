import React, { useContext } from "react";
import { Input, List } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mock from "mockjs";
import ReactDemo from "./ReactDemo";
import Error from "./Error";
import "./App.css";

// browserRouter 使用history API 来保持 UI 和 URL 的同步。它适用于现代浏览器，支持 HTML5 history API（pushState, replaceState 和 popstate 事件）。如果你需要兼容老版本的浏览器，可以使用 HashRouter，它使用 URL 的 hash 部分来保持 UI 和 URL 的同步。

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Add" element={<div>Add</div>}></Route>
        <Route path="/List" element={<div>List</div>}></Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
