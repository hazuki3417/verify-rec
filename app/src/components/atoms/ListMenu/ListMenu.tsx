import React, {
	forwardRef,
	useMemo,
	type ComponentPropsWithoutRef,
} from "react";
import styled from "styled-components";
import { resolveStyle, type StylableProp } from "../props";

type BaseProps = React.HTMLAttributes<HTMLUListElement>;

const Ul = styled.ul`
  background: #FDFDFD;
  border-radius: 4px;
  border: 1px solid #DDEAEEFF;
  box-shadow: 0px 4px 10px 0px #0000001A;
  list-style: none;
  margin: 0px;
  padding: 0px;
  width: 228px;
`;

const Li = styled.li`
  border-bottom: 1px solid #DDEAEEFF;
  color: #50737E;
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

interface StyleProps extends StylableProp {}

export interface ListMenuProps
	extends StyleProps,
		Omit<BaseProps, "style" | "children"> {
	items: ItemProp[];
}

export const ListMenu = forwardRef<HTMLUListElement, ListMenuProps>(
	(props, ref) => {
		const { style, items, ...rest } = props;

		const menu = useMemo(() => {
			return items
				.filter((item) => item.show)
				.map(({show, ...rest}, index) => <Li key={index} {...rest} />);
        // NOTE: liのpropsのみを抽出するため、showを記述しrestに含まれないようにする
		}, [items]);

		return (
			<Ul ref={ref} style={resolveStyle(style)} {...rest}>
				{menu}
			</Ul>
		);
	},
);
