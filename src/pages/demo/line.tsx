import {
  lightningChart,
  Themes,
} from '@arction/lcjs'
import { useEffect } from 'react'
const { createProgressiveTraceGenerator } = require('@arction/xydata')

const Line = () => {

  // Create a XY Chart.

  useEffect(() => {
    let chart = lightningChart().ChartXY({
      container: 'chart',
      theme: Themes.darkGold,
    })


    // Create line series optimized for regular progressive X data.
    const series = chart.addLineSeries({
      dataPattern: {
        // pattern: 'ProgressiveX' => Each consecutive data point has increased X coordinate.
        pattern: 'ProgressiveX',
        // regularProgressiveStep: true => The X step between each consecutive data point is regular (for example, always `1.0`).
        regularProgressiveStep: true,
      },
    })

    // Generate traced points stream using 'xydata'-library.
    chart.setTitle('Generating test data...')
    createProgressiveTraceGenerator()
      .setNumberOfPoints(1 * 1000 * 1000)
      .generate()
      .toPromise()
      .then((data: string | any[]) => {
        chart.setTitle('1 Million Points Line Trace')
        const dataLen = data.length
        let dataPointsCount = 0
        const addPoints = () => {
          const addDataPointsCount = 20000
          const newDataPoints: any = data.slice(dataPointsCount, dataPointsCount + addDataPointsCount)
          series.add(newDataPoints)
          dataPointsCount += addDataPointsCount
          if (dataPointsCount < dataLen) {
            requestAnimationFrame(addPoints)
          }
        }
        addPoints()
      })
  }, [])


  return <div id='chart' className='chart' style={{ height: '500px' }}></div>
}

export default Line