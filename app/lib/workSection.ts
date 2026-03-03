export type Offset = { x: number; y: number };

export function createOffsetMap(ids: string[]): Record<string, Offset> {
  return ids.reduce<Record<string, Offset>>((acc, id) => {
    acc[id] = { x: 0, y: 0 };
    return acc;
  }, {});
}

export function clampOffset(
  offset: Offset,
  bounds: { minX: number; maxX: number; minY: number; maxY: number },
): Offset {
  return {
    x: Math.min(Math.max(offset.x, bounds.minX), bounds.maxX),
    y: Math.min(Math.max(offset.y, bounds.minY), bounds.maxY),
  };
}

export function getKeyboardStep(isShiftPressed: boolean): number {
  return isShiftPressed ? 12 : 4;
}

export function isWorkCardControlKey(key: string): boolean {
  return (
    key === "ArrowLeft" ||
    key === "ArrowRight" ||
    key === "ArrowUp" ||
    key === "ArrowDown" ||
    key === "Escape"
  );
}
