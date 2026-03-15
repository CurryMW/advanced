import { useRoutes } from "react-router-dom";
import App from "../App";
import ReactDemo from "../ReactDemo";
import Error from "../Error";

/**
 * @param useRouters 路由配置
 * @description：使用useRouters配置路由，返回一个路由配置表。它将根据当前的URL路径匹配到对应的路由元素，并渲染相应的组件。
 */
function BaseRouter() {
  return useRoutes([
    { path: "/", element: <App /> },
    { path: "/react", element: <ReactDemo /> },
    { path: "*", element: <Error /> },
  ]);
}

export default BaseRouter;
