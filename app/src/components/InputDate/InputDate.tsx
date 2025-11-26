import React, { forwardRef, useImperativeHandle, useRef } from "react";
import styled from "styled-components";
import {
  cssInputError,
  cssInputVariant,
  transform,
  type InputStyleProps,
  type StyledProps,
} from "@/utils/props";
import { theme } from "@/theme";
import { IconCalendar } from "../Icon";

type BaseProps = React.InputHTMLAttributes<HTMLInputElement>;

interface StyleProps extends InputStyleProps { }

const Base = styled.input<StyledProps<StyleProps>>`
  background-color: ${theme.color.base.white};
  border-radius: 4px;
  font-family: ${theme.font.family.base};
  font-size: ${theme.font.size[16]};
  font-weight: ${theme.font.weight.regular};
  color: ${theme.color.base.riverBlue};
  line-height: ${theme.font.lineHeight[160]};
  &::placeholder {
    color: ${theme.color.sub.lightGray};
  }
  ${cssInputVariant}
  ${cssInputError}
  padding-right: 40px; // アイコン分の余白を確保
  &::-webkit-calendar-picker-indicator {
    display: none;
  }
  &::-webkit-inner-spin-button,
  &::-webkit-clear-button {
    display: none;
  }
`;

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const IconBox = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
`;

export interface InputDateProps extends StyleProps, Omit<BaseProps, "type"> { }

export const InputDate = forwardRef<HTMLInputElement, InputDateProps>(
  (props, ref) => {
    const { style, variant, error, ...rest } = props;
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => localRef.current as HTMLInputElement);

    const styled = transform.props.toStyled({
      variant,
      error,
    });

    const handleIconClick = () => {
      // Chrome/Edge/Operaではカレンダーを強制的に開ける
      localRef.current?.showPicker?.();
      // Safariなど非対応ブラウザはフォーカスで代替
      if (!localRef.current?.showPicker) {
        localRef.current?.focus();
      }
    };

    // NOTE: typeを固定するため一番最後に指定（スプレッド演算子をあとに記述すると値が上書きされる）
    return (
      <Container style={style}>
        <Base ref={localRef} style={style} {...styled} {...rest} type="date" />
        <IconBox onClick={handleIconClick}>
          <IconCalendar size="24" />
        </IconBox>
      </Container>
    );
  },
);
