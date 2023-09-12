/// <reference types="react-scripts" />

declare global {
  interface Window {
    BMap?: any; // 百度地图构造函数
    clickInfo?: Function; // 地图infowindow点击事件
  }
}

declare BMapGL