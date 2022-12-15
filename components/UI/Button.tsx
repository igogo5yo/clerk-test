import { FC } from "react";
import styles from "../../styles/Button.module.css";

export interface IButtonProps {
  label: string;
  onClick: () => void;
}

const Button: FC<IButtonProps> = ({ label, onClick }) => (
  <button className={styles.button} onClick={onClick}>{label}</button>
);

export default Button;
