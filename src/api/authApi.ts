import axios from "../core/axios";
import {
  SignInPayload,
  SignUpPayload,
} from "../store/ducks/user/contracts/state";

export const AuthApi = {
  async signIn(payload: SignInPayload) {
    return await axios.post("/login", payload);
  },
  async signUp(payload: SignUpPayload) {
    return await axios.post("/signup", payload);
  },
  async getMe() {
    return await axios.get("/me");
  },
};
