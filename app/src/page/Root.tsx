import { Text } from "@/components";
import { useHorizontalWheelScroll } from "@/hooks";
import { useNavigate } from "react-router";

export default function Root() {
  const navigate = useNavigate();

  const query = new URLSearchParams({
    key: "aaaaa%0Abbbbb",
  });

  const horizontalWheelScrollHandler = useHorizontalWheelScroll();

  return (
    <>
      <div
        style={{
          height: "100px",
          width: "400px",
          overflow: "scroll",
        }}
        onWheel={horizontalWheelScrollHandler}
      >
        <Text lineMode="single" overflowMode="normal">
          ながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツながいコンテンツ
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
