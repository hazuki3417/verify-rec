import React, { forwardRef } from "react";
import styled from "styled-components";

import { transform } from "@/utils/props";
import { theme } from "@/theme";
import { SuggestItem } from "./SuggestItem";

type BaseProps = React.HTMLAttributes<HTMLUListElement>;

const Base = styled.ul`
  max-height: 168px;
  background-color: ${theme.color.base.white};
  border-radius: 4px; // NOTE: default値。配置箇所を元に上書き（例：下配置なら 0 0 4px 4px にするなど）
  border: 1px solid ${theme.color.sub.gray};
  list-style: none;
  margin: 0;
  overflow-y: scroll;
  scrollbar-width: none;
  padding: 0;
`;

interface StyleProps {}

export interface SuggestProps extends StyleProps, BaseProps {
  children?: React.ReactNode;
}

type SuggestComponent = React.ForwardRefExoticComponent<
  SuggestProps & React.RefAttributes<HTMLUListElement>
> & {
  Item: typeof SuggestItem;
};

/**
 * 入力項目のサジェストを提供するコンポーネントです。
 * @example
 * <Suggest>
 *   <Suggest.Item>name1</Suggest.Item>
 *   <Suggest.Item>name2</Suggest.Item>
 *   <Suggest.Item>name3</Suggest.Item>
 * </Suggest>
 */
export const Suggest = forwardRef<HTMLUListElement, SuggestProps>(
  (props, ref) => {
    const { ...rest } = props;
    // key: value -> $key: value に変換($をkey名の先頭に付与)
    const styled = transform.props.toStyled({
      // NOTE: スタイルプロップが追加された場合はここに追記
    });
    return <Base ref={ref} {...styled} {...rest} />;
  },
) as SuggestComponent;

Suggest.Item = SuggestItem;
