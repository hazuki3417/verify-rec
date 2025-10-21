import React, { useMemo } from "react";
import styled from "styled-components";
import { transform, type StyledProps } from "@/utils/props";
import { useMessageContext } from "./Message.context";
import { IconText } from "../IconText";
import { IconCircleCheck, IconCircleInfo, IconWarning } from "../Icon";

interface StyleProps {}

const Base = styled.div<StyledProps<StyleProps>>`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

type BaseProps = React.ComponentPropsWithoutRef<"div">;

export interface MessageTitleProps extends StyleProps, BaseProps {}

export const MessageTitle = (props: MessageTitleProps) => {
  const { children, ...rest } = props;

  // key: value -> $key: value に変換($をkey名の先頭に付与)
  const styled = transform.props.toStyled({
    // NOTE: 必要に応じてここにStylePropsを追加
  });

  const context = useMessageContext();

  const icon = useMemo(() => {
    switch (context.status) {
      case "success":
        return <IconCircleCheck color="emerald" />;
      case "info":
        return <IconCircleInfo color="riverBlue" />;
      case "warning":
        return <IconWarning color="addLightYellow" />;
      case "error":
      default:
        return <IconWarning color="coral" />;
    }
  }, [context.status]);

  return (
    <Base {...styled} {...rest}>
      <IconText
        fontWeight="bold"
        fontSize="18"
        icon={icon}
        style={{ gap: "8px" }}
      >
        {children}
      </IconText>
    </Base>
  );
};

MessageTitle.displayName = "Message.Title";
