import React, { forwardRef } from "react";
import styled from "styled-components";
import { transform, type StyledProps } from "@/utils/props";
import { theme } from "@/theme";

interface StyleProps {}

const Base = styled.div<StyledProps<StyleProps>>`
  border-radius: 16px;
  padding: 16px;
  background-color: ${theme.color.base.white};
  box-shadow: 0px 4px 10px 0px ${theme.color.box.shadow[1]};
`;

type BaseProps = React.ComponentPropsWithoutRef<"div">;

export interface PaperProps extends StyleProps, BaseProps {}

/**
 * コンテンツブロックの背景を提供するコンポーネント
 *
 * @example
 * ```tsx
 * <Paper>
 *   <Text></Text>
 * </Paper>
 * ```
 */
export const Paper = forwardRef<HTMLDivElement, PaperProps>((props, ref) => {
  const { ...rest } = props;

  const styled = transform.props.toStyled({
    // NOTE: 必要に応じてここにStylePropsを追加
  });

  return <Base ref={ref} {...styled} {...rest} />;
});
