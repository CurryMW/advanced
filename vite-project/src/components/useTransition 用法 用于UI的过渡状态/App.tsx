import { useEffect, useLayoutEffect, useReducer, useState, useTransition } from "react";
import { Input, List } from "antd";
import "./App.css";
/*
 * 使用 useTranisition 用于处理UI的过渡状态
 */

interface Item {
  id: number;
  name: string;
  age: number;
  address: string;
}

function App() {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState("");
  const [list, setList] = useState<Item[]>([]);
  // 获取输入框的值
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("输入框的值", e.target.value);
    setValue(e.target.value);
    // 模拟异步请求
    fetch("/api/mock/list?keys=" + e.target.value)
      .then(res => res.json())
      .then(data => {
        startTransition((): any => {
          setList(data.list);
        });
      });
  };
  return (
    <div id="container">
      <Input placeholder="请输入内容" value={value} onChange={handlerChange} />
      {isPending && <div>正在加载...</div>}
      <List
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item>
            {item.name} - {item.age} - {item.address}
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;
