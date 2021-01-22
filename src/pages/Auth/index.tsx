import React from "react";
import { Route, Switch } from "react-router-dom";

import { SignIn, SignUp } from "./components";
import { Result } from "antd";

const Auth = () => {
  return (
    <Switch>
      <Route exact path="/auth/signin" component={SignIn} />
      <Route exact path="/auth/signup" component={SignUp} />
      <Route path="*">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page is not found."
        />
      </Route>
    </Switch>
  );
};

export default Auth;
