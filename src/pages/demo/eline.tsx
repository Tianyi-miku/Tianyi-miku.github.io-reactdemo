import { useEffect, useState } from "react";
import { MoneyChart } from "./example/echarts";  //引入子组件

const Eline = () => {

  let numArr: number[] = []
  let numArr1: number[] = []
  for (let i = 0; i < 3000; i++) {
    numArr.push(Math.floor(Math.random() * 100) + 1);
    numArr1.push(Math.floor(Math.random() * 100) + 1);
  }

  const [option, setOption] = useState({                //设置初始值
    grid: {
      left: 0,
      right: 0,
    },
    xAxis: {
      axisTick: { alignWithLabel: false },
      data: numArr
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        symbolSize: 10,
        data: numArr1,
        type: 'line',
        smooth: true
      }
    ],
    tooltip: { show: true }
  })


  const x = () => setOption({                 //将异步获得的数据通过setOption到一个新的option上，然后通过虚拟DOM渲染，diff算法等渲染到页面上
    grid: {
      left: 0,
      right: 0,
    },
    xAxis: {
      axisTick: { alignWithLabel: true },
      data: numArr
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        symbolSize: 10,
        data: numArr1,
        type: 'line',
        smooth: true
      }
    ],
    tooltip: { show: true }
  })

  useEffect(() => {
    x()
  }, [])

  return (                                //最后传入option，在子组件中就是props.option
    <>
      <MoneyChart option={option} />
    </>
  )
}
export default Eline