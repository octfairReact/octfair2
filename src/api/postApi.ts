import axios, { AxiosResponse } from "axios";

export const postApi = async <T>(api: string, param: object): Promise<T | void> => {
  try {
    const result: AxiosResponse<T> = await axios.post(api, param);
    // HTTP status 코드 체크
    if (result.status >= 200 && result.status < 400) {
      return result.data;
    } else {
      throw new Error(`HTTP Error: ${result.status} - ${result.statusText}`);
    }
  } catch (error: any) {
    console.error("API 호출 오류 발생:", error);
    alert(`API 호출 오류: ${error.message || "알 수 없는 오류"}`);
  }
};