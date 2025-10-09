import React, { forwardRef } from "react";
import styled from "styled-components";
import {
  cssActive,
  transform,
  type Active,
  type ActiveProp,
  type ActiveStyleMap,
  type StyledProps,
} from "@/utils/props";
import { theme } from "@/theme";
import { List } from "../List";
import type { ListItemProps } from "../List/ListItem";

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

const Base = styled(List.Item)<StyledProps<StyleProps>>`
  cursor: pointer;
  padding: 16px 16px 13px 16px;
  border-bottom: 3px solid transparent;
  ${cssActive({ style: navigationMenuActiveStyleMap })}
  &:hover{
    color: ${theme.color.main.emerald};
    border-bottom: 3px solid ${theme.color.main.emerald};
  },
  &:hover svg{
    fill: ${theme.color.main.emerald};
  }
`;

export interface GlobalMenuItemProps extends StyleProps, ListItemProps {}

export const GlobalMenuItem = (props: GlobalMenuItemProps) => {
  const { active, ...rest } = props;

  const styled = transform.props.toStyled({
    active,
  });

  return <Base {...styled} {...rest} />;
};
