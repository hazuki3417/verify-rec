import { useHoverToggle } from "./HoverToggle.context";

export interface HoverToggleOffProps {
  children: React.ReactNode;
}

export const HoverToggleOff = (props: HoverToggleOffProps) => {
  const { children } = props;
  const { hover } = useHoverToggle();
  return !hover ? <>{children}</> : null;
};
