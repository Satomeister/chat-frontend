import axios from "../core/axios";

export const fileApi = {
  async uploadImage(dialogId: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await axios.post(`/file/${dialogId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
};
