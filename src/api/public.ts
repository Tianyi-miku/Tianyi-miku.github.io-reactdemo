/*
 * @Description: 公用接口
 * @Author: zhangyuru
 * @Date: 2023-03-17 16:00:58
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-04-20 11:15:06
 * @FilePath: \05-simulation_training_React\src\api\public.ts
 */
import { Http } from "@/utils/axios";
import { useHttp } from "@/hooks/http";
import urls from "./urls/index";

// 查询全部字典数据
export function getDictsHttp() {
  return Http.Get({
    url: urls.dic.dict,
  });
}

// 按code查询字典数据
export function useGetDictByCode() {
  return useHttp((code: string | number) => {
    return Http.Get({
      url: urls.dic.dict + "/" + code,
    });
  });
}

// 按code查询manager字典数据
export function useGetManagerbyCode() {
  return useHttp((type: string | number) => {
    return Http.Get({
      url: urls.dic.manager + "/?type=" + type,
    });
  });
}

// 获取通知列表 || 获取通知详情
export function useNotice() {
  return useHttp((id: number) => {
    return Http.Get({
      url: id ? urls.other.notice + "/" + id : urls.other.notice,
    });
  });
}


// 获取所有站
export function useGetAllstaion() {
  return useHttp(() => {
    return Http.Get({
      url: urls.station.allstation,
    });
  });
}


// 获取单个站下功能参数
export function useGetstaion() {
  return useHttp((code: number) => {
    return Http.Get({
      url: urls.station.onlystation + code,
    });
  });
}