import { useEffect, useState } from "react";
import "./App.css";
/*
 * useEffect 用法
 */
const Child = ({ name }: { name: string }) => {
  useEffect(() => {
    return () => {
      // 卸载组件时执行
      console.log("destory child");
    };
  });
  return <div>子组件</div>;
};
function App() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    // 充当生命周期，Didmonet 挂载组件时执行，Didupdate 更新组件时执行
    console.log("init");
    return () => {
      // 卸载组件时执行
      console.log("unmount");
    };
  }, [count]);

  return (
    <div id="root">
      <button onClick={() => setShow(!show)}>{show ? "显示" : "隐藏"}</button>
      <button onClick={() => setCount(count + 1)}>+ {count}</button>
      <input value={name} onChange={e => setName(e.target.value)}></input>
      {show && <Child name={name} />}
    </div>
  );
}

export default App;
