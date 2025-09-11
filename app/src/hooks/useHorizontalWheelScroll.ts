import { useCallback } from "react";

/**
 * マウスホイール操作による横スクロールを提供するカスタムフック
 * @example
 * ```
 * const horizontalWheelScrollHandler = useHorizontalWheelScroll()
 *
 * return (<div onWheel={horizontalWheelScrollHandler}>content</div>)
 * ```
 */
export const useHorizontalWheelScroll = (speed: number = 0.5) => {
  const onWheel = useCallback(
    (event: React.WheelEvent) => {
      event.preventDefault();
      const target = event.currentTarget;
      target.scrollLeft += event.deltaY * speed;
    },
    [speed],
  );

  return onWheel;
};
