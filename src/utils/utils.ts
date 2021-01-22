import socket from "../core/socket";
import {isToday} from "date-fns";
import format from "date-fns/format";

export const showNewOnlineStatus = (isOnline: boolean, userId: string = '') => {
  if (userId) {
    socket.emit("USER:UPDATE_ONLINE_STATUS", isOnline, userId);
  }
};

export const getMessageTime = (updatedAt: Date) => {
  if (isToday(updatedAt)) {
    return format(updatedAt, "HH:mm");
  } else {
    return format(updatedAt, "d.M.y");
  }
};