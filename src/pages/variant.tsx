import { Link, Navigate, useParams } from "react-router";
import { SortableList } from "@/components/sortable-list";
import { findVariant, findVariantByStep } from "@/data/variants";

export function VariantPage() {
  const { slug } = useParams();
  const variant = slug ? findVariant(slug) : undefined;

  if (!variant) {
    return <Navigate to="/" replace />;
  }
  const prev = findVariantByStep(variant.step - 1);
  const next = findVariantByStep(variant.step + 1);

  return (
    <>
      <p className="back">
        <Link to="/">← 一覧</Link>
      </p>
      <h1>{variant.title}</h1>
      <p>{variant.summary}</p>
      <div className="instructions">
        <p>結果: {variant.result}</p>
      </div>
      <pre className="code">{variant.code}</pre>
      <SortableList key={variant.slug} variant={variant} />
      <nav className="pagination" aria-label="デモの前後">
        {prev && (
          <Link to={`/${prev.slug}`}>
            <span aria-hidden="true">←</span> 前: {prev.title}
          </Link>
        )}
        {next ? (
          <Link className="pagination-next" to={`/${next.slug}`}>
            次: {next.title} <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <Link className="pagination-next" to="/current-api">
            次: 最近の dnd-kit <span aria-hidden="true">→</span>
          </Link>
        )}
      </nav>
    </>
  );
}
