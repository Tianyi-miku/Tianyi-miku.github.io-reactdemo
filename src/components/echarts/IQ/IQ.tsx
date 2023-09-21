import React, { useEffect } from 'react'
import * as echarts from 'echarts';
import { cloneDeep } from 'lodash';

let chartDom: any
let IQChart: any
let option: any
const IQ = (prop: any) => {

  const arrayChunk = (array: [], size: number) => {
    let arr: any = cloneDeep(array)
    arr = arr.map((item: number) => {
      return item / 100
    })

    let data = []
    for (let i = 0; i < arr.length; i += size) {
      data.push(arr.slice(i, i + size))
    }
    return data
  }
  option = {
    tooltip: {
    },
    xAxis: {
      min: -1,
      max: 1,
      interval: 1
    },
    yAxis: {
      min: -1,
      max: 1,
      interval: 1
    },
    series: [
      {
        symbolSize: 3,
        data: [],
        type: 'scatter',
        encode: { tooltip: [0, 1] },
      }
    ]
  };
  useEffect(() => {
    chartDom = document.getElementById('IQChart');
    IQChart = echarts.init(chartDom);

    if (chartDom) {


      option && IQChart.setOption(option);
    }

    return () => {
      IQChart.clear()
    }
  }, [])

  useEffect(() => {
    if (prop.clean) {
      IQChart.setOption(option);
    }
    return () => {
    }
  }, [prop.clean])


  useEffect(() => {
    const points = arrayChunk(prop.IQData, 2)

    if (IQChart && points) {
      IQChart.setOption({
        series: [
          {
            data: points
          }
        ]
      });
    }
    return () => {
    }
  }, [prop.IQData])

  return (
    <div id='IQChart' style={{ height: '100%', width: '100%' }}>
    </div>
  )
}

export default IQ