import {
  styleResolver,
  transform,
  type ResolverStyleMapArg,
  type StyledProps,
  type StyleMap,
} from "@/utils/props";
import React from "react";
import styled, { css } from "styled-components";
import { ListItem } from "./ListItem";

type ListDirection = "vertical" | "horizontal";

type ListDirectionProp = { direction?: ListDirection };

type ListDirectionStyleMap = StyleMap<ListDirection>;

const resolveListDirection = (arg: ResolverStyleMapArg<ListDirection>) => {
  const { prop, style } = arg;
  return styleResolver(prop, style, "vertical");
};

const listDirectionStyleMap: ListDirectionStyleMap = {
  vertical: { flexDirection: "column" },
  horizontal: { flexDirection: "row" },
};

export interface ListStyleProps extends ListDirectionProp {}

const Base = styled.ul<StyledProps<ListStyleProps>>`
  list-style: none;
  margin: 0px;
  padding: 0px;
  display: flex;
  ${({ $direction }) =>
    css(
      resolveListDirection({
        prop: $direction,
        style: listDirectionStyleMap,
      }),
    )}
`;

type BaseProps = React.ComponentPropsWithoutRef<"ul">;

export interface ListProps extends ListStyleProps, BaseProps {}

export const List = (props: ListProps) => {
  const { direction, ...rest } = props;

  const styled = transform.props.toStyled({
    direction,
  });

  return <Base {...styled} {...rest} />;
};

List.Item = ListItem;
