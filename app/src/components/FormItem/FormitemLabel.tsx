import { theme } from "@/theme";
import {
  cssFontColor,
  cssFontLineHeight,
  cssFontSize,
  cssFontWeight,
  cssTextLineMode,
  cssTextOverflowMode,
  transform,
  type FontStyleProps,
  type StyledProps,
  type TextStyleProps,
} from "@/utils/props";
import React, { forwardRef } from "react";
import styled from "styled-components";

type BaseProps = React.ComponentPropsWithoutRef<"label">;

interface StyleProps extends FontStyleProps, TextStyleProps {}

const Base = styled.label<StyledProps<StyleProps>>`
  font-family: ${theme.font.family.base};
  margin: 0px;
  padding: 0px;
  ${cssFontColor({ defaultValue: "riverBlue" })}
  ${cssFontSize({ defaultValue: "14" })}
  ${cssFontLineHeight({ defaultValue: "160" })}
  ${cssFontWeight({ defaultValue: "bold" })}
  ${cssTextLineMode({ defaultValue: "multi" })}
  ${cssTextOverflowMode({ defaultValue: "normal" })}
`;

export interface FormItemLabelProps extends StyleProps, BaseProps {}

export const FormItemLabel = forwardRef<HTMLLabelElement, FormItemLabelProps>(
  (props, ref) => {
    const {
      fontColor,
      fontSize,
      fontLineHeight,
      fontWeight,
      lineMode,
      overflowMode,
      ...rest
    } = props;

    // key: value -> $key: value に変換($をkey名の先頭に付与)
    const styled = transform.props.toStyled({
      fontColor,
      fontSize,
      fontLineHeight,
      fontWeight,
      lineMode,
      overflowMode,
    });

    return <Base ref={ref} {...styled} {...rest} />;
  },
);
