import React from "react";
import styled from "styled-components";

import { theme } from "@/theme";
import { List, type ListProps } from "../List";
import { ListMenuItem } from "./ListMenuItem";

const Base = styled(List)`
  background: ${theme.color.base.white};
  border-radius: 8px;
  border: 1px solid ${theme.color.sub.slightlyLightGray};
  box-shadow: 0px 4px 10px 0px #0000001A;
  width: 228px;
`;

export interface ListMenuProps extends Omit<ListProps, "direction"> {}

export const ListMenu = (props: ListMenuProps) => {
  const { ...rest } = props;
  return <Base direction="vertical" {...rest} />;
};

ListMenu.Item = ListMenuItem;
