import type React from "react";
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
} from "@/utils/props";
import { forwardRef } from "react";

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

interface StyleProps extends IconTextPositionProp, FontColorProp, FontSizeProp, FontWeightProp { }

/**
 * NOTE: 下記のpropertyはButtonコンポーネントと組み合わせたときにスタイルが適用されるように指定
 *       color, font-size, font-weight: inherit
 */
const Base = styled.div<StyledProps<StyleProps>>`
  align-items: center;
  display: inline-flex;
  gap: 4px; // default value 必要であればstyleで上書き
  justify-content: center;
  line-height: 1; // icon と text の位置調整
  ${({ $position }) =>
    css(
      resolveIconTextPosition({
        prop: $position,
        style: iconTextPositionStyleMap,
      }),
    )}
  ${cssFontColor({ defaultValue: "inherit" })}
  ${cssFontSize({ defaultValue: "inherit" })}
  ${cssFontWeight({ defaultValue: "inherit" })}
`;

type BaseProps = React.ComponentPropsWithoutRef<"div">;

export interface IconTextProps extends StyleProps, BaseProps {
  icon: React.ReactNode;
}

/**
 * IconTextとTextのprops（fontColor, fontSize, fontWeight）初期値は異なるので注意してください
 */
export const IconText = forwardRef<HTMLDivElement, IconTextProps>(
  (props, ref) => {
    const { icon, position, fontColor, fontSize, fontWeight, children, ...rest } = props;

    const styled = transform.props.toStyled({
      position,
      fontColor,
      fontSize,
      fontWeight,
    });

    const isHorizontalLine = position === "left" || position === "right";

    return (
      <Base ref={ref} {...styled} {...rest}>
        {isHorizontalLine ? (
          <HorizontalLineIconWrapper>{icon}</HorizontalLineIconWrapper>
        ) : (
          icon
        )}
        {children}
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
