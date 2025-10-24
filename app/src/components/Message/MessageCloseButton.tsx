import React from "react";
import styled from "styled-components";
import { transform, type StyledProps } from "@/utils/props";
import { IconX } from "@/components/Icon";

interface StyleProps { }

const Base = styled.button<StyledProps<StyleProps>>`
  background: none;
  border: none;
  cursor: pointer;
  max-height: 24px;
  max-width: 24px;
  min-height: 24px;
  min-width: 24px;
  padding: 0;
`;

type BaseProps = React.ComponentPropsWithoutRef<"button">;

export interface MessageCloseButtonProps
  extends StyleProps,
  Omit<BaseProps, "children" | "type"> { }

export const MessageCloseButton = (props: MessageCloseButtonProps) => {
  const { style, ...rest } = props;

  // key: value -> $key: value に変換($をkey名の先頭に付与)
  const styled = transform.props.toStyled({
    // NOTE: 必要に応じてここにStylePropsを追加
  });

  return (
    <Base
      {...styled}
      style={{
        ...style,
        // NOTE: ボタンの配置場所を右上に固定
        position: "absolute",
        top: "8px",
        right: "8px",
      }}
      {...rest}
      type="button"
    >
      <IconX />
    </Base>
  );
};

MessageCloseButton.displayName = "Message.CloseButton";
