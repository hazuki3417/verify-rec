import React, { useCallback, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { DxfPreview } from "../DxfPreview";
import styled from "styled-components";
import { IconButton } from "../Button";
import { IconAdCircle } from "../Icon";
import { theme } from "@/theme";

const Container = styled.div`
  border-radius: 8px;
  border: 1px solid ${theme.color.sub.darkGray};
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ZoomInIconButton = styled(IconButton)`
  bottom: calc((54px + 4px) * 2 + 16px);
  position: absolute;
  right: 16px;
}
`;
const ZoomOutIconButton = styled(IconButton)`
  bottom: calc(54px + 4px + 16px);
  // 54px: icon size
  // 4px : icon space
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

/**
 * DXFファイルを描画するコンポーネント
 * @param {Object} props コンポーネントproperties
 * @param {string|File} props.src
 * @returns
 */
export const DxfViewer = (props: DxfViewerProps) => {
  const { src } = props;

  const [angle, setAngle] = useState(0);

  const rotateLeft = useCallback(() => {
    setAngle((prev) => (prev - 90) % 360);
  }, []);

  return (
    <Container style={{
      height: "500px",
      minWidth: "100px",
      maxWidth: "670px"
      }}>
      <TransformWrapper
        initialScale={1}
        centerOnInit
        wheel={{wheelDisabled: true}}
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
              <DxfPreview src={src} rotate={angle}  />
            </TransformComponent>
            {/**
             * NOTE: ボタン要素の記述位置に注意
             *       Previewより前に配置: ボタンがPreviewの下に配置される -> z-indexの指定が必要
             *       Previewより後に配置: ボタンがPreviewの上に配置される -> z-indexの指定が不要
             */}
            <ZoomInIconButton onClick={() => zoomIn()} aria-label="zoom-in">
              <IconAdCircle size="36" />
            </ZoomInIconButton>
            <ZoomOutIconButton onClick={() => zoomOut()} aria-label="zoom-out">
              <IconAdCircle size="36" />
            </ZoomOutIconButton>
            <RotateIconButton onClick={rotateLeft} aria-label="rotate">
              <IconAdCircle size="36" />
            </RotateIconButton>
          </>
        )}
      </TransformWrapper>
    </Container>
  );
};
