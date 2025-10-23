import React, { forwardRef, useMemo, type CSSProperties } from "react";
import styled, { css } from "styled-components";
import {
  cssDisabled,
  resolveDisabled,
  styleResolver,
  transform,
  type DisabledProp,
  type DisabledStyleMap,
  type ResolverStyleMapArg,
  type Size,
  type StyledProps,
  type StyleMap,
} from "@/utils/props";
import { theme } from "@/theme";

/**
 * md: figmaのIconButton
 * sm: figmaのMiniButton
 * 違いはpaddingの大きさだけ
 */
export type IconButtonSize = Extract<Size, "md" | "sm">;

export type IconButtonSizeProp = { size?: IconButtonSize };

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

export const iconButtonDisabledStyleMap: DisabledStyleMap = {
  true: {
    backgroundColor: theme.color.base.pealGray,
    border: "1px solid transparent",
    cursor: "not-allowed",
  },
  false: {
    // とくに変化しないので指定なし
  },
};

export interface StyleProps extends IconButtonSizeProp, DisabledProp {}

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
  ${cssDisabled({ style: iconButtonDisabledStyleMap })}
`;

type BaseProps = React.ComponentPropsWithoutRef<"button">;

export interface IconButton extends StyleProps, Omit<BaseProps, "children"> {
  children: React.ReactNode | ((style: CSSProperties) => React.ReactNode);
}

export const IconButton = forwardRef<HTMLButtonElement, IconButton>(
  (props, ref) => {
    const { size, disabled, children, ...rest } = props;

    const styled = transform.props.toStyled({
      size,
      disabled,
    });

    const style: CSSProperties = useMemo(() => {
      /**
       * NOTE: props で指定されたスタイルからcss styleを算出・マージする。その後子要素に渡したいcss propertiyを算出
       *       variantやdisabledで指定されたstyleを子要素でも利用したいケースに対応するための実装
       */
      const style = {
        ...resolveDisabled({
          prop: transform.bool.toBooleanString(disabled ?? false),
          style: iconButtonDisabledStyleMap,
        }),
      };
      return {
        ...transform.object.pick(style, ["color"]),
      };
    }, [disabled]);

    return (
      <Base ref={ref} {...styled} disabled={disabled} {...rest}>
        {typeof children === "function" ? children(style) : children}
      </Base>
    );
  },
);
