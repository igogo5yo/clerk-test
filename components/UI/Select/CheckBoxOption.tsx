import { FC } from "react";
import { components } from "react-select";
import CheckBox from "../CheckBox";

const { Option } = components;

const CheckBoxOption: FC<any> = (props) => {
  return (
    <Option {...props}>
      <CheckBox checked={props.isSelected} style={{ marginRight: 8 }} />
      <label>{props.label}</label>
    </Option>
  );
};

export default CheckBoxOption;
