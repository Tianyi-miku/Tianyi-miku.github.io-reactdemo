import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Pannel from '../components/pannel/pannel';
import "./singleFrequency.less"
import BasicInformation from '../components/basicInformation/basicInformation';
import { Button } from 'antd';
import { Parameter, useStartTask } from '@/api/routine/routine';
import socket from '@/websocket/socket';
import { JsonStrToObj, generalNotification } from '@/utils/utils';
import IQ from '@/components/echarts/IQ/IQ';
import Spectrum from '@/components/echarts/Spectrum/Spectrum';
import config from '@/config';

enum taskStateType {
  initiate, //初始化
  working, //工作中
  Pause, //暂停
}
const enum DataType {
  IAudio, //音频
  Ispectrum,//IQ与频谱图
}


let sockets: { websocket: any, closeWebSocket: any; createWebSocket?: any; socketData?: any; } //默认websocket
const SingleFrequency = () => {
  sockets = socket(); //初始化

  const { state } = useLocation()

  const value: Array<Parameter> = state.value.parameters

  const Frequency = value.find(item => item.name === 'Frequency')
  const SpectrumSpan = value.find(item => item.name === 'SpectrumSpan')
  const record = {
    frequency: Frequency?.value || Frequency?.defaultValue,
    span: SpectrumSpan?.value || SpectrumSpan?.defaultValue
  }

  const [sendStart] = useStartTask()
  const [Taskcode, setTaskcode] = useState('')
  const [taskState, setTaskState] = useState(taskStateType.initiate)

  const [SpectrumData, setSpectrumData] = useState([])
  const [IQData, setIQData] = useState([])
  const [clean, setclean] = useState(false)

  function startTask() {
    sendStart(state.value, (resData: any) => {
      const data = resData.data
      setTaskcode(data.taskCode)
      //开始工作
      setTaskState(taskStateType.working)
    })
  }

  useEffect(() => {
    if (taskState === taskStateType.working) {
      sockets.createWebSocket(config.SingeWss + '/' + Taskcode)
    }
    return () => {
      sockets.closeWebSocket()
    }
  }, [Taskcode, taskState])

  //频谱数据
  useEffect(() => {
    if (sockets.socketData) {
      let result = JsonStrToObj(sockets.socketData)?.result
      let success = JsonStrToObj(sockets.socketData)?.success
      console.log(result);
      
      if (!success) {
        generalNotification.error("错误", result || '失败');
        return
      }
      let datas = result?.data
      let type = result?.type
      if (type === DataType.Ispectrum) {
        if (datas.length > 0) {
          datas.forEach((element: any) => {
            if (element.type === 'Spectrum') {
              setSpectrumData(element.datas)
            }
            if (element.type === 'IQ') {
              setIQData(element.datas)
            }
          });
        }
      }
    }
    return () => {
    }
    // eslint-disable-next-line
  }, [sockets.socketData])



  return (
    <>
      <div className="home-state">
        <Pannel
          title={'基础信息'}
          className="state-equ"
        >
          <BasicInformation pannelData={state.station}></BasicInformation>
        </Pannel>
      </div>
      <div className='cotent'>
        <div>
          <Button onClick={() => startTask()}>开始任务</Button>
          <Button>暂停</Button>
        </div>
        <div className='eharts'>
          <div className='Spectrum'>
            <Spectrum record={record} SpectrumData={SpectrumData} clean={clean}></Spectrum>
          </div>
          <div>
            <div className='IQ'>
              <IQ IQData={IQData} clean={clean}></IQ>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleFrequency