import axios from "../core/axios";
import {SignInPayload, SignUpPayload} from "../store/ducks/user/contracts/state";
import {AxiosResponse} from "axios";
import {ResponseApi} from "./IResoponseApi";


export const AuthApi = {
  async signIn(payload: SignInPayload): Promise<AxiosResponse<ResponseApi>> {
    return await axios.post<ResponseApi>("/login", payload);
  },
  async signUp(payload: SignUpPayload): Promise<AxiosResponse<ResponseApi>> {
    return await axios.post<ResponseApi>("/signup", payload);
  },
  async getMe(): Promise<AxiosResponse<ResponseApi>> {
    return await axios.get<ResponseApi>("/me");
  },
};