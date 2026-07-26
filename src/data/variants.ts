import {
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { PenSensor } from "@/sensors/pen-sensor";

export type Variant = {
  slug: string;
  title: string;
  summary: string;
  /** 実際に使っている sensor 設定 (表示用) */
  code: string;
  /** 項目に touch-action: none を当てるか */
  touchActionNone: boolean;
  useVariantSensors: () => ReturnType<typeof useSensors>;
};

const keyboard = () => useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates });

export const VARIANTS: Variant[] = [
  {
    slug: "only-pointer-sensor",
    title: "PointerSensor",
    summary: "PointerSensorのみ設定する",
    code: `useSensor(PointerSensor, {
  activationConstraint: { distance: 8 },
})
// CSS: touch-action: none;`,
    touchActionNone: false,
    useVariantSensors: () =>
      useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), keyboard()),
  },
  {
    slug: "with-touch-action-none",
    title: "PointerSensor + touch-action: none",
    summary:
      "公式の推奨。項目に touch-action: none を当てるとタッチでも掴める。ただしその項目の上では縦スクロールできない。",
    code: `useSensor(PointerSensor, {
  activationConstraint: { distance: 8 },
})`,
    touchActionNone: true,
    useVariantSensors: () =>
      useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), keyboard()),
  },
  {
    slug: "with-touch-sensor",
    title: "PointerSensor + TouchSensor",
    summary:
      "長押し版から遅延を外し、TouchSensor も distance 発火にした版。要素を移動するときにスクロールもしてしまう。",
    code: `useSensor(MouseSensor, {
  activationConstraint: { distance: 8 },
})
useSensor(TouchSensor, {
  activationConstraint: { distance: 8 },
})`,
    touchActionNone: false,
    useVariantSensors: () =>
      useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
        useSensor(TouchSensor, { activationConstraint: { distance: 8 } }),
        keyboard(),
      ),
  },
  {
    slug: "with-touch-sensor-delay",
    title: "PointerSensor + TouchSensor (長押し)",
    summary:
      "長押し 250ms でドラッグ開始。素早いスワイプはスクロールになるので、touch-action なしで両立できる。",
    code: `useSensor(MouseSensor, {
  activationConstraint: { distance: 8 },
})
useSensor(TouchSensor, {
  activationConstraint: { delay: 250, tolerance: 5 },
})`,
    touchActionNone: false,
    useVariantSensors: () =>
      useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
        useSensor(TouchSensor, {
          activationConstraint: { delay: 250, tolerance: 5 },
        }),
        keyboard(),
      ),
  },
  {
    slug: "with-pen-sensor",
    title: "PointerSensor + TouchSensor + PenSensor",
    summary:
      "指は TouchSensor(長押し)、ペンは pointerType === 'pen' だけ拾う PenSensor(distance)、マウスは MouseSensor に振り分ける。Surface Pen でもドラッグできる。",
    code: `class PenSensor extends PointerSensor {
  static activators = [{
    eventName: "onPointerDown",
    handler: ({ nativeEvent }) =>
      nativeEvent.pointerType === "pen",
  }];
}

useSensor(MouseSensor, { activationConstraint: { distance: 8 } })
useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
useSensor(PenSensor,   { activationConstraint: { distance: 8 } })`,
    touchActionNone: false,
    useVariantSensors: () =>
      useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
        useSensor(TouchSensor, {
          activationConstraint: { delay: 250, tolerance: 5 },
        }),
        useSensor(PenSensor, { activationConstraint: { distance: 8 } }),
        keyboard(),
      ),
  },
];

export function findVariant(slug: string): Variant | null {
  return VARIANTS.find((v) => v.slug === slug) || null;
}
