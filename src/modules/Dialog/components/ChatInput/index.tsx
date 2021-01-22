import React, { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import { EmojiData, Picker } from "emoji-mart";
import { SendOutlined, SmileOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

import "./ChatInput.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessageStatus,
  fetchSendMessage,
} from "../../../../store/ducks/dialog/actionCreators";
import { LoadingStatus } from "../../../../store/types";
import { selectAddMessageStatus } from "../../../../store/ducks/dialog/selectors";
import { parseEmojis } from "../../../../utils/parseEmojis";
import { ImagesList, UploadImageButton } from "../../../../components";
import { fileApi } from "../../../../api/fileApi";

interface ChatInputProps {
  dialogId: string;
  isFirstMessage: boolean;
  scrollMessagesDown: () => void;
}

export interface ImageObj {
  blobUrl: string;
  file: File;
}

const Index: FC<ChatInputProps> = ({
  dialogId,
  isFirstMessage,
  scrollMessagesDown,
}): JSX.Element => {
  const dispatch = useDispatch();
  const textAreaRef = useRef<any>(null);
  const [value, setValue] = useState<string>("");
  const [attachments, setAttachments] = useState<ImageObj[]>([]);
  const [picker, setPicker] = useState<boolean>(false);
  const status = useSelector(selectAddMessageStatus);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, [textAreaRef]);

  useEffect(() => {
    if (status === LoadingStatus.SUCCESS) {
      setValue("");
      setAttachments([]);
      textAreaRef.current?.focus();
      scrollMessagesDown();
    }
  }, [status, scrollMessagesDown]);

  const sendMessage = async () => {
    const attachs = [];

    dispatch(addMessageStatus(LoadingStatus.LOADING));

    for (const attachment of attachments) {
      const { data } = await fileApi.uploadImage(dialogId, attachment.file);
      attachs.push(data);
    }

    if (value.trim() || attachs.length > 0) {
      dispatch(
        fetchSendMessage({
          text: value,
          dialog: dialogId,
          attachments: attachs,
          isFirstMessage,
        })
      );
    } else {
      dispatch(addMessageStatus(LoadingStatus.NEVER));
    }
  };

  const handleEnterSendMessage = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const addEmoji = ({ colons }: EmojiData) => {
    setValue((prev) => prev + colons);
  };

  return (
    <div>
      <div className="chat__input">
        <div
          onMouseEnter={() => setPicker(true)}
          onMouseLeave={() => setPicker(false)}
        >
          {picker && (
            <div className="chat__input-picker">
              <Picker exclude={["flags", "symbols"]} onSelect={addEmoji} />
            </div>
          )}
          <SmileOutlined />
        </div>
        <TextArea
          ref={textAreaRef}
          autoFocus
          disabled={status === LoadingStatus.LOADING}
          onChange={(e) => setValue(e.target.value)}
          onPressEnter={handleEnterSendMessage}
          value={parseEmojis(value)}
          bordered={false}
          placeholder="Write a message..."
          autoSize={{ maxRows: 6 }}
        />
        <UploadImageButton onInputChange={setAttachments} />
        {status !== LoadingStatus.LOADING ? (
          <SendOutlined className="icon-send" onClick={sendMessage} />
        ) : (
          <SendOutlined className="icon-send" />
        )}
      </div>
      <ImagesList images={attachments} />
    </div>
  );
};

export default Index;