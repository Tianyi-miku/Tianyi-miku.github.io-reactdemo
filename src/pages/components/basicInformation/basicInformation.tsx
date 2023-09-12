import React from 'react'
type baseProp = { //基本信息UI组件

}

const BasicInformation = (prop: baseProp) => {
  return (
    <div>
      <div>名称</div>
      <div>类型</div>
      <div>监测范围</div>
      <div>测向范围</div>
      <div>站点位置</div>
      <div>海拔</div>
      <div>承建单位</div>
      <div>建设时间</div>
    </div>
  )
}

export default BasicInformation