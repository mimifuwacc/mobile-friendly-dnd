import type { PointerEvent } from "react";
import { PointerSensor } from "@dnd-kit/core";

/**
 * ペン入力 (pointerType === "pen") だけを拾う PointerSensor．
 * Surface Pen などは Touch Event ではなく Pointer Event として発火するため，
 * TouchSensor には入らない．これで指（Touch）・マウス（Mouse）と分けて扱える．
 */
export class PenSensor extends PointerSensor {
  static activators = [
    {
      eventName: "onPointerDown" as const,
      handler: ({ nativeEvent: event }: PointerEvent) => event.pointerType === "pen",
    },
  ];
}
