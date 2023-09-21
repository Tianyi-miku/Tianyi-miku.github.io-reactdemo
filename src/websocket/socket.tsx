import { useState } from "react";

import config from "@/config";
import React from "react";

//websocket,打开音频或者频谱图时候调用，关闭页面时清除
const Socket = () => {

  let websocket: any = React.useRef<WebSocket>();
  const connectNum = React.useRef<number>(0); // 已重连次数
  // let websocket: WebSocket;
  let lockReconnect = false;
  //
  const [socketData, setsocketData] = useState('');
  let createWebSocket = (url: string | URL) => {
    websocket.current = new WebSocket(url);
    websocket.current.onopen = function () {
      connectNum.current = 0;
      if (config.IsDev) {
        return;
      }
      heartCheck.reset();
      heartCheck.start();
    };
    websocket.current.onerror = function () {
      reconnect(url);
    };
    websocket.current.onclose = function (e: any) {
      console.log(
        "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
      );
    };
    websocket.current.onmessage = function (event: any) {
      lockReconnect = true;
      //event 为服务端传输的消息，在这里可以处理
      setsocketData(event.data);
    };
  };

  let reconnect = (url: string | URL) => {
    if (lockReconnect) return;
    //正式环境没连接上会一直重连，设置延迟避免请求过多，本地就不连了
    if (config.IsDev) {
      return;
    }
    const reconnectCount = config.wsReconnectNum;
    if (connectNum.current < reconnectCount) {
      setTimeout(() => {
        createWebSocket(url);
        connectNum.current = connectNum.current + 1;
        console.log(`ws失败重连第${connectNum.current}次`);
      }, 3000);
    }
  };

  let timeoutObj: string | number | NodeJS.Timeout | undefined;
  let timeout = 60000; //60秒
  let heartCheck = {
    reset: function () {
      clearInterval(timeoutObj);
      return;
    },
    start: function () {
      timeoutObj = setInterval(function () {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        //onmessage拿到返回的心跳就说明连接正常
        websocket.current.send("HeartBeat");
      }, timeout);
    },
  };
  //关闭连接
  let closeWebSocket = () => {
    websocket.current && websocket.current.close();
  };

  let sendMsg = (params: any) => {
    websocket.current.send(params)
  };

  return {
    createWebSocket,
    closeWebSocket,
    socketData,
    sendMsg,
    websocket
  };
};

export default Socket;
