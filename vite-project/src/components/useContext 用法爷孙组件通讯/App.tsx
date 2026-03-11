import React, {
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
  useDeferredValue,
  useRef,
  useContext,
} from "react";
import { Input, List } from "antd";
import Mock from "mockjs";
import "./App.css";
/*
 * 使用 useContext 钩子函数，可以让我们在不编写许多包装组件的情况下读取 React 上下文(爷孙之间通信)
 */

interface Theme {
  theme: string;
}

// 定义一个 Context
const ThemeContext = React.createContext({} as Theme);
function Child() {
  const theme = useContext(ThemeContext);
  return (
    <div>
      Child
      <div>{theme.theme}</div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <div id="container">
      <ThemeContext value={{ theme: theme }}>
        <Child />
      </ThemeContext>
      <button onClick={() => setTheme(theme == "light" ? "dark" : "light")}>点击</button>
    </div>
  );
}

export default App;
