import {
  Link,
  NavLink,
  useNavigate,
  useSearchParams,
  useLocation,
  useLoaderData,
} from "react-router-dom";

interface Order {
  name: string;
  age?: number;
}
export default function ReactDemo() {
  // 使用 useLoderData 获取组件loader获取到的数据渲染
  const info = useLoaderData() as Order[];
  return (
    <div>
      <h1>通过loder拿到数据</h1>
      {info.map(item => {
        return (``
          <div>
            姓名：{item.title}
            <br /> 年龄：{item.age}
          </div>
        );
      })}
    </div>
  );
}
