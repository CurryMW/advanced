import { useEffect, useLayoutEffect, useReducer, useState } from "react";
import "./App.css";
/*
 * 使用 useReducer 重构 useState 示例
 */
//   /* 方案一使用useState Hook */
// function App() {
//   const [count, setCount] = useState(0);
//   return (
//     <div id="container">
//       <button onClick={() => setCount(count + 1)}>+ 1</button>
//       <button onClick={() => setCount(count - 1)}>- 1</button>
//       <p>{count}</p>
//     </div>
//   );
// }
/* 方案二使用useReducer Hook */

const initialArg = {
  count: 0,
};
type State = typeof initialArg;
// 初始化函数，只执行一次
const initFn = (state: State) => {
  console.log("initFn执行了");
  return {
    count: 1,
  };
};
// 更新函数
const reducer = (state: State, action: { type: string }) => {
  switch (action.type) {
    case "add":
      return { count: state.count + 1 };
    case "sub":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialArg, initFn);
  return (
    <div id="container">
      <button
        onClick={() => {
          dispatch({ type: "add" });
        }}
      >
        + 1
      </button>
      <button
        onClick={() => {
          dispatch({ type: "sub" });
        }}
      >
        - 1
      </button>
      <p>{state.count}</p>
    </div>
  );
}

export default App;
