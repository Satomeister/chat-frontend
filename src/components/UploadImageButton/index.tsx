import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useRef,
} from "react";
import { CameraOutlined } from "@ant-design/icons";

import { ImageObj } from "../../modules/Dialog/components/ChatInput";

interface UploadIMageButtonProps {
  onInputChange: Dispatch<SetStateAction<ImageObj[]>>;
}

const UploadImageButton: FC<UploadIMageButtonProps> = ({
  onInputChange,
}): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    inputRef.current?.click();
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const images = Object.keys(files).map((key: any) => {
        const file = files[key];
        const blobUrl = URL.createObjectURL(new Blob([file]));
        return { file, blobUrl };
      });
      onInputChange(images);
    }
  };

  return (
    <div>
      <input
        onChange={onChangeInput}
        ref={inputRef}
        type="file"
        name="myImage"
        accept="image/*"
        hidden
        multiple
      />
      <CameraOutlined onClick={onIconClick} />
    </div>
  );
};

export default UploadImageButton;
