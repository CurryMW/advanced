import { useEffect, useLayoutEffect, useReducer, useState, useDeferredValue, useRef } from "react";
import { Input, List } from "antd";
import Mock from "mockjs";
import "./App.css";
/*
 * 使用 useRef 用于获取DOM元素，但不触发重渲染，也可以用于保存任何可变值，类似于实例属性
 */

interface Item {
  id: number;
  name: string;
  age: number;
  address: string;
}

function App() {
  console.log("render");
  let ref = useRef(0);
  const [count, setCount] = useState(0);
  //1、 null 表示为空值  2、使元素可悲垃圾回收机制管理
  // undefined 表示未初始化 3、不会被垃圾回收机制管理
  const handlerRef = () => {
    setCount(count + 1);
    ref.current = count;
  };
  return (
    <div id="container">
      <div>1</div>
      <div>2</div>
      <div>
        {count} --- {ref.current}
      </div>
      <button onClick={handlerRef}>点我</button>
    </div>
  );
}

export default App;
