/*
 * react 兄弟组件通信
 * 类似event bus事件总线(vue) window.addEventListener
 * 在项目中更多是使用：redux mobx zustand recoil等状态管理库
 */
import React from "react";
import "./index.less";
// 版本一
interface Props {
  title?: string;
  children?: React.ReactNode;
  el?: React.ReactNode;
  envet?: (n: string) => any;
}

// export default function Card(props: Props | any) {
//   console.log("props", props);
//   return (
//     <div className="card">
//       <h2>{props.title}</h2>
//       {props.children}
//     </div>
//   );
// }

// 版本二
const Card: React.FC<Props> = props => {
  // console.log("props", props.envet("子组件触发父组件通信"));
  const event = new Event("card-event-chlicked"); // 添加事件中心
  const clickCard = () => {
    event.params = "我是卡片1组件传递的参数"; // 添加参数
    window.dispatchEvent(event); // 派发事件
  };

  return (
    <div className="card">
      <h2>{props.title}</h2>
      {props.children}
      <button onClick={clickCard}>点击派发事件</button>
    </div>
  );
};
// 扩充event类型
declare global {
  interface Event {
    params?: any;
  }
}

export default Card;
