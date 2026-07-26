import { Link } from "react-router";
import { VARIANTS } from "@/data/variants";

export function TopPage() {
  return (
    <>
      <ol className="index">
        {VARIANTS.map((v) => (
          <li key={v.slug}>
            <Link to={`/${v.slug}`}>{v.title}</Link>
            <p>{v.summary}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
