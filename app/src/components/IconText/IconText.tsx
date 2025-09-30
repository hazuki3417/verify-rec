import type React from "react";
import styled, { css } from "styled-components";
import {
  styleResolver,
  transform,
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

interface StyleProps extends IconTextPositionProp {}

/**
 * NOTE: 下記のPropertyはButtonコンポーネントと組み合わせたときにスタイルが適用されるように指定
 *       color, font-size, font-weight: inherit
 */
const Base = styled.div<StyledProps<StyleProps>>`
  align-items: center;
  color: inherit;
  display: inline-flex;
  font-size: inherit;
  font-weight: inherit;
  gap: 4px;
  justify-content: center;
  line-height: 1; // icon と text の位置調整
  ${({ $position }) =>
    css(
      resolveIconTextPosition({
        prop: $position,
        style: iconTextPositionStyleMap,
      }),
    )}
`;

type BaseProps = React.ComponentPropsWithoutRef<"div">;

export interface IconTextProps extends StyleProps, BaseProps {
  icon: React.ReactNode;
}

export const IconText = forwardRef<HTMLDivElement, IconTextProps>(
  (props, ref) => {
    const { icon, position, style, children, ...rest } = props;

    const styled = transform.props.toStyled({
      position,
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
