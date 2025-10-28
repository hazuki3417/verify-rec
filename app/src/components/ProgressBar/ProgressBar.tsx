import React, { forwardRef, useMemo } from "react";
import styled from "styled-components";
import { theme } from "@/theme";

const Container = styled.div`
  border-radius: 15px;
  padding: 5px 8px;
  background-color: ${theme.color.base.white};
`;

const Bar = styled.div<{ $value: number }>`
  height: 16px;
  width: ${({ $value }) => $value}%;
  border-radius: 8px;
  background: linear-gradient(135deg, #23B18F, #C2F19E);
  transition: width 300ms ease;
`;

export interface ProgressBarProps {
  value: number;
}

/**
 * プログレスバーを提供するコンポーネント
 *
 * @example
 * ```tsx
 * <ProgressBar value={50}>
 * ```
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (props, ref) => {
    const { value, ...rest } = props;

    const percent = useMemo(() => {
      return Math.min(Math.max(value, 0), 100);
    }, [value]);

    return (
      <Container ref={ref} {...rest}>
        <Bar $value={percent} />
      </Container>
    );
  },
);
