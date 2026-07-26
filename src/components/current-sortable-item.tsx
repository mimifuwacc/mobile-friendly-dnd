import { useSortable } from "@dnd-kit/react/sortable";

export function CurrentSortableItem({ id, index }: { id: string; index: number }) {
  const { ref, isDragging } = useSortable({ id, index });

  return (
    <li ref={ref} className="item" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <span className="handle" aria-hidden="true">
        ⠿
      </span>
      {id}
    </li>
  );
}
