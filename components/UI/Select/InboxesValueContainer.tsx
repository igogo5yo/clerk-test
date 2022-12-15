import { ComponentType } from "react";
import { ValueContainerProps } from "react-select";
import { components } from "react-select";
import { IOption } from "../../../types";

const { ValueContainer } = components;

const InboxesValueContainer: ComponentType<ValueContainerProps<IOption, any, any>> = (props) => {
  const { getValue, hasValue, children } = props;
  const nbValues = getValue().length;
  if (!hasValue) {
    return (
      <ValueContainer {...props}>
        {children}
      </ValueContainer>
    );
  }

  // @ts-ignore
  const [_, child] = children;
  return (
    <ValueContainer {...props}>
      {nbValues > 1 ? `${nbValues} inboxes` : '1 inbox'} {child}
    </ValueContainer>
  );
}

export default InboxesValueContainer;
