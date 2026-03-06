import { useEffect, useLayoutEffect, useReducer, useState } from "react";
import "./App.css";
/*
 * 使用 useSyncExternalStore
 */
import { useStorage } from "./hooks/useStorage";

function App() {
  const [res, setCount] = useStorage("count", { count: 0 });
  return (
    <div id="container">
      <p>地址：{res.count}</p>
      <button onClick={() => setCount({ count: res.count + 1 })}>push</button>
      <button onClick={() => setCount({ count: res.count - 1 })}>replace</button>
    </div>
  );
}

export default App;
