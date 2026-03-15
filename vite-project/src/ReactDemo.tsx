import { Link, NavLink, useNavigate, useSearchParams, useLocation } from "react-router-dom";
export default function ReactDemo() {
  console.log("通过地址栏形式传递参数：", window.location.search);
  const [searchParams] = useSearchParams();
  console.log("通过URLSearchParams获取参数：", searchParams.get("name"));
  const loaction = useLocation();
  console.log("通过useLocation获取参数：", loaction.state);

  const handlerName = ({ isActive, isPending }) => {
    console.log("路由状态：", isActive, isPending);

    // 根据路由状态返回不同的类名（可自定义）
    // isPending: 路由正在跳转中
    // isActive: 路由已激活（当前匹配）
    if (isPending) {
      return "nav-link pending";
    }
    return isActive ? "nav-link active" : "nav-link";
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/List", { replace: true, state: { name: "John", age: 19 } });
  };

  return (
    <div>
      <h1>实现路由跳转</h1>
      <Link to="/react?name=John" state={{ name: "John", age: 18 }}>
        Add
      </Link>
      <NavLink to="/List" className={handlerName}>
        List
      </NavLink>
      <button onClick={() => handleNavigate()}>跳转</button>
    </div>
  );
}
