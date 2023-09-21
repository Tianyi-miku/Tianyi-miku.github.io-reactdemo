import React from 'react'
import "./basicInformation.less"
import { Col, Row } from 'antd/lib'
type baseProp = { //基本信息UI组件
  pannelData?: any //基本信息
}

const BasicInformation = (prop: baseProp) => {
  return (
    <div>
      <Row>
        <Col span={12}>
          <div className='baseItem'>
            <div className='left'>名称</div>
            <div className='right'>{prop.pannelData?.name}</div>
          </div>
        </Col>
        <Col span={12}>
          <div className='baseItem'>
            <div className='left'>类型</div>
            <div className='right'>{prop.pannelData?.type}</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div className='baseItem'>
            <div className='left'>
              监测范围
            </div>
            <div className='right'>{prop.pannelData?.category}</div>
          </div>
        </Col>
        <Col span={12}>
          <div className='baseItem'>
            <div className='left'>
              测向范围
            </div>
            <div className='right'>{prop.pannelData?.direction}</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div className='baseItem'>
            <div className='left'>经度</div>
            <div className='right'>{prop.pannelData?.latitude} </div>
          </div>
        </Col>
        <Col span={12}>
          <div className='baseItem'>
            <div className='left'>纬度</div>
            <div className='right'>{prop.pannelData?.longitude}</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div className='baseItem'>
            <div className='left'>高度</div>
            <div className='right'>{prop.pannelData?.altitude}</div>
          </div>
        </Col>
        <Col span={12}>
          <div className='baseItem'>
            <div className='left'>高度</div>
            <div className='right'>{prop.pannelData?.altitude}</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className='baseItem'>
            <div className='left'>地址</div>
            <div className='right'>{prop.pannelData?.address}</div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default BasicInformation