import { useCallback, useState } from "react";
import { HoverToggleOn } from "./HoverToggleOn";
import { HoverToggleOff } from "./HoverToggleOff";
import { HoverToggleContext } from "./HoverToggle.context";

type BaseProps = React.HTMLAttributes<HTMLDivElement>;

export interface HoverToggleProps
  extends Omit<BaseProps, "onMouseEnter" | "onMouseLeave"> {
  children: React.ReactNode;
}

/**
 * @example
 * ```
 * <Hover>
 *  <Hover.Off>
 *    <div>Normal Content</div>
 *  </Hover.Off>
 *  <Hover.On>
 *    <div>Hovered Content</div>
 *  </Hover.On>
 * </Hover>
 * ```
 */
export const HoverToggle = (props: HoverToggleProps) => {
  const { children, ...rest } = props;
  const [hover, setHoverToggle] = useState(false);

  const onMouseEnter = useCallback(() => {
    setHoverToggle(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setHoverToggle(false);
  }, []);

  return (
    <HoverToggleContext.Provider value={{ hover }}>
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} {...rest}>
        {children}
      </div>
    </HoverToggleContext.Provider>
  );
};

HoverToggle.On = HoverToggleOn;
HoverToggle.Off = HoverToggleOff;
