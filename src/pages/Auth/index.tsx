import React from "react";
import { Route, Switch } from "react-router-dom";

import { SignIn, SignUp } from "./components";

const Auth = () => {
  return (
    <Switch>
      <Route path="/auth/signin" component={SignIn} />
      <Route path="/auth/signup" component={SignUp} />
    </Switch>
  );
};

export default Auth;
