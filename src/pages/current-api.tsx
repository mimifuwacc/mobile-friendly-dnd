import { Link } from "react-router";
import { CurrentSortableList } from "@/components/current-sortable-list";

const code = `<DragDropProvider>
  {items.map((id, index) => (
    <SortableItem id={id} index={index} />
  ))}
</DragDropProvider>

// sensors の指定なし
// PointerSensor と KeyboardSensor が自動登録される
// touch はデフォルトで delay: 250, tolerance: 5`;

export function CurrentApiPage() {
  return (
    <>
      <p className="back">
        <Link to="/">← 一覧</Link>
      </p>
      <h1>現行 API（デフォルト設定）</h1>
      <p>
        @dnd-kit/react の現行 API。Sensor を設定しなくても、タッチでは 250ms
        の長押しと5pxの許容移動がデフォルトで使われる。
      </p>
      <pre className="code">{code}</pre>
      <CurrentSortableList />
    </>
  );
}
