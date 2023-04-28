import React, { useEffect } from 'react'
import WaveSurfer from 'wavesurfer.js' //导入wavesurfer.js
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js' //导入时间轴插件


const Wavesurfer = () => {

  useEffect(() => {
    let wavesurfer = WaveSurfer.create({
      container: '#audioChart',//容器
      waveColor: '#1DE3FA',//波形图颜色
      progressColor: '#159faf',//进度条颜色
      backend: 'MediaElement',
      mediaControls: false,
      audioRate: '1',//播放音频的速度
      //插件
      plugins: [
        //时间轴插件
        Timeline.create({
          container: '#wave-timeline'
        }),
        // 光标插件
        // CursorPlugin.create({
        //     showTime: true,
        //     opacity: 1,
        //     customShowTimeStyle: {
        //         backgroundColor: '#000',
        //         color: '#fff',
        //         padding: '2px',
        //         fontSize: '10px'
        //     }
        // }),
      ]
    });
    // 特别提醒：此处需要使用require(相对路径)，否则会报错
    wavesurfer.load(require('../../../assets/theme/test.mp3'))

    return () => {
    }
  }, [])



  return (
    <>
      <div id='audioChart'></div>
      <div id='wave-timeline'></div>
    </>
  )
}

export default Wavesurfer