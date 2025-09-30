import React, {
  forwardRef,
  useMemo,
  type ComponentPropsWithoutRef,
} from "react";
import styled from "styled-components";
import { GlobalMenuItem } from "./GlobalMenuItem";

type BaseProps = React.HTMLAttributes<HTMLUListElement>;

const Ul = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px;
`;

const Li = styled.li`
  display: inline-flex;
  cursor: pointer;
`;

type ItemProp = ComponentPropsWithoutRef<"li"> & {
  show: boolean;
};

interface StyleProps {}

export interface GlobalMenuProps
  extends StyleProps,
    Omit<BaseProps, "children"> {
  items: ItemProp[];
}

export const GlobalMenu = (props: GlobalMenuProps) => {
  const { items, ...rest } = props;

  const menu = useMemo(() => {
    return items
      .filter((item) => item.show)
      .map(({ show, ...rest }, index) => <Li key={index} {...rest} />);
    // NOTE: liのpropsのみを抽出するため、showを記述しrestに含まれないようにする
  }, [items]);

  return <Ul {...rest}>{menu}</Ul>;
};

GlobalMenu.Item = GlobalMenuItem;
