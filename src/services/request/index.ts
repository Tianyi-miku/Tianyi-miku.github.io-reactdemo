import {BASE_URL,TIMEOUT} from "./config"
import axios ,{ AxiosInstance, AxiosRequestConfig}from "axios";
import storage from "../../utils/storage"
import {useNavigate} from "react-router-dom"
import {RequestConfig} from "../type/requestType"
// 请求类
class Request {
  public instance:AxiosInstance;
    constructor(baseURL:string, timeout:number) {
      this.instance = axios.create({
          baseURL,
          timeout,
          headers: {
            "X-Requested-With": "XMLHttpRequest", // 设置为异步
            "Content-Type": "application/json;charset=UTF-8",
          },
        })
        //请求拦截
        const navigate = useNavigate()
        this.instance.interceptors.request.use((config:any) => {
          const token = storage.getToken();
          config.headers["token"] = token;
          if ( !token) {
            config.cancelToken = new axios.CancelToken((cancel: Function) => {
              cancel(); // 取消请求
              //跳转到首页
              navigate("/login")
            });
          }
          return config;
        }, (err:any) => {
          return err
        })
        //响应拦截
        this.instance.interceptors.response.use((res:any) => {
          return res.data
        }, (err:any) => {
          return err
        })
      }
      request<T = any>(config:any) {
        return this.instance.request(config)
      }
      //get请求
      get<T = any>(config:RequestConfig) {
        return this.request({ ...config, method: "get" })
      }
      //post请求
      post<T = any>(config:RequestConfig) {
        return this.request({ ...config, method: "post" })
      }
      //put请求
      put<T = any>(config:RequestConfig) {
        return this.request({ ...config, method: "put" })
      }
      //delete请求
      delete(config:any) {
        return this.request({ ...config, method: "delete" })
      }
}


export default new Request(BASE_URL, TIMEOUT)