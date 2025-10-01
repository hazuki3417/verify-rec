import React, {
  forwardRef,
  useMemo,
  type ComponentPropsWithoutRef,
} from "react";
import styled from "styled-components";

import { theme } from "@/theme";

type BaseProps = React.HTMLAttributes<HTMLUListElement>;

const Ul = styled.ul`
  background: ${theme.color.base.white};
  border-radius: 8px;
  border: 1px solid ${theme.color.sub.slightlyLightGray};
  box-shadow: 0px 4px 10px 0px #0000001A;
  list-style: none;
  margin: 0px;
  padding: 0px;
  width: 228px;
`;

const Li = styled.li`
  border-bottom: 1px solid ${theme.color.sub.slightlyLightGray};
  color: ${theme.color.base.riverBlue};
  cursor: pointer;
  line-height: 24px;
  padding: 12px 16px;
  &:last-child {
    border-bottom: 1px solid transparent;
  }
`;

type ItemProp = ComponentPropsWithoutRef<"li"> & {
  show: boolean;
};

interface StyleProps { }

export interface ListMenuProps
  extends StyleProps,
  Omit<BaseProps, "style" | "children"> {
  items: ItemProp[];
}

export const ListMenu = forwardRef<HTMLUListElement, ListMenuProps>(
  (props, ref) => {
    const { items, ...rest } = props;

    const menu = useMemo(() => {
      return items
        .filter((item) => item.show)
        .map(({ show, ...rest }, index) => <Li key={index} {...rest} />);
      // NOTE: liのpropsのみを抽出するため、showを記述しrestに含まれないようにする
    }, [items]);

    return (
      <Ul ref={ref} {...rest}>
        {menu}
      </Ul>
    );
  },
);
