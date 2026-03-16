import { Outlet } from "react-router-dom";

export default function Goods() {
  return (
    <div>
      <h1>商品页面</h1>
      {/* // 使用 Outlet 渲染子路由数据，类似vue中的 router-view slot 插槽 */}
      <Outlet />
    </div>
  );
}
