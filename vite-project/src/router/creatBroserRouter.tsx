import { useRoutes, createBrowserRouter } from "react-router-dom";
import App from "../App";
import ReactDemo from "../ReactDemo";
import Order from "../views/Order";
import Error from "../Error";

/**
 * @param createBrowserRouter 路由配置
 * @description：使用creatBrowserRouter配置路由表
 */
const BaseRouter = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/react", element: <ReactDemo /> },
  { path: "/order/:id/goods/:goodsId", element: <Order /> }, // 定义动态路由
  { path: "*", element: <Error /> },
]);
export default BaseRouter;
