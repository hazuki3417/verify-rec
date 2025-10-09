import React from "react";
import styled from "styled-components";

import { theme } from "@/theme";
import { List } from "../List";

export const ListMenuItem = styled(List.Item)`
  border-bottom: 1px solid ${theme.color.sub.slightlyLightGray};
  color: ${theme.color.base.riverBlue};
  cursor: pointer;
  line-height: 24px;
  padding: 12px 16px;
  &:last-child {
    border-bottom: 1px solid transparent;
  }
`;
