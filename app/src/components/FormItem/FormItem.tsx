import React, { forwardRef } from "react";
import styled from "styled-components";

import { FormItemLabel } from "./FormitemLabel";
import { FormItemDescription } from "./FormItemDescription";
import { FormItemMessage } from "./FormItemMessage";
import { FormItemContainer } from "./FormItemContainer";
import { transform } from "@/utils/props";

type BaseProps = React.HTMLAttributes<HTMLDivElement>;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  margin: 0px;
  padding: 8px;
  gap: 4px
`;

interface StyleProps {}

export interface FormItemProps extends StyleProps, BaseProps {
  children?: React.ReactNode;
}

type FormItemComponent = React.ForwardRefExoticComponent<
  FormItemProps & React.RefAttributes<HTMLDivElement>
> & {
  Label: typeof FormItemLabel;
  Container: typeof FormItemContainer;
  Description: typeof FormItemDescription;
  Message: typeof FormItemMessage;
};

/**
 * フォームアイテムを構成するコンポーネントです。（レイアウト・装飾のみを提供します）
 * @example
 * <FormItem>
 *   <FormItem.Label>図面番号</FormItem.Label>
 *   <FormItem.Container>
 *     <InputText placeholder="例：12345-67890" />
 *   </FormItem.Container>
 *   <FormItem.Message>図面番号の入力は必須です</FormItem.Message>
 *   <FormItem.Description>
 *     図面番号が衝突した場合、確認のダイアログが表示されます。
 *   </FormItem.Description>
 * </FormItem>
 */
export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  (props, ref) => {
    const { ...rest } = props;
    // key: value -> $key: value に変換($をkey名の先頭に付与)
    const styled = transform.props.toStyled({
      // NOTE: スタイルプロップが追加された場合はここに追記
    });
    return <Base ref={ref} {...styled} {...rest} />;
  },
) as FormItemComponent;

FormItem.Label = FormItemLabel;
FormItem.Container = FormItemContainer;
FormItem.Description = FormItemDescription;
FormItem.Message = FormItemMessage;
