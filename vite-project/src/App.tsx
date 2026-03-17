import React, { useContext } from "react";
import { Input, List } from "antd";
import { BrowserRouter, Route, Routes, Form, useActionData } from "react-router-dom";
import Mock from "mockjs";
import ReactDemo from "./ReactDemo";
import Error from "./Error";
import "./App.css";

function App() {
  // 使用 useActionData 拿到返回的数据
  const info = useActionData();

  return (
    <div>
      <Form method="POST" action="/login">
        <div>
          <label htmlFor="username">
            用户名：
            <input type="text" name="username" />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            密码：
            <input type="password" name="password" />
          </label>
        </div>
        <p>{info?.error && <p style={{ color: "red" }}>{info?.error}</p>}</p>
        <p>{info?.success && <p style={{ color: "red" }}>{info?.message}</p>}</p>
        <button type="submit">登陆</button>
      </Form>
    </div>
  );
}

export default App;
