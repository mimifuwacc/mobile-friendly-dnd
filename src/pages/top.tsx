import { Link } from "react-router";
import { VARIANTS } from "@/data/variants";

export function TopPage() {
  return (
    <>
      <h1>Legacy API（@dnd-kit/core）</h1>
      <ol className="index">
        {VARIANTS.map((v) => (
          <li key={v.slug}>
            <Link to={`/${v.slug}`}>{v.title}</Link>
            <p>{v.summary}</p>
          </li>
        ))}
      </ol>
      <h1>現行 API（@dnd-kit/react）</h1>
      <ul className="index">
        <li>
          <Link to="/current-api">デフォルト設定</Link>
          <p>Sensorの指定なしで、タッチには250msの長押しが適用される。</p>
        </li>
      </ul>
    </>
  );
}
