import { useState } from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "@/components/sortable-item";
import type { Variant } from "@/data/variants";

const INITIAL_ITEMS = Array(20)
  .fill(0)
  .map((_, i) => `Item ${i + 1}`);

export function SortableList({ variant }: { variant: Variant }) {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const sensors = variant.useVariantSensors();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over === null || active.id === over.id) return;

    setItems((current) => {
      const oldIndex = current.indexOf(String(active.id));
      const newIndex = current.indexOf(String(over.id));
      return arrayMove(current, oldIndex, newIndex);
    });
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul className="list">
          {items.map((id) => (
            <SortableItem key={id} id={id} touchActionNone={variant.touchActionNone} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
