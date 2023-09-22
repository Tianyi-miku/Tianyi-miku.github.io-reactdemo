/// <reference types="react-scripts" />

declare global {
  interface Window {
    BMap?: any; // 百度地图构造函数
  }
}

declare BMapGL