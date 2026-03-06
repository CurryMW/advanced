import { useEffect, useLayoutEffect, useReducer, useState, useDeferredValue } from "react";
import { Input, List } from "antd";
import Mock from "mockjs";
import "./App.css";
/*
 * 使用 useDeferredValue 用于延迟某些状态的更新，直到主渲染任务完成
 */

interface Item {
  id: number;
  name: string;
  age: number;
  address: string;
}

function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState<Item[]>(() => {
    return Mock.mock({
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      "list|2000": [
        {
          id: "@id",
          name: "@cname",
          age: "@integer(18, 60)",
          address: "@county(true)",
        },
      ],
    }).list;
  });
  // 获取需要延迟的值
  const deferredValue = useDeferredValue(value);
  console.log("deferredValue", deferredValue, value);
  const isDom = deferredValue !== value;
  const filtName = () => {
    return list.filter(item => item.name.includes(value));
  };
  return (
    <div id="container">
      <Input placeholder="请输入内容" value={value} onChange={e => setValue(e.target.value)} />
      <List
        style={{ opacity: isDom ? 0.5 : 1, transition: "opacity 0.3s" }}
        itemLayout="horizontal"
        dataSource={filtName()}
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
