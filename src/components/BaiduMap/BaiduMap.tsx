import React, { useState } from 'react'
import { Map, Marker, InfoWindow, ZoomControl, DrawingManager, MapvglLayer, MapvglView, mapvgl } from 'react-bmapgl';
import { styleJson } from "./mapStyleJson";
import { IMarker } from '@/pages/home/home';
import "./BaiduMap.less"

type MapProp = {
  station?: Array<IMarker>; //所有点标注
  onclickMap?: Function; //单击地图方法
  ZoomControl?: boolean; //放大缩小按钮
  DrawingManager?: boolean; //工具栏
  showHeatmap?: boolean; //热力图
  heatmapList?: Array<MapVGL.GeoJSON>; //热力图数组，不传默认marker position
  onclickMarkOpen?: Function //单击标注打开右侧按钮
  onclickMarkClose?: Function //关闭右侧按钮
  center?: any //中心点
  markshow?: boolean //是否打开mark
  setMarkshow?: Function
  info?: any
}


export default function BaiduMap(prop: MapProp) {

  const [heatmapGeoJSON, setHeatmapGeoJSON] = useState([])


  const defaultStyle = {
    styleJson: styleJson
  }
  const point = prop.center || new BMapGL.Point(104.07, 30.653739) || ''
  const zoom = 11

  if (prop.showHeatmap && !prop.heatmapList) {
    if (prop.station) {
      const data: any = prop.station.map((item: IMarker) => {
        //默认
        return {
          geometry: {
            type: 'Point',
            coordinates: item.position
          },
          properties: {
            color: item.color || 'rgba(255, 255, 50, 0.5)',
            count: item.count || 90
          }
        }
      })
      setHeatmapGeoJSON(data)
    }
  }

  const onclickMap = () => {
    return console.log('点击了地图!');
  }

  const InfoWindowText = `<div class="infowindow">
    暂无内容
  </div>`

  const open = (value: any) => {
    prop.setMarkshow ? prop.setMarkshow(true) : console.log('打开mark');
    // 赋值！
    // prop.onclickMark(value)
    prop.onclickMarkOpen ? prop.onclickMarkOpen(value, prop.markshow) : console.log('这里传值和方法！');
  }

  const close = () => {
    prop.setMarkshow ? prop.setMarkshow(false) : console.log('关闭mark');
    prop.onclickMarkClose ? prop.onclickMarkClose() : console.log('没有方法执行');
  }

  return (
    //@ts-expect-error
    <Map mapStyleV2={defaultStyle} style={{ height: '100%' }} center={point} zoom={zoom} enableScrollWheelZoom={true} onClick={() => prop?.onclickMap || onclickMap}>
      {/* @ts-expect-error */}
      {prop.ZoomControl && <ZoomControl />}
      {/* @ts-expect-error */}
      {prop.ZoomControl && <DrawingManager
        enableLimit
        enableCalculate
        onOverlaycomplete={(e, info) => { console.log(e, info) }}
        style={{ position: 'absolute', right: '20px', bottom: '80px', width: 360 }}
      />}
      {prop.station?.map((item: any) => {
        //@ts-expect-error
        return <Marker key={item.id} position={item.position} icon={item.icon} onClick={() => open(item)} />
      })}
      {/* @ts-expect-error */}
      {prop.markshow && <InfoWindow
        position={prop.info?.position || point}
        text={prop.info?.address  || InfoWindowText}
        title={prop.info?.name || '标题'}
        onClickclose={close}
        onClose={close}
      >
      </InfoWindow>}
      {/* @ts-expect-error */}
      {prop.showHeatmap && <MapvglView effects={['bright']}>
        {/* @ts-expect-error */}
        <MapvglLayer
          type="PointLayer"
          data={prop.heatmapList || heatmapGeoJSON}
          options={{
            blend: 'lighter',
            size: 120,
            color: 'rgb(255, 53, 0, 0.6)'
          }}
        />
      </MapvglView>}

    </Map >
  )
}
