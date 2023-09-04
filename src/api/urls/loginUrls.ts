/*
 * @Description:用户相关接口 登录登出、用户信息查询等
 * @Author: zhangyuru
 * @Date: 2023-04-19 09:42:20
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-04-19 09:49:35
 * @FilePath: \05-simulation_training_React\src\api\urls\login.ts
 */
const loginUrls: Login = {
  LoginGuide: "/login/guide", // 导调登录[POST]
  LoginWork: "/login/work", // 作业登录[POST]
  Logout: "/logout", // 退出登录[POST]
};

type Login = {
  LoginGuide: string;
  LoginWork: string;
  Logout: string;
};

export default loginUrls;
