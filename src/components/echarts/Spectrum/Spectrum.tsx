import React, { useEffect, useState } from 'react'
import * as echarts from 'echarts';
import { cloneDeep, escape } from 'lodash';

let chartDom: any
let lineChart: any
let option: any
let startValue: number = 0
let endValue = -1
const Spectrum = (prop: any) => {

  let span = prop.record.span
  let frequency = prop.record.frequency
  const arr: string | any[] = []

  const ixn = (span / 3400).toFixed(6)
  for (let index = -1700; index < 1700; index++) {
    let item = Number(frequency) + (Number(ixn) * index) / 1000
    arr.push((item.toFixed(6)))
  }
  option = {
    dataZoom: { // 放大和缩放
      show: true,
      start: 0,
      end: 100,
      // type: 'inside', //滑动条
      xAxisIndex: [0],
      type: "inside",
      // type: "slider", // 第二个图表 滑动条型数据区域缩放组件（dataZoomSlider）
      yAxisIndex: 1, // 设置 dataZoom-slider 组件控制的 y 轴
      // filterMode: "none", // 数据过滤模式

      moveOnMouseMove: false,  //鼠标滚轮触发滚动
      zoomOnMouseWheel:false,  //滚轮是否触发缩放
      moveOnMouseWheel:true
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
          xAxisIndex: [0],
          showTitle: false,
          iconStyle: {
            opacity: 0
          },
        },
        //其他功能性按钮查看官网进行增加，包括（显示数据，下载图片，改为柱状图等）
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        let relVal = '频率:' + params[0].name + 'MHz';
        for (let i = 0, l = params.length; i < l; i++) {
          relVal += `<br/> 值: ${params[i].value}`
        }
        return relVal;
      }
    },
    xAxis: {
      type: 'category',
      axisLine: { onZero: false },
      data: arr,
      axisTick: {
        show: true,
        inside: true //刻度内置
      },
      axisLabel: {
        clickable: true,
        axisTick: {
          alignWithLabel: true
        },
        showMaxLabel: true,
        // interval: 1700,
        interval: (index: number, value: any) => {
          // 此处返回 true 和 false
          return index === 0 || value === Number(frequency).toFixed(6) || index === 3399;
        },
        show: true,
        formatter: (value: any, index: number) => {
          if (index === 0) {
            return `-60khz`
          } else if (index === 3399) {
            return `+60khz`;
          } else if (value === Number(frequency).toFixed(6)) {
            return `${prop.record.frequency} MHZ`;
          }
        }
      },
      triggerEvent: true
    },
    yAxis: {
      type: 'value',
      // scale:true
      minInterval: 20,
      max: 80,
      min: -60
    },
    series: [
      {
        data: [],
        type: 'line',
      },
    ]
  };
  useEffect(() => {
    chartDom = document.getElementById('Spectrum');
    lineChart = echarts.init(chartDom);

    //prop.record.span 带宽
    //prop.record.frequency 中心频率
    if (chartDom) {

      option && lineChart.setOption(option);
      lineChart.dispatchAction({
        type: 'takeGlobalCursor',
        key: 'dataZoomSelect',
        dataZoomSelectActive: true // activate or inactivate          
      })
    }

    return () => {
      lineChart.clear()
    }
  }, [prop.record.frequency, prop.record.span])

  useEffect(() => {
    if (prop.clean) {
      lineChart.setOption(option)
    }
    return () => {
    }
  }, [prop.clean])

  useEffect(() => {
    let dZoom

    if (lineChart.id) {
      let arr: any = cloneDeep(prop.SpectrumData)
      arr = arr.map((item: number) => {
        return item / 10
      })

      lineChart.off('mouseup')
      lineChart.off('mousedown')
      lineChart.off('dataZoom')
      lineChart.getZr().on("mousedown", (params: any) => {
        startValue = params.offsetX
      })
      lineChart.getZr().on("mouseup", (params: any) => {
        endValue = params.offsetX
      })
      // 覆盖默认放大缩小事件
      lineChart.on("dataZoom", (params: any) => {
        let zoomData = params.batch[0];
        dZoom = {
          start: zoomData.startValue,
          end: zoomData.endValue
        }
        if (endValue < startValue) {
          dZoom = {
            start: 0,
            end: 100
          }
          lineChart.setOption(option)
          lineChart.setOption(
            {
              dataZoom: dZoom,
              series: [
                {
                  data: arr
                }
              ]
            },
          );
        }
      })
      lineChart.setOption({
        series: [
          {
            data: arr
          }
        ]
      });
    }
    return () => {
    }
  }, [prop.SpectrumData])


  return (
    <div id='Spectrum' style={{ height: '100%', width: '100%' }}>
    </div>
  )
}
export default Spectrum