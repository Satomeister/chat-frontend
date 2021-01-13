import axios from "../core/axios";
import {ResponseApi} from "./IResoponseApi";

export const UsersApi = {
  async findUsers(name: string): Promise<ResponseApi> {
    const { data } = await axios.get<ResponseApi>(`/users/?user=${name}`)
    return data
  },
}