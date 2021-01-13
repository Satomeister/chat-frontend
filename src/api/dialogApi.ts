import axios from "../core/axios";
import { SendMessagePayload } from "../store/ducks/dialog/contracts/state";

export const dialogApi = {
  async getDialog(dialogId: string) {
    const { data } = await axios.get(`/dialog/${dialogId}`);
    return data;
  },
  async sendMessage(message: SendMessagePayload) {
    const { data } = await axios.post("/message", message);
    return data;
  },
};