import { FC } from "react";
import { components } from "react-select";
import CheckMark from "../icons/purple-checkmark.svg";

const { Option: BasicOption } = components;

const Option: FC<any> = (props) => {
  return (
    <BasicOption {...props}>
      <label>{props.label}</label>
      {props.isSelected && <CheckMark />}
    </BasicOption>
  );
};

export default Option;
