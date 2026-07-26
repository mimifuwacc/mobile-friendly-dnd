import { Link } from "react-router";
import { VARIANTS } from "@/data/variants";

export function TopPage() {
  return (
    <>
      <header>
        <h1>mobile-friendly-dnd</h1>
        <ul className="resources">
          <li>
            <a
              href="https://decks.mimifuwa.cc/20260727-zatult-study/#/1"
              target="_blank"
              rel="noreferrer"
            >
              発表資料を見る
            </a>
          </li>
          <li>
            <a
              href="https://github.com/mimifuwacc/mobile-friendly-dnd"
              target="_blank"
              rel="noreferrer"
            >
              GitHub リポジトリを見る
            </a>
          </li>
        </ul>
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
