import React, { FC } from "react";

import "./Home.scss";

import { Dialog, DialogsList } from "../../modules";
import { Route } from "react-router-dom";
import { Empty } from "antd";

const Home: FC = (): JSX.Element => {
  return (
    <div className="home">
      <DialogsList />
      <Route
        exact
        path="/"
        component={() => (
          <div
            className="dialog"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Empty
              description="Select a chat to start messaging"
              style={{ transform: "translateY(-50%)" }}
            />
          </div>
        )}
      />
      <Route path="/dialog/:id" component={Dialog} />
    </div>
  );
};

export default Home;
