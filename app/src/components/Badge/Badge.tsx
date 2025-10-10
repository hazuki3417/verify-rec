import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import {
  styleResolver,
  transform,
  type ResolverStyleMapArg,
  type StyledProps,
  type StyleMap,
} from "@/utils/props";
import { theme } from "@/theme";

export type BadgeVariant = "filled" | "outlined" | "transparent" | "white";
export type BadgeColor = "red" | "blue" | "green" | "yellow";

type BadgeVariantProp = { variant?: BadgeVariant };
type BadgeColorProp = { color?: BadgeColor };

type BadgeVariantStyleMap = StyleMap<BadgeVariant>;
type BadgeColorStyleMap = StyleMap<BadgeColor>;

export const badgeVariantStyleMap: BadgeVariantStyleMap = {
  filled: {
    backgroundColor: "currentColor",
    border: "1px solid currentColor",
    color: theme.color.base.white,
  },
  outlined: {
    backgroundColor: "transparent",
    border: "1px solid currentColor",
    color: "currentColor",
  },
  transparent: {
    backgroundColor: "transparent",
    border: "none",
    color: "currentColor",
  },
  white: {
    backgroundColor: theme.color.base.white,
    border: "none",
    color: "currentColor",
  },
};

export const badgeColorStyleMap: BadgeColorStyleMap = {
  red: {
    color: theme.color.status.slightlyLightRed,
  },
  blue: {
    color: theme.color.status.slightlyLightBlue,
  },
  green: {
    color: theme.color.status.lightGreen,
  },
  yellow: {
    color: theme.color.status.lightYellow,
  },
};

export const resolveBadgeVariant = (arg: ResolverStyleMapArg<BadgeVariant>) => {
  const { prop, style } = arg;
  return styleResolver(prop, style, "filled");
};

export const resolveBadgeColor = (arg: ResolverStyleMapArg<BadgeColor>) => {
  const { prop, style } = arg;
  return styleResolver(prop, style, "blue");
};

interface StyleProps extends BadgeVariantProp, BadgeColorProp {}

const Base = styled.span<StyledProps<StyleProps>>`
  align-items: center;
  border-radius: 16px;
  display: inline-flex;
  font-size: ${theme.font.size[14]};
  font-weight: ${theme.font.weight.medium};
  height: 32px;
  justify-content: center;
  line-height: ${theme.font.lineHeight[160]};
  padding: 0 8px;
  width: 200px;
  ${({ $variant }) =>
    css(
      resolveBadgeVariant({
        prop: $variant,
        style: badgeVariantStyleMap,
      }),
    )}
  ${({ $color }) =>
    css(
      resolveBadgeColor({
        prop: $color,
        style: badgeColorStyleMap,
      }),
    )}
`;

type BaseProps = Omit<React.ComponentPropsWithoutRef<"span">, "color">;

export interface BadgeProps extends StyleProps, BaseProps {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const { variant, color, ...rest } = props;

  const styled = transform.props.toStyled({
    variant,
    color,
  });

  return <Base ref={ref} {...styled} {...rest} />;
});
