import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { CurrentSortableItem } from "@/components/current-sortable-item";

const INITIAL_ITEMS = Array(20)
  .fill(0)
  .map((_, i) => `Item ${i + 1}`);

export function CurrentSortableList() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const { source } = event.operation;
        if (!isSortable(source) || source.initialIndex === source.index) return;

        setItems((current) => {
          const next = [...current];
          const [moved] = next.splice(source.initialIndex, 1);
          next.splice(source.index, 0, moved);
          return next;
        });
      }}
    >
      <ul className="list">
        {items.map((id, index) => (
          <CurrentSortableItem key={id} id={id} index={index} />
        ))}
      </ul>
    </DragDropProvider>
  );
}
