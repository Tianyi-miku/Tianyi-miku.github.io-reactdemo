import BaiduMap from '@/components/BaiduMap/BaiduMap'
import React from 'react'
import "./routine.less"
import Pannel from '../components/pannel/pannel'

export default function routine() {
  return (
    <div className='routine'>
      <div className="home-state">
        <Pannel
          title={'站点列表'}
          // titleBgImg={titleBg}
          className="state-equ"
        >
        </Pannel>
      </div>
      <div className="centerBox mapBox">
        <BaiduMap></BaiduMap>
      </div>
    </div>
  )
}
