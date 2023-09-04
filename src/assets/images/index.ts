/*
 * @Description:文件从这里集中引入，后续重复的图片使用场景，可以节省很多引入步骤
 * @Author: zhangyuru
 * @Date: 2023-03-06 10:22:29
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-08-07 17:00:42
 * @FilePath: \05-simulation_training_React\src\assets\images\index.ts
 */

import Bottag from "../icons/svg/bot-tag.svg";
import evaluation from "./control/stuUrl/evaluation.png";
import navTitle from "./control/application/nav-title.png";
import Logo from "@/assets/images/control/logo.png";
import LogoMini from "@/assets/images/control/logo-mini.png";
import MaxBgImg from "@/assets/images/control/background.png";

import Headimg from "@/assets/images/control/headimg.svg";
import Xiaoxinqiu from "@/assets/images/control/xiaoxinqiu.png";
import Youbandian from "@/assets/images/control/youbandian.png";
import Zuobandian from "@/assets/images/control/zuobandian.svg";
import Diqiu from "@/assets/images/control/diqiu.svg";
import LoginHead from "@/assets/images/control/loginHead.png";
import Feiji from "@/assets/images/control/feiji.svg";
import Xingqiu from "@/assets/images/control/xingqiu.svg";
import Loginbg from "@/assets/icons/svg/loginbg.svg";

import applicationA from "@/assets/images/control/application/applicationA.png";
import openExam from "@/assets/icons/svg/openExam.svg";

import appicon from "@/assets/images/control/appicon.png";
import userClose from "@/assets/images/control/content/userClose.png";
import userOpen from "@/assets/images/control/content/userOpen.png";
import userStop from "@/assets/images/control/content/userStop.png";
import online from "@/assets/images/control/content/state2.png";
import stop from "@/assets/images/control/content/state3.png";
import offline from "@/assets/images/control/content/state1.png";
import tooltipInverted from "@/assets/images/control/content/tooltipInverted.png";
import centTag from "@/assets/icons/svg/cent-tag.svg";

import sidedot from "@/assets/icons/svg/sidedot.svg";
import error from "@/assets/icons/svg/error.svg";

import dynbg1 from "@/assets/images/control/gif/dynamic1.gif";
import dynbg2 from "@/assets/images/control/gif/dynamic2.gif";

import appList from "@/assets/images/control/teachHomeMenu/appList.svg";
import examTest from "@/assets/images/control/teachHomeMenu/examTest.svg";
import misControl from "@/assets/images/control/teachHomeMenu/misControl.svg";
import resultManage from "@/assets/images/control/teachHomeMenu/resultManage.svg";
import systemManage from "@/assets/images/control/teachHomeMenu/systemManage.svg";
import leida from "@/assets/images/map/leida.gif";

type Images = {
  Logo: string;
  LogoMini: string;
  Bottag: string;
  evaluation: string;
  navTitle: string;
  MaxBgImg: string;
  Headimg: string;
  Xiaoxinqiu: string;
  Youbandian: string;
  Zuobandian: string;
  Diqiu: string;
  LoginHead: string;
  Feiji: string;
  Xingqiu: string;
  Loginbg: string;
  applicationA: string;
  openExam: string;
  userClose: string;
  userOpen: string;
  userStop: string;
  online: string;
  stop: string;
  offline: string;
  tooltipInverted: string;
  centTag: string;
  sidedot: string;
  error: string;
  dynbg1: string;
  dynbg2: string;
  appList: string;
  examTest: string;
  misControl: string;
  resultManage: string;
  systemManage: string;
  appicon: string;
  leida: string;
  leida1: string;
  [x: string]: any;
};
export default {
  Logo, // logo图片
  LogoMini, // logo图标
  Bottag,
  evaluation,
  navTitle,
  MaxBgImg, // 背景大图
  Headimg, // 登录页图片
  Xiaoxinqiu, // 登录页图片
  Youbandian, // 登录页图片
  Zuobandian, // 登录页图片
  Diqiu, // 登录页图片
  LoginHead, // 登录页图片
  Feiji, // 登录页图片
  Xingqiu, // 登录页图片
  Loginbg, // 登录页图片
  applicationA, //子系统图标
  openExam, //打开子系统图标
  userClose, //电脑离线
  userOpen, // 电脑在线
  userStop, //电脑暂停
  online, //在线状态图标
  stop, //暂停图标
  offline, //禁用图标
  tooltipInverted, //学员在线tool-tip背景
  centTag, //教员右侧背景框
  sidedot, //状态绿色方块
  error, //失败状态红色方块
  dynbg1, // GIF背景图1
  dynbg2, // GIF背景图2
  appList, // 菜单图标
  examTest, // 菜单图标
  misControl, // 菜单图标
  resultManage, // 菜单图标
  systemManage, // 菜单图标
  appicon, // 应用图标
  leida, // 雷达gif
} as Images;
