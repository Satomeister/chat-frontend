import React, { FC, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Form, Input } from "antd";

import { FormWrapper, SubmitButton } from "../../../components";
import { fetchSignUp } from "../../../store/ducks/user/actionCreators";
import {
  selectIsAuth,
  selectRegError,
  selectUserStatus,
} from "../../../store/ducks/user/selector";
import { LoadingStatus } from "../../../store/types";

interface FormValues {
  email: string;
  name: string;
  password: string;
  password2: string;
}

const SignUp: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector(selectRegError);
  const status = useSelector(selectUserStatus);
  const isAuth = useSelector(selectIsAuth);

  const onFinish = async (values: FormValues) => {
    dispatch(fetchSignUp(values));
  };

  useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
  }, [isAuth, history]);

  return (
    <FormWrapper title="Registration">
      <Form onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter an email!" },
            { type: "email", message: "Email is invalid" },
          ]}
        >
          <Input
            size="large"
            name="email"
            id="email"
            type="email"
            placeholder="E-mail"
          />
        </Form.Item>

        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Please enter a name" },
            { min: 3, message: "Name must be at least 3 characters" },
            { max: 40, message: "Name must be less than 40 characters" },
          ]}
        >
          <Input
            size="large"
            id="name"
            name="name"
            type="text"
            placeholder="User name"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please enter a password!" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input
            size="large"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="password2"
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Passwords do not match!");
                }
              },
            }),
          ]}
        >
          <Input
            size="large"
            id="password2"
            name="password2"
            type="password"
            placeholder="Confirm password"
          />
        </Form.Item>
        {!!error && (
          <Alert style={{ marginBottom: 24 }} message={error} type="error" />
        )}
        <SubmitButton
          disabled={status === LoadingStatus.LOADING}
          text="Sign up"
        />
      </Form>
      <div style={{ textAlign: "center", fontSize: 16 }}>
        <Link to="/auth/signin">sign in</Link>
      </div>
    </FormWrapper>
  );
};

export default SignUp;
