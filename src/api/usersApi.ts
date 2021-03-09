import axios from "../core/axios";

export const UsersApi = {
  async findUsers(name: string) {
    const { data } = await axios.get(`/users/?user=${name}`);
    return data;
  },
};
