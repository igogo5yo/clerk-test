import { CSSProperties, FC } from "react";
import classNames from "classnames";
import CheckMark from "./icons/check-mark.svg";
import styles from "../../styles/CheckBox.module.css";

export interface ICheckBoxProps {
  checked?: boolean;
  style?: CSSProperties
}

const CheckBox: FC<ICheckBoxProps> = ({ checked, style }) => (
  <div style={style} className={classNames(styles.checkbox, { [styles.checked]: checked })}>
    {checked && <CheckMark />}
  </div>
)

export default CheckBox;
