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
      <h1>新しい dnd-kit では…</h1>
      <p>
        それぞれの Sensor が自動的に設定され，タッチ操作については 250ms の長押しと5pxの許容移動
        (tolerance) がデフォルトで設定される．
      </p>
      <div className="instructions">
        <p>結果: 一つ前のデモと同様に動作します．</p>
      </div>
      <pre className="code">{code}</pre>
      <CurrentSortableList />
      <nav className="pagination" aria-label="デモの前後">
        <Link to="/with-touch-sensor-delay">
          <span aria-hidden="true">←</span> 前: TouchSensor に遅延を入れる
        </Link>
      </nav>
    </>
  );
}
