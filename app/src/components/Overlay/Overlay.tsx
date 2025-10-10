import React from "react";
import styled from "styled-components";
import { transform, type StyledProps } from "@/utils/props";

interface StyleProps {
  opacity?: number;
}

const Base = styled.div<StyledProps<StyleProps>>`
background-color: rgba(0, 0, 0, 0.2);
height: 100vh;
position: fixed;
width: 100vw;
`;

type BaseProps = React.ComponentPropsWithoutRef<"div">;

export interface OverlayProps extends StyleProps, BaseProps {
  opacity?: number;
}

/**
 * 画面全体をカバーする背景オーバーレイコンポーネント
 * モーダルやドロワーなどのコンポーネントと組み合わせて利用します
 *
 * @example
 * ```tsx
 * <>
 *   <Modal>
 *     モーダルの内容
 *   </Modal>
 *   <Overlay onClick={handleClose} />
 * </>
 * ```
 */
export const Overlay = (props: OverlayProps) => {
  const { opacity, ...rest } = props;

  const styled = transform.props.toStyled({
    opacity,
  });

  return <Base {...styled} {...rest} />;
};
