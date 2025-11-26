import React, {
  forwardRef,
  useCallback,
  useMemo,
  useState,
  type FocusEvent,
  type MouseEvent,
} from "react";
import styled from "styled-components";
import { transform, type StyledProps } from "@/utils/props";
import { InputText, type InputTextProps } from "../InputText/InputText";
import { Suggest } from "../Suggest";
import { useFormContext, useWatch } from "react-hook-form";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface StyleProps {}

const Base = styled(InputText)<StyledProps<StyleProps>>`
`;

export interface InputTextSuggestProps extends InputTextProps, StyleProps {
  suggestions: string[];
}

/**
 * NOTE: react-hook-formに依存しています
 */
export const InputTextSuggest = forwardRef<
  HTMLInputElement,
  InputTextSuggestProps
>((props, ref) => {
  const { suggestions, name, ...rest } = props;

  const [showSuggest, setShowSuggest] = useState(false);
  const { setValue, control } = useFormContext();
  const value = useWatch({ control, name: name! });

  const items = useMemo(() => {
    if (!value) return suggestions;
    return suggestions.filter((suggest) => suggest.includes(value));
  }, [suggestions, value]);

  const open = useMemo(() => {
    if (suggestions.length === 0) {
      return false;
    }
    return showSuggest;
  }, [suggestions, showSuggest]);

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setShowSuggest(true);
    },
    [setShowSuggest],
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setShowSuggest(false);
      }
    },
    [setShowSuggest],
  );

  const handleSelectSuggest = useCallback(
    (event: MouseEvent<HTMLLIElement>) => {
      // onBlueの発火を止める
      event.preventDefault();
      const value = event.currentTarget.innerText;
      setValue(name!, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: false,
      });
      setShowSuggest(false);
    },
    [setValue, setShowSuggest, name],
  );

  const styled = transform.props.toStyled({});

  return (
    <Container onBlur={handleBlur}>
      <Base ref={ref} name={name} onFocus={handleFocus} {...styled} {...rest} />
      {open && (
        <Suggest>
          {/* NOTE: onClickだとonBlueが発火した後に動くため、onMouseDownを利用 */}
          {items.map((item) => (
            <Suggest.Item key={item} onMouseDown={handleSelectSuggest}>
              {item}
            </Suggest.Item>
          ))}
        </Suggest>
      )}
    </Container>
  );
});
