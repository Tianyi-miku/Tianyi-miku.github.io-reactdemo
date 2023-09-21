/*
 * @Description:接口统一管理
 * @Author: zhangyuru
 * @Date: 2023-04-19 09:57:24
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-04-19 10:04:26
 * @FilePath: \05-simulation_training_React\src\api\urls\index.ts
 */
import loginUrls from "./loginUrls";
import publicUrls from "./publicUrls";
import homeUrls from "./homeUrl";
import routineUrls from "./routine";

const Urls = {
  ...publicUrls,
  ...homeUrls,
  ...routineUrls,
  login: loginUrls,
};

export default Urls;
