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
