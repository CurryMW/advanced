import { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
/*
 * 使用 useLayoutEffect 业务场景模拟滚动位置不变
 */
function App() {
  const handlerScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    window.history.replaceState(null, "", `?top=${scrollTop}`); // 在地址栏后面记录滚动位置
    console.log("滚动事件", scrollTop);
  };
  useLayoutEffect(() => {
    const top = window.location.search.split("=")[1];
    console.log("window.location", window.location);

    if (top) {
      const root = document.getElementById("container");
      root?.scrollTo(0, Number(top));
    }
  }, []);
  return (
    <div onScroll={handlerScroll} id="container" style={{ height: "400px", overflow: "auto" }}>
      {Array(1000)
        .fill(0)
        .map((item, index) => (
          <div key={index}>{index}</div>
        ))}
    </div>
  );
}

export default App;
