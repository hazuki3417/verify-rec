import React, { useCallback, useEffect, useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { DxfPreview } from "../../components/DxfPreview";
import styled from "styled-components";
import { IconButton } from "@/components/IconButton";
import { IconAdCircle } from "../../components/Icon";
import { theme } from "@/theme";

const Container = styled.div`
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${theme.color.sub.darkGray};
  display: flex;
  height: 500px;
  justify-content: center;
  maxWidth: 670px;
  minWidth: 100px;
  overflow: hidden;
  position: relative;

  // NOTE: hover時のボタン表示・非表示切り替え
  [aria-label="zoom-in"],
  [aria-label="zoom-out"],
  [aria-label="rotate"] {
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  &:hover [aria-label="zoom-in"],
  &:hover [aria-label="zoom-out"],
  &:hover [aria-label="rotate"] {
    opacity: 1;
    pointer-events: auto;
  }
`;

const ZoomInIconButton = styled(IconButton)`
  bottom: calc((54px + 4px) * 2 + 16px);
  position: absolute;
  right: 16px;
}
`;
const ZoomOutIconButton = styled(IconButton)`
  bottom: calc(54px + 4px + 16px);
  position: absolute;
  right: 16px;
}
`;
const RotateIconButton = styled(IconButton)`
  bottom: 16px;
  position: absolute;
  right: 16px;
}
`;

export interface DxfViewerProps {
  src: string | File;
}

export const DxfViewer = (props: DxfViewerProps) => {
  const { src, ...rest } = props;

  const [angle, setAngle] = useState(0);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const rotateLeft = useCallback(() => {
    setAngle((prev) => (prev - 90 + 360) % 360);
  }, []);

  /**
   * NOTE: ResizeObserverで親サイズを監視
   *       heightは固定だがwidthはwindow sizeの変更に応じて伸縮する
   *       そのためContainerコンポーネントのサイズ変更を検知してPreview側も伸縮するように実装
   *       cssは要素の伸縮のみ提供し、描画した図の伸縮はできない。
   *       描画している図の伸縮をするにはcanvasのwidth, heightを変更する必要がある。
   */
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <Container ref={containerRef} {...rest}>
      {size.width > 0 && size.height > 0 && (
        <TransformWrapper
          initialScale={1}
          centerOnInit
          wheel={{ wheelDisabled: true }}
        >
          {({ zoomIn, zoomOut }) => (
            <>
              <TransformComponent
                wrapperStyle={{
                  cursor: "move",
                  height: "100%",
                  width: "100%",
                }}
              >
                <DxfPreview
                  src={src}
                  rotate={angle}
                  width={size.width}
                  height={size.height}
                />
              </TransformComponent>
              <ZoomInIconButton onClick={() => zoomIn()} aria-label="zoom-in">
                <IconAdCircle size="36" />
              </ZoomInIconButton>
              <ZoomOutIconButton
                onClick={() => zoomOut()}
                aria-label="zoom-out"
              >
                <IconAdCircle size="36" />
              </ZoomOutIconButton>
              <RotateIconButton onClick={rotateLeft} aria-label="rotate">
                <IconAdCircle size="36" />
              </RotateIconButton>
            </>
          )}
        </TransformWrapper>
      )}
    </Container>
  );
};
