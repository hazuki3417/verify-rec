import { theme } from "@/theme";
import {
  styleResolver,
  transform,
  type DisabledProp,
  type DisabledStyleMap,
  type StyledProps,
} from "@/utils/props";
import type { CheckedProp, CheckedStyleMap } from "@/utils/props/checked";
import type React from "react";
import styled, { css } from "styled-components";

export const inputIconCheckedStyleMap: CheckedStyleMap = {
  true: {
    // TODO: スタイルの調整が必要
    stroke: theme.color.base.pealGray,
    // fill: theme.color.base.pealGray,
  },
  false: {
    // とくに変化しないので指定なし
  },
};

export const inputIconDisabledStyleMap: DisabledStyleMap = {
  true: {
    opacity: 0.5,
  },
  false: {
    // とくに変化しないので指定なし
  },
};

export interface StyleProps extends CheckedProp, DisabledProp {}

const Base = styled.svg<StyledProps<StyleProps>>`
  stroke: ${theme.color.sub.darkGray};
  fill: none;
  ${({ $checked }) =>
    css(
      styleResolver(
        typeof $checked === "boolean"
          ? transform.bool.toBooleanString($checked)
          : undefined,
        inputIconCheckedStyleMap,
        "false",
      ),
    )}
  ${({ $disabled }) =>
    css(
      styleResolver(
        typeof $disabled === "boolean"
          ? transform.bool.toBooleanString($disabled)
          : undefined,
        inputIconCheckedStyleMap,
        "false",
      ),
    )}
`;

type BaseProps = React.ComponentPropsWithoutRef<"svg">;

export interface InputIconProps extends StyleProps, BaseProps {}

export const InputIcon = (props: InputIconProps) => {
  const { checked, disabled, ...rest } = props;

  const styled = transform.props.toStyled({
    checked,
    disabled,
  });

  return <Base {...styled} {...rest} />;
};
