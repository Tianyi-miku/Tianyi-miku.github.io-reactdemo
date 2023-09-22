import BaiduMap from '@/components/BaiduMap/BaiduMap'
import React, { useEffect, useState } from 'react'
import "./routine.less"
import Pannel from '../components/pannel/pannel'
import { BoxChildren } from '../home/home'
import RightButton from '../components/rightButton/rightButton'
import Icon from '@/components/Icon/Icon'
import BasicInformation from '../components/basicInformation/basicInformation'
import { useNavigate } from 'react-router-dom'
import { useDidMount } from '@/hooks/period'

const Routine = () => {

  const [station, setstation] = useState([])
  const navigate = useNavigate()
  const [pannelData, setpannelData] = useState(Object)  //站点信息
  const [rightbadges, setrightbadges] = useState(Object) //右侧按钮是哪一个
  const [markshow, setMarkshow] = useState(false) //mark 展示还是不展示
  //右侧按钮
  const [badges, setBadges] = useState([{
    title: '站点信息',
    count: 5
  }, {
    title: "功能面板",
    count: 3
  }])
  const [isShowRinghtBox, setisShowRinghtBox] = useState(false)  //右边的信息是否展示
  const didMount = useDidMount();
  const [oneStation, setoneStation] = useState(Object)


  useEffect(() => {
    if (didMount) {

    }
    return () => {
    }
  }, [didMount])


  const setRight = (item: any) => {
    if (isShowRinghtBox && item.title === rightbadges.title) {
      setisShowRinghtBox(false);
      return
    } else {
      setrightbadges(item)
      setisShowRinghtBox(true);
    }
  }


  const openButton = (data: any) => {
    setpannelData(data);
    setrightbadges(badges[0]);
    setisShowRinghtBox(true)
    //是否打开mark
    setMarkshow(true)
  }

  const closeButton = () => {
    setisShowRinghtBox(false);
  }

  const openUrl = (value: any) => {
    navigate('/singleFrequency', {
      state: {
        value: value,
        station: oneStation
      }
    })
  }
  const goMore = () => {
    navigate('/deviceDetails')
  }


  return (
    <div className='routine'>

      <div className="home-state">
        <Pannel
          title={'站点列表'}
          className="state-equ"
        >
          {station?.length > 0 && station.map((item: any) => {
            return (
              <div className="state-equ-info" key={item.id} onClick={() => openButton(item)}>
                <div className="equ-info">
                  <span className="info-label">名称:</span>
                  <span className="info-value">{item.name}</span>
                  <div className='info_icon'>
                    <Icon
                      size={16}
                      icon={item.enabled ? "start1" : "stop"}
                      style={{ margin: "6px" }}
                      color={item.enabled ? "#55c649" : "#f1343a"}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </Pannel>
      </div>
      <div className="centerBox mapBox">
        <BaiduMap
          station={station}
          center={pannelData.position}
          onclickMarkOpen={openButton}
          onclickMarkClose={closeButton}
          markshow={markshow}
          setMarkshow={setMarkshow}
          info={pannelData}></BaiduMap>
      </div>
      {isShowRinghtBox &&
        <div className="rightBox">
          <Pannel title={rightbadges?.title}>
            {rightbadges?.title === '站点信息' && <>
              <div className="baseInfo">
                <div className="base">基本信息</div>
                <div className="base_more" onClick={() => goMore()}>更多</div>
              </div>
              <BasicInformation pannelData={pannelData}></BasicInformation>
              <div className="baseInfo">
                <div className="base">环境信息</div>
                <div className="base_more">更多</div>
              </div>
              <div className="warninfo">
                <div className="temperature">温度</div>
                <div className="humidness">湿度</div>
              </div>
              <div className="monitoring">

              </div>
            </>}
            {rightbadges?.title === '功能面板' &&
              <>
                {oneStation.modules?.length > 0 && oneStation.modules?.map((item: any) => {
                  return <React.Fragment key={item.id}>
                    <div className="baseInfo" key={item.id}>
                      <div className="base">
                        {item.displayName}
                      </div>
                      <div className="base_more" onClick={() => openUrl(item)}>打开</div>
                    </div>
                  </React.Fragment>
                })}
                {/* <div className="baseInfo">
                  <div className="base">常规功能</div>
                </div>
                <div className="baseInfo">
                  <div className="base">高级功能</div>
                </div> */}
              </>}
          </Pannel>
        </div >
      }
      {isShowRinghtBox && <RightButton badges={badges} onclickFuntion={setRight}></RightButton>}
    </div >
  )
}

export default Routine