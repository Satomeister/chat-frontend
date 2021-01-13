import React, { FC } from "react";
import { Button, Form } from "antd";

import "./SubmitButton.scss";

interface SubmitButtonProps {
  text: string;
  disabled: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = ({
  text,
  disabled,
}): JSX.Element => {
  return (
    <Form.Item>
      <Button
        disabled={disabled}
        className="submit-button"
        type="primary"
        htmlType="submit"
      >
        {text}
      </Button>
    </Form.Item>
  );
};

export default SubmitButton;
