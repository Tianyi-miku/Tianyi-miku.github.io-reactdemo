import React from 'react'
import "./basicInformation.less"
import { Col, Row } from 'antd/lib'
type baseProp = { //基本信息UI组件

}

const BasicInformation = (prop: baseProp) => {
  return (
    <div>
      <Row>
        <Col span={12}>
          <div className='baseItem'>
            <div className='left'>名称</div>
            <div className='right'>1233</div>
          </div>
        </Col>
        <Col span={12}>
          <div className='baseItem'>
            <div className='left'>类型</div>
            <div className='right'>1233</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div className='baseItem'>
            <div className='left'>
              监测范围
            </div>
            <div className='right'>1233</div>
          </div>
        </Col>
        <Col span={12}>
          <div className='baseItem'>
            <div className='left'>
              测向范围
            </div>
            <div className='right'>1233</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div className='baseItem'>
            <div className='left'>站点位置</div>
            <div className='right'>1233</div>
          </div>
        </Col>
        <Col span={12}>
          <div className='baseItem'>
            <div className='left'>海拔</div>
            <div className='right'>1233</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div className='baseItem'>
            <div className='left'>承建单位</div>
            <div className='right'>1233</div>
          </div>
        </Col>
        <Col span={12}>
          <div className='baseItem'>
            <div className='left'>建设时间</div>
            <div className='right'>1233</div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default BasicInformation