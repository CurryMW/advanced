import { useParams } from "react-router-dom";
export default function Order() {
  // 获取动态路由传递的参数
  const order = useParams();
  return (
    <div>
      <h1>订单详情</h1>
      <p>订单ID: {order.id}</p>
      <p>订单ID: {order.goodsId}</p>
    </div>
  );
}
