import React from 'react'
import Pannel from '../components/pannel/pannel'
import "./deviceDetails.less"
import BasicInformation from '../components/basicInformation/basicInformation'
import IReactflow from './components/reactflow'

export default function deviceDetails() {
  return (
    <div className='deviceDetails'>
      <div className="home-state">
        <Pannel
          title={'站点信息'}
          className="state-equ"
        >
          <BasicInformation></BasicInformation>
        </Pannel>
      </div>
      <div className='flow'>
        <div className='flow_content'>
          <IReactflow></IReactflow>
        </div>
        <div className="right-state">
          <Pannel
            title={'站点信息'}
            className="state-equ"
          >
            <BasicInformation></BasicInformation>
          </Pannel>
        </div>
      </div>

    </div>
  )
}
