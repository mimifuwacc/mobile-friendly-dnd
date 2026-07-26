import { Link, Navigate, useParams } from "react-router";
import { SortableList } from "@/components/sortable-list";
import { findVariant } from "@/data/variants";

export function VariantPage() {
  const { slug } = useParams();
  const variant = slug ? findVariant(slug) : undefined;

  if (!variant) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <p className="back">
        <Link to="/">← 一覧</Link>
      </p>
      <h1>{variant.title}</h1>
      <p>{variant.summary}</p>
      <pre className="code">{variant.code}</pre>
      <SortableList key={variant.slug} variant={variant} />
    </>
  );
}
