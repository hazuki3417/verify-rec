import React from "react";
import styled, { css } from "styled-components";
import {
  cssFontColor,
  cssFontSize,
  cssFontWeight,
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
import { forwardRef } from "react";
import { Text } from "../Text";

export type IconTextPosition = "top" | "bottom" | "left" | "right";

export type IconTextPositionProp = { position?: IconTextPosition };

export type IconTextPositionStyleMap = StyleMap<IconTextPosition>;

export const iconTextPositionStyleMap: IconTextPositionStyleMap = {
  top: {
    flexDirection: "column",
  },
  bottom: {
    flexDirection: "column-reverse",
  },
  left: {
    flexDirection: "row",
  },
  right: {
    flexDirection: "row-reverse",
  },
};

const resolveIconTextPosition = (
  arg: ResolverStyleMapArg<IconTextPosition>,
) => {
  const { prop, style } = arg;
  return styleResolver(prop, style, "left");
};

interface StyleProps extends IconTextPositionProp {}

/**
 * NOTE: 下記のpropertyはButtonコンポーネントと組み合わせたときにスタイルが適用されるように指定
 *       color, font-size, font-weight: inherit
 */
const Base = styled.div<StyledProps<StyleProps>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
      position,
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

    const isHorizontalLine = position === "left" || position === "right";

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
