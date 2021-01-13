import axios from "../core/axios";
import {ResponseApi} from "./IResoponseApi";
import {IDialog} from "../store/ducks/dialogList/contracts/state";

export const DialogListApi = {
  async getDialogs(): Promise<ResponseApi> {
    const {data} = await axios.get<ResponseApi>(`/dialogs`)
    return data
  },
  async addDialog(payload: IDialog): Promise<ResponseApi> {
    const {data} = await axios.post<ResponseApi>(`/dialog/${payload}`)
    return data
  }
}