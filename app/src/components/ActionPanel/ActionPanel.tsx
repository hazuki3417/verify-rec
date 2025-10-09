import React from "react";
import styled from "styled-components";
import { transform, type StyledProps } from "@/utils/props";
import { ActionPanelLeft } from "./ActionPanelLeft";
import { ActionPanelRight } from "./ActionPanelRight";
import { ActionPanelCenter } from "./ActionPanelCenter";

type BaseProps = React.ComponentPropsWithoutRef<"div">;

interface StyleProps {}

const Base = styled.div<StyledProps<StyleProps>>`
  align-items: center;
  display: flex;
`;

export interface ActionPanelProps extends StyleProps, BaseProps {}

/**
 * ユーザーのアクションを促すためのパネルコンポーネント
 * レイアウトのみを提供します。スタイルの調整が必要な場合はinline styleで調整してください。
 *
 * 基本的にLeft,Center,Rightの3つを配置して利用してください。コンテンツの配置が不要な場合は空で配置してください。
 * （Left,CenterまたはCenter,Rightの組み合わせで利用するとCenterの位置がずれるため）
 *
 * @example three buttons
 * ```
 * <ActionPanel>
 *  <ActionPanel.Left>
 *    <button>delete</button>
 *  </ActionPanel.Left>
 *  <ActionPanel.Center>
 *    <button>cancel</button>
 *  </ActionPanel.Center>
 *  <ActionPanel.Right>
 *    <button>ok</button>
 *  </ActionPanel.Right>
 * </ActionPanel>
 * ```
 *
 * @example cancel & ok buttons
 * ```
 * <ActionPanel>
 *  <ActionPanel.Center style={{ gap: "8px" }}>
 *    <button>cancel</button>
 *    <button>ok</button>
 *  </ActionPanel.Center>
 * </ActionPanel>
 * ```
 */
export const ActionPanel = (props: ActionPanelProps) => {
  const { ...rest } = props;

  // key: value -> $key: value に変換($をkey名の先頭に付与)
  const styled = transform.props.toStyled({
    // NOTE: 必要に応じてここにStylePropsを追加
  });

  return <Base {...styled} {...rest} />;
};

ActionPanel.displayName = "ActionPanel";
ActionPanel.Left = ActionPanelLeft;
ActionPanel.Right = ActionPanelRight;
ActionPanel.Center = ActionPanelCenter;
