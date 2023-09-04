/*
 * @Description: axios二次封装
 * @Author: zhangyuru
 * @Date: 2023-03-01 11:59:09
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-08-01 14:36:17
 * @FilePath: \05-simulation_training_React\src\utils\axios.ts
 */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import appConfig from "@/config/index";
import storage from "./storage";
import { generalNotification, removeInvalidData } from "./utils";
import { cloneDeep } from "lodash";

interface RequestOption extends AxiosRequestConfig {
  unCheckLogin?: boolean; // 不校验登录状态 默认false(都要校验)
  "Content-Type"?: any;
}
class HttpRequest {
  constructor(BaseUrl: string = "", OldToken: string = "") {
    if (BaseUrl) {
      this.requestConfig.baseURL = BaseUrl;
    }
    if (OldToken) {
      this.oldToken = OldToken;
    }
  }
  public oldUrl: string = ""; // 上一个请求地址
  public oldMethod: string = ""; // 上一个请求方式
  public debounce: number = 100; // 连续请求间隔时间
  public timer: number = +new Date();
  public oldToken: string = ""; // 老版本token，手动传入
  public requestConfig: AxiosRequestConfig = {
    baseURL: appConfig.HttpUrl,
    timeout: 60000,
    headers: {
      "X-Requested-With": "XMLHttpRequest", // 设置为异步
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  static cancelToken(url: string) {
    return new axios.CancelToken((cancel: Function) => {
      console.log("未登录不能发起请求 ", url);
      cancel(); // 取消请求
    });
  }
  public interceptors(instance: any, options: RequestOption) {
    // 请求拦截
    instance.interceptors.request.use((config: any) => {
      // 登录拦截
      const token = this.oldToken || storage.getToken(); // 优先取传入的token
      config.headers["token"] = token;
      if (!options?.unCheckLogin && !token) {
        config.cancelToken = HttpRequest.cancelToken(config.url); // 取消请求
      }
      // 重复请求拦截
      if (options.url === this.oldUrl && config.method === this.oldMethod) {
        // 可能在一段时间内重复请求 如果间隔时间内 则不再请求
        if (+new Date() - this.timer < this.debounce) {
          config.cancelToken = HttpRequest.cancelToken(config.url); // 取消请求
        }
      }
      this.oldUrl = options.url || "";
      this.oldMethod = config.method;
      this.timer = +new Date();
      return config;
    }, this.errorHandler);
    // 响应拦截
    instance.interceptors.response.use((res: any) => {
      if (["050000", "050401"].includes(res?.data?.code)) {
        generalNotification.error("请求错误", "用户未登入或者登入超时");
      }
      if (["050500"].includes(res?.data?.code)) {
        generalNotification.error("请求错误", res.data.message);
      }
      return res.data;
    }, this.errorHandler);
  }
  // 错误处理
  public errorHandler(error: any) {
    if (error.response) {
      const { data, status } = error?.response;
      if (status === 403) {
        generalNotification.error("请求错误", data.message);
      }
      if (status === 401 && !data?.result?.isLogin) {
        generalNotification.error("请求错误", "授权验证失败");
      }
    }
    return Promise.reject(error);
  }
  public request(options: RequestOption) {
    const instance: AxiosInstance = axios.create();
    options = Object.assign(cloneDeep(this.requestConfig), options);
    this.interceptors(instance, options);
    return instance(removeInvalidData(options));
  }
  public Get(options: RequestOption) {
    options.method = "GET";
    return this.request(options);
  }
  public Post(options: RequestOption) {
    options.method = "POST";
    return this.request(options);
  }
  public Put(options: RequestOption) {
    options.method = "PUT";
    return this.request(options);
  }
  public Delete(options: RequestOption) {
    options.method = "DELETE";
    return this.request(options);
  }
}

// 新版(重构)http请求
export const Http = new HttpRequest();
