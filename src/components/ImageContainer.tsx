import { FunctionComponent } from "react";
import styles from "./ImageContainer.module.css";

export type ImageContainerType = {
  className?: string;
  image?: string;
  showImage34Icon?: boolean;
};

const ImageContainer: FunctionComponent<ImageContainerType> = ({
  className = "",
  image,
  showImage34Icon,
}) => {
  return (
    <div className={[styles.imageContainer, className].join(" ")}>
      {showImage34Icon && (
        <img className={styles.image34Icon} loading="lazy" alt="" src={image} />
      )}
    </div>
  );
};

export default ImageContainer;
