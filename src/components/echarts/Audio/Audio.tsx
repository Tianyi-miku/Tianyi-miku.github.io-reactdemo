import React, { useEffect } from 'react'
import PCMPlayer from "pcm-player"
import Recorder from 'recorder-core'
import addWavHeader from './pcm'
import 'recorder-core/src/engine/wav'
// import 'recorder-core/src/extensions/waveview'
//需要使用到的音频格式编码引擎的js文件统统加载进来
//可选的扩展支持项
import "recorder-core/src/extensions/wavesurfer.view";

export enum playType {
  paused,//暂停
  start, //开始
  end, //传输完毕
  resume //重新开始
}
let wave: any
//@ts-ignore
let player: any = new PCMPlayer({
  inputCodec: 'Int16',
  channels: 1,
  sampleRate: 22050,
  flushTime: 2000,
})
let set: any = {
  elem: "#wave_audio",

  scale: 2, //缩放系数，应为正整数，使用2(3? no!)倍宽高进行绘制，避免移动端绘制模糊
  fps: 50, //绘制帧率，不可过高，50-60fps运动性质动画明显会流畅舒适，实际显示帧率达不到这个值也并无太大影响
  duration: 2500, //当前视图窗口内最大绘制的波形的持续时间，此处决定了移动速率
  direction: 1, //波形前进方向，取值：1由左往右，-1由右往左
  position: 0, //绘制位置，取值-1到1，-1为最底下，0为中间，1为最顶上，小数为百分比
  // centerHeight: 0, //中线基础粗细，如果为0不绘制中线，position=±1时应当设为0
  //波形颜色配置：[位置，css颜色，...] 位置: 取值0.0-1.0之间
  keep: true,
  centerHeight: 1,
  linear: [
    0,
    "rgba(14, 224, 238, 1)",
    0.7,
    "rgba(255, 215, 0, 1)",
    1,
    "rgba(255, 102, 0, 1)"
  ],
  centerColor: "#ddd5e9" //中线css颜色，留空取波形第一个渐变颜色
};
const IAudio = (prop: any) => {

  useEffect(() => {
    wave = Recorder.WaveSurferView(set);
    return () => {
    }
  }, [prop.clean])

  useEffect(() => {
    if (prop.AudioData) {
      if (prop.playType === playType.start) {
        player.continue()
      } else {
        player.pause()
      }
      let bas = _base64ToArrayBuffer(prop.AudioData)
      let arrayBuffer = addWavHeader(bas, 22050, 16, 1)
      const dataAudio = new Uint8Array(arrayBuffer)
      player && player.feed(dataAudio) // 播放声音
      const data = new Uint16Array(arrayBuffer)
      wave && wave.input(data, 20, 22050) // 添加波形数据
    }

    return () => {
      player.pause()
    }
    // eslint-disable-next-line
  }, [prop.AudioData])


  function _base64ToArrayBuffer(base64: string) {
    if (!base64) {
      return
    }
    let binary_string = window.atob(base64);//解码使用base64编码的字符串
    let len = binary_string.length;            //获取长度
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  return (
    <div id='wave_audio' className='recwave' style={{ height: '100px', width: '100%' }}>
    </div>
  )
}
export default IAudio