import React, { FC, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Result, Spin } from "antd";

import "./index.scss";
import { Auth, Home } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "./store/ducks/user/actionCreators";
import { selectIsAuth, selectUserStatus } from "./store/ducks/user/selector";
import { LoadingStatus } from "./store/types";

const App: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useSelector(selectIsAuth);
  const status = useSelector(selectUserStatus);
  const isReady =
    status !== LoadingStatus.NEVER && status !== LoadingStatus.LOADING;

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (isReady) {
      if (isAuth) {
        history.push(history.location.pathname);
      } else {
        history.push("/auth/signin");
      }
    }
  }, [isAuth, isReady, history]);

  if (!isReady) {
    return (
      <div className="centered">
        <Spin size="large" />
        <span>Chat</span>
      </div>
    );
  }

  return (
    <div className="app">
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route exact path={["/", "/dialog/:id"]} component={Home} />
        <Route path="*">
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page is not found."
          />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
