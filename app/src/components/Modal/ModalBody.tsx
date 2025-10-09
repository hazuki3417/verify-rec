import React from "react";
import styled from "styled-components";
import { transform, type StyledProps } from "@/utils/props";

type BaseProps = React.ComponentPropsWithoutRef<"div">;

interface StyleProps {}

const Base = styled.div<StyledProps<StyleProps>>`
  padding: 0px 16px;
`;

export interface ModalBodyProps extends StyleProps, BaseProps {}

export const ModalBody = (props: ModalBodyProps) => {
  const { ...rest } = props;

  // key: value -> $key: value に変換($をkey名の先頭に付与)
  const styled = transform.props.toStyled({
    // NOTE: 必要に応じてここにStylePropsを追加
  });

  return <Base {...styled} {...rest} />;
};

ModalBody.displayName = "Modal.Body";
