import React, { forwardRef } from "react";
import styled from "styled-components";
import type { StyledProps } from "@/utils/props";

type BaseProps = React.ComponentPropsWithoutRef<"div">;

interface StyleProps { }

/**
 * NOTE: Floating UI共通のスタイルを定義
 */
const Base = styled.div<StyledProps<StyleProps>>`
  position: fixed;
`;

export interface ContainerProps {
  children: React.ReactNode;
}

export interface ContainerProps extends StyleProps, BaseProps { }

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    const { ...rest } = props;
    return <Base ref={ref} {...rest} />;
  },
);
