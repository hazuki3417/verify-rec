import React from "react";
import styled from "styled-components";
import { transform, type StyledProps } from "@/utils/props";

type BaseProps = React.ComponentPropsWithoutRef<"div">;

interface StyleProps {}

const Base = styled.div<StyledProps<StyleProps>>`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

export interface ActionPanelRightProps extends StyleProps, BaseProps {}

export const ActionPanelRight = (props: ActionPanelRightProps) => {
  const { ...rest } = props;

  // key: value -> $key: value に変換($をkey名の先頭に付与)
  const styled = transform.props.toStyled({
    // NOTE: 必要に応じてここにStylePropsを追加
  });

  return <Base {...styled} {...rest} />;
};

ActionPanelRight.displayName = "ActionPanel.Right";
