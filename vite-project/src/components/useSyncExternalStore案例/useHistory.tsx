import { useEffect, useLayoutEffect, useReducer, useState } from "react";
import "./App.css";
/*
 * 使用 useSyncExternalStore
 */
import { useHistory } from "./hooks/useHistory";

function App() {
  const [url, push, replace] = useHistory();
  return (
    <div id="container">
      <p>地址：{url}</p>
      <button onClick={() => push("/x")}>push</button>
      <button onClick={() => replace("/y")}>replace</button>
    </div>
  );
}

export default App;
