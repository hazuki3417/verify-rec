import { useCallback, useState } from "react";

export type UseDisclosureState = "opened" | "closed";

export type UseDisclosureOption = {
  initial?: UseDisclosureState
}

export interface UseDisclosureControls {
  open: () => void;
  close: () => void;
  toggle: () => void;
  reset: () => void;
}

export interface UseDisclosure {
  state: UseDisclosureState;
  controls: UseDisclosureControls;
}

/**
 * 開閉可能なUIコンポーネントの状態と操作を管理するカスタムフック
 *
 * @example
 * ```tsx
 * const disclosure = useDisclosure({ initial: "opened" });
 * disclosure.state; // "opened" | "closed"
 * disclosure.controls.open();
 * ```
 *
 * @param option 初期状態を指定するオプション（デフォルト: "closed"）
 * @returns 開閉状態と操作関数群
 */

export const useDisclosure = (option?: UseDisclosureOption): UseDisclosure => {
  const { initial = "closed" } = option || {};
  const [state, setState] = useState<UseDisclosureState>(initial);

  const open = useCallback(() => setState("opened"), []);
  const close = useCallback(() => setState("closed"), []);
  const toggle = useCallback(
    () => setState((prev) => (prev === "opened" ? "closed" : "opened")),
    [],
  );
  const reset = useCallback(() => setState(initial), [initial]);

  return {
    state,
    controls: {
      open,
      close,
      toggle,
      reset,
    },
  };
};
