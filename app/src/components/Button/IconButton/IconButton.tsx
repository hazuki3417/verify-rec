import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import {
  resolveStyle,
  type StylableProp,
  type Size,
  type StyleMap,
  type ResolverStyleMapArg,
  styleResolver,
  type StyledProps,
  transform,
} from "../../props";
import { theme } from "@/theme";
import {
  cssActive,
  type ActiveProp,
  type ActiveStyleMap,
} from "../../props/active";
import { cssDisabled, type DisabledProp } from "../../props/disabled";

/**
 * md: figmaのIconButton
 * sm: figmaのMiniButton
 * 違いはpaddingの大きさだけ
 */
export type IconButtonSize = Extract<Size, "md" | "sm">;

export type IconButtonSizeProp = { size?: IconButtonSize };

export interface IconButtonStyleProps extends IconButtonSizeProp {}

export type IconButtonSizeStyleMap = StyleMap<IconButtonSize>;

export const iconButtonSizeStyleMap: IconButtonSizeStyleMap = {
  sm: {
    padding: "4px",
  },
  md: {
    padding: "8px",
  },
};

export const resolveIconButtonSize = (
  arg: ResolverStyleMapArg<IconButtonSize>,
) => {
  const { prop, style } = arg;
  return styleResolver(prop, style, "md");
};

export const iconButtonActiveStyleMap: ActiveStyleMap = {
  true: {
    border: `1px solid ${theme.color.base.riverBlue}`,
  },
  false: {
    // とくに変化しないので指定なし
  },
};

export const iconButtonDisabledStyleMap: ActiveStyleMap = {
  true: {
    backgroundColor: theme.color.base.pealGray,
    border: "1px solid transparent",
    cursor: "not-allowed",
  },
  false: {
    // とくに変化しないので指定なし
  },
};

export type BaseProps = React.ComponentPropsWithoutRef<"button">;

export interface StyleProps
  extends StylableProp,
    IconButtonStyleProps,
    ActiveProp,
    DisabledProp {}

const Base = styled.button<StyledProps<StyleProps>>`
	background-color: ${theme.color.base.white};
	border: 1px solid ${theme.color.sub.lightGray};
	min-width: ${theme.icon.size[12]}px;
	min-height: ${theme.icon.size[12]}px;
	border-radius: 8px;
	box-shadow: #263a4033 0px 2px 4px 0px;
	cursor: pointer;
	margin: 0px;
	padding: 8px;
  align-items: center;
  display: inline-flex;
  justify-content: center;
	${({ $size }) =>
    css(
      resolveIconButtonSize({
        prop: $size,
        style: iconButtonSizeStyleMap,
      }),
    )}
	${cssActive({ style: iconButtonActiveStyleMap })}
	${cssDisabled({ style: iconButtonDisabledStyleMap })}
`;

export interface IconButton extends StyleProps, Omit<BaseProps, "style"> {}

export const IconButton = forwardRef<HTMLButtonElement, IconButton>(
  (props, ref) => {
    const { style, size, active, disabled, ...rest } = props;

    const styled = transform.props.toStyled({
      size,
      active,
      disabled,
    });

    return (
      <Base
        ref={ref}
        style={resolveStyle(style)}
        {...styled}
        disabled={disabled}
        {...rest}
      />
    );
  },
);
