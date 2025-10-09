import React from "react";
import styled from "styled-components";
import { transform, type StyledProps } from "@/utils/props";
import { ModalHeader } from "./ModalHeader";
import { ModalFooter } from "./ModalFooter";
import { ModalBody } from "./ModalBody";
import { theme } from "@/theme";
import { ModalDivider } from "./ModalDivider";

type BaseProps = React.ComponentPropsWithoutRef<"div">;

interface StyleProps {}

const Base = styled.div<StyledProps<StyleProps>>`
  background-color: ${theme.color.base.white};
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  min-width: 600px;
`;

export interface ModalProps extends StyleProps, BaseProps {}

/**
 * モーダルレイアウトを提供するコンポーネントです。
 * スタイルの調整が必要な場合はinline styleで調整してください。
 *
 * @example
 * ```
 * <Modal>
 *  <Modal.Header>
 *    <h2>Title</h2>
 *    <button>close</button>
 *  </Modal.Header>
 *  <Modal.Body>
 *    <div>content</div>
 *  </Modal.Body>
 *  <Modal.Divider />
 *  <Modal.Footer>
 *    <button>save</button>
 *  </Modal.Footer>
 * </Modal>
 * ```
 */
export const Modal = (props: ModalProps) => {
  const { ...rest } = props;

  // key: value -> $key: value に変換($をkey名の先頭に付与)
  const styled = transform.props.toStyled({
    // NOTE: 必要に応じてここにStylePropsを追加
  });

  return <Base {...styled} {...rest} />;
};

Modal.displayName = "Modal";
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
Modal.Body = ModalBody;
Modal.Divider = ModalDivider;
