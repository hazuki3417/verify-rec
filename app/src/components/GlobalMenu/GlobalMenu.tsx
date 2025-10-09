import React from "react";
import styled from "styled-components";
import { GlobalMenuItem } from "./GlobalMenuItem";
import { List, type ListProps } from "../List";

const Base = styled(List)`
  display: inline-flex;
  list-style: none;
  margin: 0px;
  padding: 0px;
`;

export interface GlobalMenuProps extends Omit<ListProps, "direction"> {}

export const GlobalMenu = (props: GlobalMenuProps) => {
  const { ...rest } = props;
  return <Base direction="horizontal" {...rest} />;
};

GlobalMenu.Item = GlobalMenuItem;
