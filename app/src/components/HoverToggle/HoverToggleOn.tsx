import { useHoverToggle } from "./HoverToggle.context";

export interface HoverToggleOnProps {
  children: React.ReactNode;
}

export const HoverToggleOn = (props: HoverToggleOnProps) => {
  const { children } = props;
  const { hover } = useHoverToggle();
  return hover ? <>{children}</> : null;
};
