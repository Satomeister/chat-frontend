import axios from "../core/axios";

export const DialogListApi = {
  async getDialogs() {
    const { data } = await axios.get(`/dialogs`);
    return data;
  },
  async addDialog(userId: string) {
    const { data } = await axios.post(`/dialog/${userId}`);
    return data;
  },
};
