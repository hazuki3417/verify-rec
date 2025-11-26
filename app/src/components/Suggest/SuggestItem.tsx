import { theme } from "@/theme";
import { transform, type StyledProps } from "@/utils/props";
import React, { forwardRef } from "react";
import styled from "styled-components";

type BaseProps = React.ComponentPropsWithoutRef<"li">;

interface StyleProps {
  active?: boolean;
}

const Base = styled.li<StyledProps<StyleProps>>`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  border-bottom: 1px solid ${theme.color.sub.gray};
  cursor: pointer;
  display: -webkit-box;
  color: ${theme.color.base.riverBlue};
  font-size: ${theme.font.size[14]};
  line-height: 18px; // TODO: token管理されていない値（どうするか検討）
  max-height: 42px;
  overflow-wrap: break-word;
  overflow: hidden;
  padding: 4px 8px;
  text-overflow: ellipsis;
  white-space: pre-wrap;

  &:last-child {
    border-bottom: 1px solid transparent;
  }

  &:hover {
    background-color: ${theme.color.base.pealGray};
  }

  ${({ $active }) =>
    $active &&
    `
    background-color: ${theme.color.base.pealGray};
  `}
`;

export interface SuggestItemProps extends StyleProps, BaseProps { }

export const SuggestItem = forwardRef<HTMLLIElement, SuggestItemProps>(
  (props, ref) => {
    const { active, ...rest } = props;

    // key: value -> $key: value に変換($をkey名の先頭に付与)
    const styled = transform.props.toStyled({
      active,
    });

    return <Base ref={ref} {...styled} {...rest} />;
  },
);
