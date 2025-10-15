import React, { forwardRef } from "react";
import styled from "styled-components";
import {
  type SizeProp,
  type SizeStyleMap,
  cssSize,
  type StyledProps,
  transform,
  type Size,
} from "@/utils/props";

export type CheckboxSize = Size;

export type CheckboxSizeProp = SizeProp;

export type CheckboxSizeStyleMap = SizeStyleMap;

export const checkboxSizeStyleMap: CheckboxSizeStyleMap = {
  xs: {
    // figmaに定義なし
  },
  sm: {
    height: "18px",
    width: "18px",
    borderRadius: "2px",
  },
  md: {
    height: "24px",
    width: "24px",
    borderRadius: "4px",
  },
  lg: {
    height: "44px",
    width: "44px",
    borderRadius: "8px",
  },
};

interface StyleProps extends CheckboxSizeProp {}

const Base = styled.input<StyledProps<StyleProps>>`
  cursor: pointer;
  padding: 0px 8px;
  text-align: center;
  ${cssSize({ style: checkboxSizeStyleMap })}
`;

type BaseProps = React.ComponentPropsWithoutRef<"input">;

export interface CheckboxProps
  extends StyleProps,
    Omit<BaseProps, "size" | "type"> {}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const { size, ...rest } = props;

    const styled = transform.props.toStyled({
      size,
    });

    return <Base type="checkbox" ref={ref} {...styled} {...rest} />;
  },
);
