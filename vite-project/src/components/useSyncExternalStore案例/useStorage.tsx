import { useEffect, useLayoutEffect, useReducer, useState } from "react";
import "./App.css";
/*
 * 使用 useSyncExternalStore
 */
import { useStorage } from "./hooks/useStorage";

function App() {
  const [count, setCount] = useStorage("count", 0);
  return (
    <div id="container">
      <p>{count}</p>
      <button onClick={() => setCount(Number(count) + 1)}>+ 1</button>
      <button onClick={() => setCount(Number(count) - 1)}>- 1</button>
    </div>
  );
}

export default App;
