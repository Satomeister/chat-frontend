import React, { FC } from "react";

import "./FormWrapper.scss";
import Title from "antd/lib/typography/Title";

interface FormWrapperProps {
  children: JSX.Element[];
  title: string;
}

const FormWrapper: FC<FormWrapperProps> = ({
  children,
  title,
}): JSX.Element => {
  return (
    <div className="form-box">
      <Title style={{ textAlign: "center", marginBottom: 25 }} level={2}>
        {title}
      </Title>
      {children}
    </div>
  );
};

export default FormWrapper;
