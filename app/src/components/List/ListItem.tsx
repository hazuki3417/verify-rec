import type { StyledProps } from "@/utils/props";
import React from "react";
import styled from "styled-components";

export interface ListItemStyleProps {}

const Base = styled.li<StyledProps<ListItemStyleProps>>`
  list-style: none;
`;

type BaseProps = React.ComponentPropsWithoutRef<"li">;

export interface ListItemProps extends ListItemStyleProps, BaseProps {
  show?: boolean;
}

export const ListItem = (props: ListItemProps) => {
  const { show = true, ...rest } = props;

  return show ? <Base {...rest} /> : null;
};
