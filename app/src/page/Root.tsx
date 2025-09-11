import { Text } from "@/components";
import { useHorizontalWheelScroll, useVerticalWheelScroll } from "@/hooks";
import { useRef } from "react";
import { useNavigate } from "react-router";

export default function Root() {
  const navigate = useNavigate();

  const query = new URLSearchParams({
    key: "aaaaa%0Abbbbb",
  });

  const parentRef = useRef(null);
  const childrenRef = useRef(null);
  const whellSchrollX = useHorizontalWheelScroll({ ref: childrenRef });
  const whellSchrollY = useVerticalWheelScroll({ ref: parentRef });

  return (
    <>
      <div
        ref={parentRef}
        onWheel={whellSchrollY.onWheel}
        style={{
          height: "100px",
          ...whellSchrollY.style,
        }}
      >
        <div
          ref={childrenRef}
          onWheel={whellSchrollX.onWheel}
          style={{
            width: "100px",
            ...whellSchrollX.style,
          }}
        >
          <div
            style={{
              backgroundColor: "GrayText",
              width: "500px",
            }}
          >
            aaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbbb cccccccccccccccccc
            dddddddddddddddddd eeeeeeeeeeeeeeeeee aaaaaaaaaaaaaaaaaa
            bbbbbbbbbbbbbbbbbb cccccccccccccccccc dddddddddddddddddd
            eeeeeeeeeeeeeeeeee aaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbbb
            cccccccccccccccccc dddddddddddddddddd eeeeeeeeeeeeeeeeee
            aaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbbb cccccccccccccccccc
            dddddddddddddddddd eeeeeeeeeeeeeeeeee aaaaaaaaaaaaaaaaaa
            bbbbbbbbbbbbbbbbbb cccccccccccccccccc dddddddddddddddddd
            eeeeeeeeeeeeeeeeee aaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbbb
            cccccccccccccccccc dddddddddddddddddd eeeeeeeeeeeeeeeeee
          </div>
        </div>
        <Text lineMode="single" overflowMode="normal">
          ながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツ
          <br />
        </Text>
      </div>
      <button
        onClick={() => {
          navigate(`?${query.toString()}`);
        }}
      >
        click
      </button>
    </>
  );
}
