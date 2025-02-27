import axios, { AxiosResponse } from "axios";

export const postSignUpApi = async <T>(api: string, param: object) => {
  try {
    const result: AxiosResponse<T> = await axios.post(api, param);
    return result.data;
  } catch (error) {
    alert(error);
  }
};
