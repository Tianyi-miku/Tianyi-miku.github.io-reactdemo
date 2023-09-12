import { ClockCircleOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import React from 'react'

type PropType = {
  onclickFuntion: Function;
  title: string;
}

const RightButton = (prop: PropType) => {
  return (
    <Badge count={<ClockCircleOutlined />}>
      <span onClick={() => prop.onclickFuntion(prop.title)}>{prop.title}</span>
    </Badge>
  )
}

export default RightButton