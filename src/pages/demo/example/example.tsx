import { useEffect, useState } from 'react';
import Chart from './chart'

const Example = () => {
  const [data1, setData1] = useState([{}])
  const [data2, setData2] = useState([{}])

  // Example that simulates fetching remote data, and rendering it using a custom Chart component.
  useEffect(() => {
    const interval1 = setTimeout(() => {
      setData1([
        { x: 0, y: Math.random() * 100 },
        { x: 1, y: Math.random() * 100 },
        { x: 2, y: Math.random() * 100 },
        { x: 3, y: Math.random() * 100 },
        { x: 4, y: Math.random() * 100 },
      ])
    }, 3000)

    const interval2 = setTimeout(() => {
      setData2([
        { x: 0, y: Math.random() * 100 },
        { x: 1, y: Math.random() * 100 },
        { x: 2, y: Math.random() * 100 },
        { x: 3, y: Math.random() * 100 },
        { x: 4, y: Math.random() * 100 },
      ])
    }, 3000)

    return () => {
      clearInterval(interval1)
      clearInterval(interval2)
    }
  }, [])

  return <div className='fill'>
    <Chart id='chart-1' data={data1} />
    <Chart id='chart-2' data={data2} />
  </div>
}

export default Example