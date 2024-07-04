import { FunctionComponent } from "react";
import styles from "./ImageContainer.module.css";

export type ImageContainerType = {
  className?: string;
  image: string;
};

const ImageContainer: FunctionComponent<ImageContainerType> = ({
  className = "",
  image,
}) => {
  return (
    <div className={[styles.imageContainer, className].join(" ")}>
        <img className={styles.image34Icon} loading="lazy" alt="" src={image} />
    </div>
  );
};

export default ImageContainer;
