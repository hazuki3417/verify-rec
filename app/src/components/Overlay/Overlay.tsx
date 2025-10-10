import React, { forwardRef } from "react";
import styled from "styled-components";
import { transform, type StyledProps } from "@/utils/props";

interface StyleProps {}

const Base = styled.div<StyledProps<StyleProps>>`
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`;

type BaseProps = React.ComponentPropsWithoutRef<"div">;

export interface OverlayProps extends StyleProps, Omit<BaseProps, "children"> {}

/**
 * 画面全体をカバーする背景オーバーレイを提供するコンポーネントです。
 * モーダルやドロワーなどのコンポーネントと組み合わせて利用します。
 * 表示するコンテンツの前面に配置してください。
 * （z-indexを使用せずstacking contextで制御することを推奨します）
 *
 * @example
 * ```tsx
 * <Portal>
 *   <Portal.ModalContainer>
 *     <Overlay onClick={handleClose} />
 *     <Modal>
 *       モーダルの内容
 *     </Modal>
 *   </Portal.ModalContainer>
 * </Portal>
 * ```
 */
export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  (props, ref) => {
    const { ...rest } = props;

    const styled = transform.props.toStyled({
      // NOTE: 必要に応じてここにStylePropsを追加
    });

    return <Base ref={ref} {...styled} {...rest} />;
  },
);
