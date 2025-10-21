import React from "react";
import styled, { css } from "styled-components";
import {
  styleResolver,
  transform,
  type StyledProps,
  type StyleMap,
} from "@/utils/props";
import { MessageContent } from "./MessageContent";
import { theme } from "@/theme";
import { MessageCloseButton } from "./MessageCloseButton";
import { MessageTitle } from "./MessageTitle";
import { MessageProvider, type MessageStatus } from "./Message.context";

export type MessageStatusProp = { status: MessageStatus };

export type MessageStatusStyleMap = StyleMap<MessageStatus>;

export const messageStatusStyleMap: MessageStatusStyleMap = {
  success: {
    color: theme.color.main.emerald,
    border: `solid 1px ${theme.color.sub.pealEmerald}`,
    backgroundColor: theme.color.sub.slightlyEmerald,
  },
  info: {
    color: theme.color.base.riverBlue,
    border: `solid 1px ${theme.color.sub.slightlyLightGray}`,
    backgroundColor: theme.color.base.pealGray,
  },
  warning: {
    color: theme.color.base.riverBlue,
    border: `solid 1px #DCD69F`, // TODO: カラーコードに対する名称の定義がないので確認（figma）
    backgroundColor: "#FFFDEA", // TODO: カラーコードに対する名称の定義がないので確認（figma）
  },
  error: {
    color: theme.color.sub.coral,
    border: `solid 1px ${theme.color.sub.lightPink}`,
    backgroundColor: theme.color.sub.slightlyLightPink,
  },
};

interface StyleProps extends MessageStatusProp {}

const Base = styled.div<StyledProps<StyleProps>>`
  position: relative;
  background-color: ${theme.color.base.white};
  border-radius: 8px;
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  font-size: ${theme.font.size[14]};
  font-weight: ${theme.font.weight.regular};
  line-height: ${theme.font.lineHeight[160]};

  ${({ $status }) =>
    css(styleResolver($status, messageStatusStyleMap, "success"))}
`;

type BaseProps = React.ComponentPropsWithoutRef<"div">;

export interface MessageProps extends StyleProps, BaseProps {}

/**
 * モーダルレイアウトを提供するコンポーネントです。
 * スタイルの調整が必要な場合はinline styleで調整してください。
 *
 * @example
 * ```
 * <Message status="success">
 *  <Message.CloseButton onClick={() => {}} />
 *  <Message.Title>Title</Message.Title>
 *  <Message.Content>
 *    <div>content</div>
 *    <button>close</button>
 *  </Message.Content>
 * </Message>
 * ```
 */
export const Message = (props: MessageProps) => {
  const { status, children, ...rest } = props;

  // key: value -> $key: value に変換($をkey名の先頭に付与)
  const styled = transform.props.toStyled({
    status,
  });

  // NOTE: 親で指定したstateに連動してアイコンやテキストカラーを変更するように実装しています

  return (
    <Base {...styled} {...rest}>
      <MessageProvider value={{ status }}>{children}</MessageProvider>
    </Base>
  );
};

Message.displayName = "Message";
Message.Title = MessageTitle;
Message.Content = MessageContent;
Message.CloseButton = MessageCloseButton;
