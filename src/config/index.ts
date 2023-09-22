import images from "@/assets/images";

export type Config = {
  LoginPath: string; // 默认登录页路由
  FileUrl: string; // 文件服务器地址（图片等）
  HttpUrl: string; // 默认http请求地址
  UploadUrl: string; //上传接口地址
  encryptMenu: string[]; // 需要用户权限+手动密钥才能访问的加密菜单 sessionStorage __key__ rdst2023
  menuKey: string; // 超级账号 --- sessionStorage
  menuPassword: string; // 超级账号密码 --- sessionStorage
  logoImg: string; // 系统logo图片
  IsPro: boolean; // 是否生产环境
  IsDev: boolean; // 是否开发环境
  wsReconnectNum: number, //ws本地连几次中断
  SingeWss: string,
};

const env: any = process.env;
const IsPro: boolean = env?.NODE_ENV === "production";

const config: Config = {
  LoginPath: "/home",
  FileUrl: "/document",
  HttpUrl: IsPro ? "/api" : "/api",
  UploadUrl: IsPro ? "/api" : "/api",
  logoImg: images.Logo,
  encryptMenu: ["/system/resource"], // 加密菜单
  menuKey: "__root__", // 超级账号
  menuPassword: "shkymiku2023", // 超级账号密码
  IsPro: IsPro, // 是否生产环境
  IsDev: !IsPro, // 是否开发环境
  wsReconnectNum: 3,
  SingeWss: `ws://${location.host}/farend/task`,
};

export default config;
