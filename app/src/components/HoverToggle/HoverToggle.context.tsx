import { createContext, useContext } from "react";

/**
 * HoverToggleコンポーネントでのみ利用するコンテキスト
 */

export interface HoverToggleContextValue {
  hover: boolean;
}

export const HoverToggleContext = createContext<
  HoverToggleContextValue | undefined
>(undefined);

export const useHoverToggle = () => {
  const context = useContext(HoverToggleContext);
  if (context === undefined) {
    throw new Error("useHoverToggle must be used within a HoverToggle");
  }
  return context;
};
