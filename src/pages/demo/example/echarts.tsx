import * as echarts from 'echarts'
import React, { useEffect, useRef } from "react";

type Chart = {                                           //你也可以参考echarts官网中echarts如何在ts中使用的文档来自定义类型
  title?: string,
  xData?: string[],
  seriesData?: number[],
  option: any
  className?: string
}

const MoneyChart: React.FC<Chart> = (props) => {
  const { option } = props                             //option 的值由父组件传入
  const chartWrapper = useRef<HTMLDivElement>(null)   // 在React中，通过useRef来获取组件挂载的HTML元素，也就是ECharts官网文档中所提到的父容器。
  const chart = useRef<any>(null)
  useEffect(() => {
    const height = document.getElementById('dora')?.clientHeight  // 你也可以根据你的布局来自定义ECharts的宽高。
    if (!chartWrapper.current) { return }
    chartWrapper.current.style.height = `${height}px`              //用到了响应式布局的理念，在父元素中寻找id为dora的元素，并设置ECharts父容器的高度为其高度
    chart.current = echarts.init(chartWrapper.current, 'vintage')    //初始化ECharts
  }, [])
  useEffect(() => {                             //每次当option变化时，再次setOptions
    chart.current.setOption(option)
  }, [option])
  return (
    <div ref={chartWrapper} style={{ height: '500px' }}/>
  )
}
export { MoneyChart }
