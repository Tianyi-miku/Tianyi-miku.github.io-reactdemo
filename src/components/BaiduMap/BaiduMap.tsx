import React, { useState } from 'react'
import { Map, Marker, InfoWindow, ZoomControl, DrawingManager, MapvglLayer, MapvglView } from 'react-bmapgl';
import { styleJson } from "./mapStyleJson";
import { IMarker } from '@/pages/home/home';
import "./BaiduMap.less"

type MapProp = {
  station?: Array<IMarker>; //所有点标注
  showInfoWindow?: boolean; //是否展示标注的信息 info
  IsetShowInfoWindow?: Function;
  onclickMap?: Function; //单击地图方法
  ZoomControl?: boolean; //放大缩小按钮
  DrawingManager?: boolean; //工具栏
  showHeatmap?: boolean; //热力图
  heatmapList?: Array<MapVGL.GeoJSON>; //热力图数组，不传默认marker position
}

type Info = {
  position: any;
  text: string;
  title: string;
}

export default function BaiduMap(prop: MapProp) {

  const [heatmapGeoJSON, setHeatmapGeoJSON] = useState([])
  const [info, setInfo] = useState({} as Info)
  const [show, setShow] = useState(false)

  const defaultStyle = {
    styleJson: styleJson
  }
  const point = new BMapGL.Point(104.07, 30.653739)
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
    setInfo({
      position: value.position,
      text: '1',
      title: '2'
    })
    setShow(true)
  }

  const close = () => {
    setShow(false)
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
      {prop.showInfoWindow && show && <InfoWindow
        position={info?.position || point}
        text={info?.text || InfoWindowText}
        title={info?.text || '标题'}
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
