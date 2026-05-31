import { ContainerProps } from "@/types/types";
import styles from "./Container.module.css";

const Container = ({ children }: ContainerProps) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

export default Container;
