import React, { FC, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Alert, Form, Input } from "antd";

import { FormWrapper, SubmitButton } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignIn } from "../../../store/ducks/user/actionCreators";
import {
  selectIsAuth,
  selectLoginError,
  selectUserStatus,
} from "../../../store/ducks/user/selector";
import { LoadingStatus } from "../../../store/types";

interface FormValues {
  email: string;
  password: string;
}

const SignIn: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector(selectLoginError);
  const status = useSelector(selectUserStatus);
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
  }, [isAuth, history]);

  const onFinish = (values: FormValues) => {
    dispatch(fetchSignIn(values));
  };

  return (
    <FormWrapper title="Login">
      <Form onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your login or email!" },
          ]}
        >
          <Input
            size="large"
            id="email"
            name="email"
            type="text"
            placeholder="Login or E-mail"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            size="large"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {!!error && (
          <Alert style={{ marginBottom: 24 }} message={error} type="error" />
        )}
        <SubmitButton
          disabled={status === LoadingStatus.LOADING}
          text="Sign in"
        />
      </Form>
      <div style={{ textAlign: "center", fontSize: 16 }}>
        <Link to="/auth/signup">sign up</Link>
      </div>
    </FormWrapper>
  );
};

export default SignIn;
