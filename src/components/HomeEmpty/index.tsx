import React from "react";
import { Empty } from "antd";

const HomeEmpty = () => {
  return (
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
  );
};

export default HomeEmpty;
