import React, { FC } from "react";

import "./ImagesList.scss";

import { ImageObj } from "../../modules/Dialog/components/ChatInput";

interface imagesListProps {
  images: ImageObj[];
}

const ImagesList: FC<imagesListProps> = ({ images }): JSX.Element => {
  return (
    <div className="image-list">
      {images.map((image) => {
        return (
          <img
            key={image.blobUrl}
            src={image.blobUrl}
            className="image-list__item"
            alt={image.file.name}
          />
        );
      })}
    </div>
  );
};

export default ImagesList;
