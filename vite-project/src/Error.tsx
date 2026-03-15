import { useParams } from "react-router-dom";

export default function Error() {
  const err = useParams();
  console.log("错误路由参数：", err);
  return (
    <div>
      <h1>404 Not Found</h1>
    </div>
  );
}
