import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Empty, Input, Typography } from "antd";
import { SearchOutlined, LogoutOutlined } from "@ant-design/icons";

import "./DialogsList.scss";

import { useDispatch, useSelector } from "react-redux";
import { selectDialogs } from "../../store/ducks/dialogList/selector";
import {
  addDialog,
  fetchDialogList,
} from "../../store/ducks/dialogList/actionCreators";
import { IDialog } from "../../store/ducks/dialogList/contracts/state";
import { AddDialog, DialogItem } from "./components";
import socket from "../../core/socket";
import { selectUserId } from "../../store/ducks/user/selector";
import {setUserData} from "../../store/ducks/user/actionCreators";

const DialogsList: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredDialogs, setFilteredDialogs] = useState<IDialog[]>([]);
  const dialogs = useSelector(selectDialogs);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    dispatch(fetchDialogList());
  }, [dispatch]);

  useEffect(() => {
    const listener = (dialog: IDialog) => {
      if (dialog.partner._id === userId) {
        socket.emit("ROOM:JOIN", dialog._id);
        dispatch(addDialog(dialog));
      }
    };
    socket.on("DIALOG:NEW_DIALOG", listener);
    return () => {
      socket.off("DIALOG:NEW_DIALOG", listener);
    };
  }, [userId, dispatch]);

  useEffect(() => {
    const dialogByUpdatedAt = [...dialogs]
      // @ts-ignore
      .sort((a, b) => new Date(a.lastMessage?.createdAt) - new Date(b.lastMessage?.createdAt))
      .reverse();
    setFilteredDialogs(dialogByUpdatedAt);
  }, [dialogs]);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredDialogs(
      dialogs.filter(
        (dialog: IDialog) =>
          dialog.admin.name
            .toLowerCase()
            .indexOf(e.target.value.toLowerCase()) >= 0 ||
          dialog.partner.name
            .toLowerCase()
            .indexOf(e.target.value.toLowerCase()) >= 0
      )
    );
    setInputValue(e.target.value);
  };

  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setUserData(null))
  }

  return (
    <div className="dialogs">
      <div className="dialogs__header">
        <LogoutOutlined onClick={onLogoutHandler} rotate={180} className="dialogs__header-icon"/>
        <Typography className="dialogs__header-text">All Dialogs</Typography>
        <AddDialog />
      </div>
      <div className="dialogs__content">
        <div className="dialogs__content-search">
          <Input
            className="dialogs__content-search-input"
            onChange={onChangeInput}
            value={inputValue}
            size="large"
            placeholder="Search"
            prefix={<SearchOutlined style={{ color: "#8C8C8C" }} />}
          />
        </div>
        <div className="dialogs__list">
          {filteredDialogs ? (
            filteredDialogs.map((dialog) => {
              return <DialogItem key={dialog._id} dialog={dialog} />;
            })
          ) : (
            <Empty description="No dialogs yet" />
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogsList;
