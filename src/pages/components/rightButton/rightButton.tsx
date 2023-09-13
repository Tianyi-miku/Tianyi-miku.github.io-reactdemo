import React from 'react'
import "./rightButton.less"
import { Badge } from 'antd';

type BadgeType = {
  title: string;
  count: number;
}

type PropType = {
  onclickFuntion: Function;
  badges?: Array<BadgeType>;
}

const RightButton = (prop: PropType) => {
  return (
    <div className="rightButton">
      {
        prop.badges?.map((item) => {
          return <div key={item.title} className='badgeContent'>
            <Badge count={item.count}>
              <div className='badgeTitle' onClick={() => prop.onclickFuntion(item.title)}>{item.title}</div>
            </Badge>
          </div>
        })
      }
    </div>
  )
}

export default RightButton