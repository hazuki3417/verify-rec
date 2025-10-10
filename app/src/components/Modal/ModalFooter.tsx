import React from "react";
import styled from "styled-components";
import { transform, type StyledProps } from "@/utils/props";

interface StyleProps {}

const Base = styled.div<StyledProps<StyleProps>>`
border-radius: 0 0 16px 16px;
padding: 16px;
`;

type BaseProps = React.ComponentPropsWithoutRef<"div">;

export interface ModalFooterProps extends StyleProps, BaseProps {}

export const ModalFooter = (props: ModalFooterProps) => {
  const { ...rest } = props;

  // key: value -> $key: value に変換($をkey名の先頭に付与)
  const styled = transform.props.toStyled({
    // NOTE: 必要に応じてここにStylePropsを追加
  });

  return <Base {...styled} {...rest} />;
};

ModalFooter.displayName = "Modal.Footer";
