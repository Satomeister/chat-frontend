import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {Alert, Modal, Select} from "antd";
import { useDispatch, useSelector } from "react-redux";

import { FormOutlined } from "@ant-design/icons";

import { LoadingStatus } from "../../../store/types";
import { IUser } from "../../../store/ducks/user/contracts/state";
import { UsersApi } from "../../../api/usersApi";
import { fetchAddDialog } from "../../../store/ducks/dialogList/actionCreators";
import {selectAddDialogError, selectAddDialogStatus} from "../../../store/ducks/dialogList/selector";
import { selectDialogId } from "../../../store/ducks/dialog/selectors";

const { Option } = Select;

const AddDialog: FC = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const status = useSelector(selectAddDialogStatus);
  const createdDialogId = useSelector(selectDialogId);
  const error = useSelector(selectAddDialogError)

  const handleOk = () => {
    if (selectedUser) {
      dispatch(fetchAddDialog(selectedUser));
    }
  };

  useEffect(() => {
    if (status === LoadingStatus.SUCCESS) {
      setIsModal(false)
      history.push(`/dialog/${createdDialogId}`);
    }
  }, [status, createdDialogId, history]);

  const onSearch = async (value: string) => {
    const { data } = await UsersApi.findUsers(value);
    setUsers(data);
  };

  const onSelect = (user: string) => {
    setSelectedUser(user);
  };

  return (
    <>
      <FormOutlined
        onClick={() => setIsModal(true)}
        className="dialogs__header-icon"
      />
      <Modal
        title="Find the person and start dialog"
        visible={isModal}
        onOk={handleOk}
        onCancel={() => setIsModal(false)}
      >
        <Select
          placeholder="Enter e-mail or user name"
          style={{ width: "100%" }}
          showSearch
          defaultActiveFirstOption={false}
          onSearch={onSearch}
          onSelect={onSelect}
          filterOption={false}
        >
          {users.map((user) => (
            <Option key={user._id} value={user._id}>
              <span>{user.name} </span>
              <span style={{ fontSize: 12, color: "#8C8C8C", paddingLeft: 7 }}>
                {user.email}
              </span>
            </Option>
          ))}
        </Select>
        {error
        && (
          <Alert type="error" message={error} style={{marginTop: 20}}/>
        )
        }
      </Modal>
    </>
  );
};

export default AddDialog;