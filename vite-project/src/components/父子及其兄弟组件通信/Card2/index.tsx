/*
 * react 父子组件通信：react18-19
 * 父子组件通信：子组件通过props接收
 * props 属性可接受内容：1. 字符串 2. 数字 3. 布尔值 4. 对象 5. 数组 6. 函数 7. 组件 8. JSX元素（其中为一项时是对象形式、多项则为数组形式接收）
 */
import React from "react";
import "./index.less";
// 版本一
interface Props {
  title: string;
  children?: React.ReactNode;
  el?: React.ReactNode;
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
  window.addEventListener("card-event-chlicked", e => {
    console.log(e, "触发了");
    console.log(e.params, "接收兄弟组件派发的参数传递");
  });
  return (
    <div className="card">
      <h2>{props.title}</h2>
      {props.children}
    </div>
  );
};

export default Card;
