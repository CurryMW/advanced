import { useRoutes, createBrowserRouter } from "react-router-dom";
import App from "../App";
import ReactDemo from "../ReactDemo";
import Order from "../views/Order";
import Goods from "../views/Goods";
import Detail from "../views/Goods/detail";
import Error from "../Error";

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
const BaseRouter = createBrowserRouter([
  { path: "/", element: <App /> },
  // 使用loader获取后端接口返回数据渲染
  { path: "/react", element: <ReactDemo />, loader: loaderData },
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
