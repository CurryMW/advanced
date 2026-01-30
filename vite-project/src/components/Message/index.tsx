/*
 *创建一个全局的message组件
 */

import ReactDom from "react-dom/client";
import "./index.css";
const Message = () => {
  return <div>Hello World</div>;
};
interface Itme {
  root: ReactDom.Root;
  messageContainer: HTMLDivElement;
}
const res: Itme[] = [];
// 给全局挂载一个触发事件
window.onShow = () => {
  const messageContainer = document.createElement("div");
  messageContainer.className = "message";
  messageContainer.style.top = `${res.length * 40}px`;
  document.body.appendChild(messageContainer); // 将该div添加到body里
  // 容器如何关联到根节点
  const root = ReactDom.createRoot(messageContainer);
  root.render(<Message />);
  res.push({
    root,
    messageContainer,
  });
  console.log("res", res);
  setTimeout(() => {
    const item = res.find(item => item.messageContainer === messageContainer)!;
    item.root.unmount();
    document.body.removeChild(messageContainer);
  }, 2000);
};
// 声明扩容
declare global {
  interface Window {
    onShow: () => void;
  }
}

export default Message;
