import { useCallback, type CSSProperties, type RefObject } from "react";

export interface UseVerticalWheelScrollOption {
  ref: RefObject<HTMLElement | null>;
  speed?: number;
}

/**
 * マウスホイール操作による縦スクロールを提供するカスタムフック
 *
 * @example
 * ```
 * const yRef = useRef(null)
 * const yHandler = useVerticalWheelScroll({ref: yRef})
 *
 * return (<div {...yHandler}>scroll content</div>)
 * ```
 *
 * 要素内で縦・横混在のscrollを提供したい場合
 * @example
 * ```
 * const yRef = useRef(null)
 * const xRef = useRef(null)
 * const yHandler = useVerticalWheelScroll({ref: yRef})
 * const xHandler = useVerticalWheelScroll({ref: xRef})
 *
 * return (
 *   <div {...yHandler}>
 *     <div>title</div>
 *     <div {...xHandler}>x scroll content</div>
 *   </div>
 * )
 *
 * return (<div {...xHandler}>scroll content</div>)
 * ```
 */
export const useVerticalWheelScroll = (
  option: UseVerticalWheelScrollOption,
) => {
  const { ref, speed = 0.5 } = option;

  const style: CSSProperties = {
    overflowX: "hidden",
    overflowY: "scroll",
  };

  const onWheel = useCallback(
    (event: React.WheelEvent) => {
      if (!ref.current) {
        return;
      }
      const target = event.target as HTMLElement;

      const isScrollableX =
        target.scrollWidth > target.clientWidth &&
        ((event.deltaX < 0 && target.scrollLeft > 0) ||
          (event.deltaX > 0 &&
            target.scrollLeft + target.clientWidth < target.scrollWidth));

      if (isScrollableX) {
        // 子要素がスクロールできる場合は通常の挙動に任せる
        return;
      }

      event.preventDefault();
      ref.current.scrollTop += event.deltaY * speed;
    },
    [ref, speed],
  );

  return {
    onWheel,
    ref,
    style,
  };
};
