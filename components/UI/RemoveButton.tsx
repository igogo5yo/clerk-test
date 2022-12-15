import { FC, useState } from "react";
import button from "./Button";
import Bin from "../UI/icons/bin.svg";
import BinRed from "../UI/icons/red-bin.svg";
import styles from "../../styles/RemoveButton.module.css";

interface IRemoveButtonProps {
  onClick: () => void;
}

const RemoveButton: FC<IRemoveButtonProps> = ({ onClick }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <button
      className={styles.removeButton}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? <BinRed /> : <Bin />}
    </button>
  )
}

export default RemoveButton;
