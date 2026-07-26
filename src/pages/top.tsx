import { Link } from "react-router";
import { VARIANTS } from "@/data/variants";

export function TopPage() {
  return (
    <>
      <header>
        <h1>mobile-friendly-dnd</h1>
      </header>

      <section>
        <h2>Legacy API</h2>
        <ol className="index">
          {VARIANTS.map((variant) => (
            <li key={variant.slug}>
              <Link to={`/${variant.slug}`}>{variant.title}</Link>
              <p>{variant.summary}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2>新しい dnd-kit</h2>
        <p>デフォルトでタッチ操作に遅延が入ります．</p>
        <Link to="/current-api">試してみる</Link>
      </section>
    </>
  );
}
