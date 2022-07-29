import axios from "axios";
import type { AxiosResponse } from "axios";
import type { ResponseBody } from "@/apis/typing";

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: "http://localhost:3000/api",
  timeout: 60000, // 请求超时时间
});

// 响应拦截器
const responseHandler = (
  response: AxiosResponse
): ResponseBody<any> | AxiosResponse<any> | Promise<any> | any => {
  return response.data;
};

// Add a response interceptor
request.interceptors.response.use(responseHandler);

export default request;
