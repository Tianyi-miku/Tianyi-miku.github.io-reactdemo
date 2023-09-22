import BaiduMap from '@/components/BaiduMap/BaiduMap'
import React from 'react'
import Pannel from '../components/pannel/pannel'
import BasicInformation from '../components/basicInformation/basicInformation'
import { useNavigate } from 'react-router'
import "./coverageRate.less"
import { Button } from 'antd'
import Icon from '@/components/Icon/Icon'

const CoverageRate = () => {

  const navigate = useNavigate()

  const goMore = () => {
    navigate('/deviceDetails')
  }

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
          title={'覆盖率'}
          className="state-equ"
        >
          <div className="task">
            <div className="task-info">
              <span className="info-label">业务:</span>
              <span className="info-value">40-60</span>
            </div>
            <div className="task-info">
              <span className="info-label">自定义:</span>
              <span className="info-value">50-55</span>
            </div>
            <div className="task-info">
              <span className="info-label">功率:</span>
              <span className="info-value">40-45</span>
            </div>
          </div>

          <div className="baseInfo">
            <div className="base">历史记录</div>
            <div className="base_more" onClick={() => goMore()}>更多</div>
          </div>
          <div className='history'>

          </div>
          <Button className="analyze">
            <Icon
              icon="add-task"
              color="#33d0f1"
              style={{ marginRight: "6px" }}
            />
            分析
          </Button>
        </Pannel>
      </div>
      <div className="centerBox mapBox">
        <BaiduMap showHeatmap={true} heatmapList={heatmapList}></BaiduMap>
      </div>
    </div>
  )
}

export default CoverageRate