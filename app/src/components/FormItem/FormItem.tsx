import React, { forwardRef } from "react";
import styled from "styled-components";

import { FormItemLabel } from "./FormitemLabel";
import { FormItemDescription } from "./FormItemDescription";
import { FormItemMessage } from "./FormItemMessage";
import { FormItemContainer } from "./FormItemContainer";

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

export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  (props, ref) => {
    const { ...rest } = props;
    return <Base ref={ref} {...rest} />;
  },
) as FormItemComponent;

FormItem.Label = FormItemLabel;
FormItem.Container = FormItemContainer;
FormItem.Description = FormItemDescription;
FormItem.Message = FormItemMessage;
