/*
 * @Description: Http请求相关的hook
 * @Author: zhangyuru
 * @Date: 2023-03-02 14:38:23
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-08-14 17:59:38
 * @FilePath: \05-simulation_training_React\src\hooks\http.ts
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generalNotification } from "@/utils/utils";
import { toType } from "@/utils/checkType";
import { debounce } from "lodash";
import config from "@/config";
import storage from "@/utils/storage";

/**
 * @description: Http请求的hook函数 
 * 用此函数包装后的Http请求，会返回一个数组，数组中包含3个参数
 * [ sendHttp,resData,setDate ]  用ES6解构 可以任意命名，
 * sendHttp: 发送请求的函数 接收2个参数:
    第一个是请求参数，
    第二个是请求完成后的一些配置参数(参考Options)
    如果第二个参数是一个函数，则会在收到请求响应后执行该函数，并把响应数据回传
 * resData: 响应数据
 * setDate: 改变响应式数据的方法
 * @param { Function } httpCallback http请求的回调函数
 * @return { Array } [ sendHttp,resData,setDate ]
 */
type UseHttp = (
  httpCallback: Function,
  disposeDataCallback?: Function
) => [Function, any, React.Dispatch<any>];

export const useHttp: UseHttp = (
  httpCallback, // 请求函数
  disposeDataCallback // 返回值处理函数
) => {
  type Options = {
    showMsg?: boolean; // 是否显示消息提示 不传就不显示
    successMsg?: string; // 成功提示 默认取后台返回的
    errorMsg?: string; // 失败提示 默认取后台返回的
    to?: string; // 请求完成后的跳转地址
    resolve?: Function; // 成功回调
    reject?: Function; // 失败回调
    Finally?: Function; // 成功/失败都会执行的回调
    [x: string]: any;
  };
  const [sendStatus, setSendStatus] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [optionData, setOptions] = useState<Options>({});
  const [resData, setData] = useState<any>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (resData) {
      const { to, showMsg, successMsg, errorMsg, resolve, reject, Finally } =
        optionData;
      if (showMsg) {
        const mesTitle: string = status ? "温馨提示" : "失败！";
        const faultStr: string = status ? "请求成功" : "请求失败";
        const sucMsg: string = successMsg || resData?.message || faultStr;
        const errMsg: string = errorMsg || resData?.message || faultStr;
        const notific = status
          ? generalNotification.success
          : generalNotification.error;
        notific(mesTitle, status ? sucMsg : errMsg);
      }
      // ... 这里后续可以扩展更多的 处理数据的操作
      if (resolve && status) resolve(resData);
      if (reject && !status) reject(resData);
      if (Finally) Finally(resData);
      if (to) navigate(to);
      if (resData?.code === "050000") {
        storage.removeToken(); // 移除token
        navigate(config.LoginPath); // 用户未登入或者登入超时 返回登陆
      }
    }
    return () => {};
  }, [resData, optionData, status, navigate]);

  const onSend = async <T>(params: T, opt: Options | Function) => {
    if (sendStatus) return; // 避免重复请求
    setSendStatus(true); // 确保在收到响应数据之前 只请求一次
    setData(undefined); // 重置响应结果
    if (toType(opt) === "object") setOptions(opt);
    let status: boolean = false;
    let newData: any = null;
    try {
      newData = await httpCallback(params);
      if (newData.__proto__ === Blob.prototype) {
        setData(newData);
        setStatus(true);
        setSendStatus(false);
        return;
      }
      status = newData?.code === "000000";
    } catch (err: any) {
      newData = err;
    }
    if (typeof opt === "function") opt(newData);
    if (disposeDataCallback) {
      newData = disposeDataCallback(newData) || newData;
    }
    setData(newData);
    setStatus(status);
    setSendStatus(false);
  };
  return [debounce(onSend), resData, setData];
};
