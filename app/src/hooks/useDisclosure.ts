import { useCallback, useState } from "react";

export type UseDisclosureState = "opend" | "closed";

export type UseDisclosureOption = UseDisclosureState;

export interface UseDisclosureHandler {
  open: () => void;
  close: () => void;
  toggle: () => void;
  reset: () => void;
}

export interface UseDisclosure {
  state: UseDisclosureState;
  handler: UseDisclosureHandler;
}

/**
 * コンポーネントの開閉を制御するカスタムフック
 * @param option
 * @returns
 */
export const useDisclosure = (option: UseDisclosureOption): UseDisclosure => {
  const [state, setState] = useState<UseDisclosureState>(option);

  const open = useCallback(() => setState("opend"), []);
  const close = useCallback(() => setState("closed"), []);
  const toggle = useCallback(
    () => setState((prev) => (prev === "opend" ? "closed" : "opend")),
    [],
  );
  const reset = useCallback(() => setState(option), [option]);

  return {
    state,
    handler: {
      open,
      close,
      toggle,
      reset,
    },
  };
};
