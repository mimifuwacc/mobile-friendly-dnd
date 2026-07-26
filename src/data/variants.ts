import {
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export type Variant = {
  slug: string;
  step: number;
  title: string;
  summary: string;
  result: string;
  /** 実際に使っている sensor 設定 (表示用) */
  code: string;
  /** 項目に touch-action: none を当てるか */
  touchActionNone: boolean;
  useVariantSensors: () => ReturnType<typeof useSensors>;
};

const keyboard = () => useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates });

export const VARIANTS: Variant[] = [
  {
    slug: "mouse-sensor",
    step: 1,
    title: "MouseSensor",
    summary: "マウス操作だけで並び替える．",
    result:
      "PC のマウス操作では並び替えられます．指ではページがスクロールし，ドラッグは始まりません．",
    code: `useSensor(MouseSensor, {
  activationConstraint: { distance: 8 },
})`,
    touchActionNone: false,
    useVariantSensors: () =>
      useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 8 } }), keyboard()),
  },
  {
    slug: "with-touch-action-none",
    step: 2,
    title: "PointerSensor + touch-action: none",
    summary: "マウスとタッチを PointerSensor で拾い，ブラウザ標準のジェスチャーを無効にする．",
    result: "指でも並び替えられますが，項目の上ではページをスクロールできません．",
    code: `useSensor(PointerSensor, {
  activationConstraint: { distance: 8 },
})

.draggable-item {
  touch-action: none;
}`,
    touchActionNone: true,
    useVariantSensors: () =>
      useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), keyboard()),
  },
  {
    slug: "with-touch-sensor",
    step: 3,
    title: "MouseSensor + TouchSensor",
    summary: "マウスとタッチを別々に扱う．",
    result: "スクロールとドラッグの両方が拾われてしまい，快適には動きません．",
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
    step: 4,
    title: "TouchSensor に遅延を入れる",
    summary: "タッチだけ 250ms の長押しで発火させる．",
    result: "スクロールとドラッグを区別でき，快適に動きます．",
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
];

export function findVariant(slug: string): Variant | null {
  return VARIANTS.find((v) => v.slug === slug) || null;
}

export function findVariantByStep(step: number): Variant | null {
  return VARIANTS.find((variant) => variant.step === step) || null;
}
