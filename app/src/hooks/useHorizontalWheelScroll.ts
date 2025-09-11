import { useCallback, type CSSProperties, type RefObject } from "react";

export interface UseHorizontalWheelScrollOption {
  ref: RefObject<HTMLElement | null>;
  speed?: number;
}

/**
 * マウスホイール操作による横スクロールを提供するカスタムフック
 *
 * @example
 * ```
 * const xRef = useRef(null)
 * const xHandler = useVerticalWheelScroll({ref: xRef})
 *
 * return (<div {...xHandler}>scroll content</div>)
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
export const useHorizontalWheelScroll = (
  option: UseHorizontalWheelScrollOption,
) => {
  const { ref, speed = 0.5 } = option;

  const style: CSSProperties = {
    overflowX: "scroll",
    overflowY: "hidden",
  };

  const onWheel = useCallback(
    (event: React.WheelEvent) => {
      if (!ref.current) {
        return;
      }
      const target = event.target as HTMLElement;

      const isScrollableY =
        target.scrollHeight > target.clientHeight &&
        ((target.scrollTop > 0 && event.deltaY < 0) ||
          (target.scrollTop + target.clientHeight < target.scrollHeight &&
            event.deltaY > 0));

      if (isScrollableY) {
        // 子要素がスクロールできる場合は通常の挙動に任せる
        return;
      }

      event.preventDefault();
      ref.current.scrollLeft += event.deltaY * speed;
    },
    [speed],
  );

  return {
    onWheel,
    ref,
    style,
  };
};
