import { vi } from "vitest";

vi.stubGlobal("__NUXT_COLOR_MODE__", {
  preference: "system",
  value: "light",
  getColorScheme: () => "light",
  addColorScheme: vi.fn(),
  removeColorScheme: vi.fn(),
});
