import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./components/父子及其兄弟组件通信/Card";
import Card2 from "./components/父子及其兄弟组件通信/Card2";

function App() {
  /**
   * @param {string}
   * @description 父组件函数，现实父子组件通信
   */
  // const envet = (title: string) => {
  //   console.log(title, "我是父组件的函数");
  // };
  return (
    <>
      {/* 可以传递:envet={envet} */}
      <Card>
        <div>内容区域</div>
      </Card>
      <Card2 title={"我喜欢女的"} />
      {/* <button onClick={() => window.onShow()}>全局弹窗</button> */}
    </>
  );
}

export default App;
