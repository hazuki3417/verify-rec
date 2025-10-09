import React from "react";
import styled from "styled-components";
import { transform, type StyledProps } from "@/utils/props";
import { theme } from "@/theme";

type BaseProps = React.ComponentPropsWithoutRef<"div">;

interface StyleProps {}

const Base = styled.div<StyledProps<StyleProps>>`
  background-color: ${theme.color.sub.lightGray};
  height: 1px;
`;

export interface ModalDividerProps extends StyleProps, BaseProps {}

export const ModalDivider = (props: ModalDividerProps) => {
  const { ...rest } = props;

  // key: value -> $key: value に変換($をkey名の先頭に付与)
  const styled = transform.props.toStyled({
    // NOTE: 必要に応じてここにStylePropsを追加
  });

  return <Base {...styled} {...rest} />;
};

ModalDivider.displayName = "Modal.Divider";
