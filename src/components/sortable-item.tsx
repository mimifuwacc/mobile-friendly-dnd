import type { CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem({ id, touchActionNone }: { id: string; touchActionNone: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    // touch-action: none を当てるとタッチでも掴める．当てないとスクロールに取られる．
    touchAction: touchActionNone ? "none" : undefined,
  };

  return (
    <li ref={setNodeRef} style={style} className="item" {...attributes} {...listeners}>
      <span className="handle" aria-hidden="true">
        ⠿
      </span>
      {id}
    </li>
  );
}
