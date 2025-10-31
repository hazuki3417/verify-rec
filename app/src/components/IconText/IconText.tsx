import React, { useMemo, forwardRef } from "react";
import styled, { css } from "styled-components";
import {
  styleResolver,
  transform,
  type FontColorProp,
  type FontSizeProp,
  type FontWeightProp,
  type ResolverStyleMapArg,
  type StyledProps,
  type StyleMap,
  type TextStyleProps,
} from "@/utils/props";
import { Text } from "@/components/Text";

export type IconTextPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "left-top"
  | "left-center"
  | "left-bottom"
  | "right-top"
  | "right-center"
  | "right-bottom"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type IconTextPositionProp = { position?: IconTextPosition };

export type IconTextPositionStyleMap = StyleMap<IconTextPosition>;

export const iconTextPositionStyleMap: IconTextPositionStyleMap = {
  "top-left": {
    flexDirection: "column",
    alignItems: "start",
  },
  "top-center": {
    flexDirection: "column",
    alignItems: "center",
  },
  "top-right": {
    flexDirection: "column",
    alignItems: "end",
  },
  "left-top": {
    flexDirection: "row",
    alignItems: "start",
  },
  "left-center": {
    flexDirection: "row",
    alignItems: "center",
  },
  "left-bottom": {
    flexDirection: "row",
    alignItems: "end",
  },
  "right-top": {
    flexDirection: "row-reverse",
    alignItems: "start",
  },
  "right-center": {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  "right-bottom": {
    flexDirection: "row-reverse",
    alignItems: "end",
  },
  "bottom-left": {
    flexDirection: "column-reverse",
    alignItems: "start",
  },
  "bottom-center": {
    flexDirection: "column-reverse",
    alignItems: "center",
  },
  "bottom-right": {
    flexDirection: "column-reverse",
    alignItems: "end",
  },
};

const resolveIconTextPosition = (
  arg: ResolverStyleMapArg<IconTextPosition>,
) => {
  const { prop, style } = arg;
  return styleResolver(prop, style, "left-center");
};

interface StyleProps extends IconTextPositionProp { }

/**
 * NOTE: 下記のpropertyはButtonコンポーネントと組み合わせたときにスタイルが適用されるように指定
 *       color, font-size, font-weight: inherit
 */
const Base = styled.div<StyledProps<StyleProps>>`
  display: inline-flex;
  line-height: 1; // icon と text の位置調整
  gap: 4px; // default value 必要であればstyleで上書き
  ${({ $position }) =>
    css(
      resolveIconTextPosition({
        prop: $position,
        style: iconTextPositionStyleMap,
      }),
    )}
`;

type BaseProps = React.ComponentPropsWithoutRef<"div">;

export interface IconTextProps
  extends StyleProps,
  BaseProps,
  FontColorProp,
  FontSizeProp,
  FontWeightProp,
  TextStyleProps {
  icon: React.ReactNode;
}

/**
 * IconTextとTextのprops（fontColor, fontSize, fontWeight）初期値は異なるので注意してください
 */
export const IconText = forwardRef<HTMLDivElement, IconTextProps>(
  (props, ref) => {
    const {
      icon,
      position = "left-center",
      fontColor = "inherit",
      fontSize = "inherit",
      fontWeight = "inherit",
      lineMode,
      overflowMode,
      children,
      ...rest
    } = props;

    const styled = transform.props.toStyled({
      position,
    });

    const isHorizontalLine: boolean = useMemo(() => {
      const horizontalType: IconTextPosition[] = [
        "left-top",
        "left-center",
        "left-bottom",
        "right-top",
        "right-center",
        "right-bottom",
      ];
      return horizontalType.includes(position);
    }, [position]);

    const textStyled = {
      fontColor,
      fontSize,
      fontWeight,
      lineMode,
      overflowMode,
    };

    return (
      <Base ref={ref} {...styled} {...rest}>
        {isHorizontalLine ? (
          <HorizontalLineIconWrapper>{icon}</HorizontalLineIconWrapper>
        ) : (
          <VerticalLineIconWrapper>{icon}</VerticalLineIconWrapper>
        )}
        <Text {...textStyled}>{children}</Text>
      </Base>
    );
  },
);

IconText.displayName = "IconText";

/**
 * icon の位置調整を提供するコンポーネント（横並び）
 */
const HorizontalLineIconWrapper = styled.span`
  position: relative;
  top: 0.05em;
`;

/**
 * icon の位置調整を提供するコンポーネント（縦並び）
 */
const VerticalLineIconWrapper = styled.span`
  position: relative;
`;
