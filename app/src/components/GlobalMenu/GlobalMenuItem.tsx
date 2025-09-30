import React, { forwardRef } from "react";
import styled from "styled-components";
import {
  type ActiveProp,
  type ActiveStyleMap,
  cssActive,
  type StyledProps,
  transform,
  type Active,
} from "@/utils/props";
import { theme } from "@/theme";

export type GlobalMenuItemActive = Active;

export type GlobalMenuItemActiveProp = ActiveProp;

export type GlobalMenuItemActiveStyleMap = ActiveStyleMap;

export const navigationMenuActiveStyleMap: GlobalMenuItemActiveStyleMap = {
  true: {
    color: theme.color.main.emerald,
    borderBottom: `3px solid ${theme.color.main.emerald}`,
  },
  false: {
    color: theme.color.base.riverBlue,
    borderBottom: `3px solid transparent`,
  },
};

interface StyleProps extends GlobalMenuItemActiveProp {}

const Base = styled.span<StyledProps<StyleProps>>`
  cursor: pointer;
  padding: 16px 16px 13px 16px;
  border-bottom: 3px solid transparent;
  ${cssActive({ style: navigationMenuActiveStyleMap })}
`;

type BaseProps = React.ComponentPropsWithoutRef<"span">;

export interface GlobalMenuItemProps extends StyleProps, BaseProps {}

export const GlobalMenuItem = forwardRef<HTMLSpanElement, GlobalMenuItemProps>(
  (props, ref) => {
    const { active, ...rest } = props;

    const styled = transform.props.toStyled({
      active,
    });

    return <Base ref={ref} {...styled} {...rest} />;
  },
);
