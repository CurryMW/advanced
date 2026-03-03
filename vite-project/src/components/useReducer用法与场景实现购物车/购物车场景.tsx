import { useEffect, useLayoutEffect, useReducer, useState } from "react";
import "./App.css";
/*
 * 使用 useReducer 实现购物车功能
 */
const initData = [
  {
    id: 1,
    name: "苹果",
    price: 10,
    count: 1,
    isEdit: false,
  },
  {
    id: 2,
    name: "香蕉",
    price: 5,
    count: 2,
    isEdit: false,
  },
  {
    id: 3,
    name: "橘子",
    price: 20,
    count: 1,
    isEdit: false,
  },
];
type State = typeof initData;
// initFn 初始化函数，只执行一次
const initFn = (state: State) => {
  return state;
};
// 更新函数
const reducer = (state: State, action: { type: string; id: number; newName?: string }) => {
  console.log("1");
  const item = state.find(item => item.id === action.id)!;
  console.log("item", item);
  switch (action.type) {
    case "add":
      item.count++;
      return [...state];
    case "sub":
      item.count--;
      return [...state];
    case "del":
      console.log(
        "111",
        state.filter(item => item.id === action.id)
      );
      return state.filter(item => item.id !== action.id);
    case "edit":
      item.isEdit = !item.isEdit;
      return [...state];
    case "edit-name":
      item.name = action.newName!;
      return [...state];
    case "edit-blur":
      item.isEdit = false;
      return [...state];
    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initData, initFn);
  return (
    <div id="container">
      <h1>购物车</h1>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>序号</th>
            <th>商品名称</th>
            <th>商品价格</th>
            <th>商品数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {state.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {item.isEdit ? (
                    <input
                      onBlur={e => dispatch({ type: "edit-blur", id: item.id })}
                      type="text"
                      onChange={e =>
                        dispatch({ type: "edit-name", id: item.id, newName: e.target.value })
                      }
                      value={item.name}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>{item.price}</td>
                <td>
                  <button onClick={() => dispatch({ type: "sub", id: item.id })}>-</button>
                  <span>{item.count}</span>
                  <button onClick={() => dispatch({ type: "add", id: item.id })}>+</button>
                </td>
                <td>
                  <button onClick={() => dispatch({ type: "edit", id: item.id })}>编辑</button>
                  <button onClick={() => dispatch({ type: "del", id: item.id })}>删除</button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={1}>总价：</td>
            <td colSpan={4}>
              结算：
              {state.reduce((total, item) => {
                return total + item.price * item.count;
              }, 0)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
