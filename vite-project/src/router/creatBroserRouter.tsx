import { useRoutes, createBrowserRouter, redirect } from "react-router-dom";
import App from "../App";
import ReactDemo from "../ReactDemo";
import Order from "../views/Order";
import Goods from "../views/Goods";
import Detail from "../views/Goods/detail";
import Error from "../Error";
import { message } from "antd";

interface From {
  name: string;
  possworder: string;
}
/**
 * @param createBrowserRouter 路由配置
 * @description：使用creatBrowserRouter配置路由表
 */
const loaderData = async () => {
  // return [
  //   {
  //     name: "A",
  //     age: 19,
  //   },
  //   {
  //     name: "B",
  //     age: 19,
  //   },
  //   {
  //     name: "C",
  //     age: 19,
  //   },
  // ];
  return await fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json());
};
// 使用 action 处理逻辑
const handerFrom = async ({ request }: { request: Request }) => {
  console.log("request", request.formData);
  const data = await request.formData();
  const name = data.get("username");
  const pass = data.get("password");
  if (name == "admin" && pass == "123") {
    return { success: true, message: "登陆成功" };
  }
  if (!name || !pass) {
    return {
      error: "请输入账号或者密码",
    };
  }

  return {
    error: "用户名密码错误",
  };
};
const BaseRouter = createBrowserRouter([
  { path: "/login", element: <App />, action: handerFrom },
  // 使用loader获取后端接口返回数据渲染`
  // { path: "/react", element: <ReactDemo />, loader: loaderData },
  { path: "/order/:id/goods/:goodsId", element: <Order /> }, // 定义动态路由
  {
    path: "/goods",
    element: <Goods />,
    children: [
      {
        path: "list",
        element: <div>商品列表</div>,
      },
      {
        path: "detail",
        element: <Detail />,
      },
    ],
  }, // 嵌套路由
  { path: "*", element: <Error /> },
]);
export default BaseRouter;
