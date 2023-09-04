/*
 * @Description:
 * @Author: zhangyuru
 * @Date: 2023-03-01 17:50:37
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-06-05 17:56:34
 * @FilePath: \05-simulation_training_React\src\api\login.ts
 */
import { Http } from "@/utils/axios";
import { useHttp } from "@/hooks/http";
import urls from "../urls";

export type LoginParams = {
  password: string;
  userCode: string;
  roleCode: string;
  terminalCode: string;
  // seatBindRoleCode?: string;
  // seatCode?: string;
};

// 导调登录
export function useLoginGuideHttp() {
  return useHttp((params: LoginParams) => {
    return Http.Post({
      url: urls.login.LoginGuide,
      data: params,
      unCheckLogin: true, // 不校验登录状态
    });
  });
}

// 作业登录
export function useLoginWorkHttp() {
  return useHttp((params: LoginParams) => {
    return Http.Post({
      url: urls.login.LoginWork,
      data: params,
      unCheckLogin: true, // 不校验登录状态
    });
  });
}

// 退出登录
export function useLogoutHttp() {
  return useHttp(() => {
    return Http.Post({
      url: urls.login.Logout,
      unCheckLogin: true, // 不校验登录状态
    });
  });
}
