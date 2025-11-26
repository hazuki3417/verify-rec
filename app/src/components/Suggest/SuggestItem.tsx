import { theme } from "@/theme";
import { transform, type StyledProps } from "@/utils/props";
import React, { forwardRef } from "react";
import styled from "styled-components";

type BaseProps = React.ComponentPropsWithoutRef<"li">;

interface StyleProps {
  active?: boolean;
}

const Base = styled.li<StyledProps<StyleProps>>`
  border-bottom: 1px solid ${theme.color.sub.gray};
  cursor: pointer;
  font-size: ${theme.font.size[14]};
  line-height: 18px; // TODO: token管理されていない値（どうするか検討）
  max-height: 42px;
  overflow: hidden;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  padding: 4px 8px;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  &:last-child {
    border-bottom: 1px solid transparent;
  }

  ${({ $active }) =>
    $active &&
    `
    background-color: ${theme.color.base.riverBlue};
  `}
`;

export interface SuggestItemProps extends StyleProps, BaseProps {}

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
