import React, { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import { EmojiData, Picker } from "emoji-mart";
import {
  AudioOutlined,
  CameraOutlined,
  SendOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

import "./ChatInput.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchSendMessage } from "../../../../store/ducks/dialog/actionCreators";
import { LoadingStatus } from "../../../../store/types";
import { selectAddMessageStatus } from "../../../../store/ducks/dialog/selectors";
import { parseEmojis } from "../../../../utils/parseEmojis";

interface ChatInputProps {
  dialogId: string;
  scrollMessagesDown: () => void;
}

const Index: FC<ChatInputProps> = ({
  dialogId,
  scrollMessagesDown,
}): JSX.Element => {
  const dispatch = useDispatch();
  const textAreaRef = useRef<any>(null);
  const [value, setValue] = useState<string>("");
  const [picker, setPicker] = useState<boolean>(false);
  const status = useSelector(selectAddMessageStatus);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, [textAreaRef]);

  useEffect(() => {
    if (status === LoadingStatus.SUCCESS) {
      setValue("");
      textAreaRef.current?.focus();
      scrollMessagesDown();
    }
  }, [status, scrollMessagesDown]);

  const sendMessage = () => {
    if (value.trim()) {
      // TODO: text value or attachments
      dispatch(
        fetchSendMessage({
          text: value,
          dialog: dialogId,
        })
      );
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
      <CameraOutlined />
      <AudioOutlined />
      {status !== LoadingStatus.LOADING ? (
        <SendOutlined className="icon-send" onClick={sendMessage} />
      ) : (
        <SendOutlined className="icon-send" />
      )}
    </div>
  );
};

export default Index;