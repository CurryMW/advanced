import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./components/Card";

function App() {
  return (
    <>
      {/* 可以传递 */}
      <Card
        title={"我喜欢男的"}
        el={<div>扩展内容</div>}
        isFlag={true}
        empty={null}
        arr={[1, 2]}
        fn={() => console.log("函数")}
        unde={undefined}
      >
        <div>内容区域</div>
      </Card>
      <Card title={"我喜欢女的"} />
      {/* <button onClick={() => window.onShow()}>全局弹窗</button> */}
    </>
  );
}

export default App;
