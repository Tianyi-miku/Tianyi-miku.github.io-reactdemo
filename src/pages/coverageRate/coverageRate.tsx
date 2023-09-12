import BaiduMap from '@/components/BaiduMap/BaiduMap'
import React from 'react'
import Pannel from '../components/pannel/pannel'

export default function coverageRate() {
  const pointList = [
    { lng: 104.07, lat: 30.291358, count: 110 },
    { lng: 103.53063, lat: 30.281342, count: 280 },
    { lng: 103.531493, lat: 30.27278, count: 150 },
    { lng: 103.533388, lat: 30.289686, count: 90 },
    { lng: 103.537341, lat: 30.240986, count: 80 },
    { lng: 103.554157, lat: 30.242994, count: 200 },
    { lng: 103.56005, lat: 30.244599, count: 250 },
    { lng: 103.590664, lat: 30.255036, count: 70 },

  ]

  const heatmapList: MapVGL.GeoJSON[] = pointList.map(item => {
    return {
      geometry: {
        type: 'Point',
        coordinates: [item.lng, item.lat]
      },
      properties: {
        color: 'rgba(255, 255, 50, 0.5)',
        count: item.count
      }
    }
  })
  return (
    <div className='routine'>
      <div className="home-state">
        <Pannel
          title={'监测覆盖率'}
          // titleBgImg={titleBg}
          className="state-equ"
        >
        </Pannel>
      </div>
      <div className="centerBox mapBox">
        <BaiduMap showHeatmap={true} heatmapList={heatmapList}></BaiduMap>
      </div>
    </div>
  )
}
