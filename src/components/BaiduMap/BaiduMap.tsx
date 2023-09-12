import React, { useState } from 'react'
import { Map, Marker, InfoWindow, ZoomControl, DrawingManager, MapvglLayer, MapvglView } from 'react-bmapgl';
import { styleJson } from "./mapStyleJson";

type MapProp = {
  marker?: any; //标注
  showMark?: boolean;
  onclickMap?: Function; //单击地图方法
  onclickMarker?: Function; //单击标注
  InfoWindow?: any; //信息窗口
  ZoomControl?: boolean; //放大缩小按钮
  DrawingManager?: boolean; //工具栏
  showHeatmap?: boolean; //热力图
  heatmapList?: Array<MapVGL.GeoJSON>; //热力图数组，不传默认marker position
}

export default function BaiduMap(prop: MapProp) {

  const [heatmapGeoJSON, setHeatmapGeoJSON] = useState([])
  const defaultStyle = {
    styleJson: styleJson
  }
  const point = new BMapGL.Point(104.07, 30.653739)
  const zoom = 11



  if (prop.showHeatmap && !prop.heatmapList) {
    if (prop.marker) {
      const data = prop.marker.map((item: any) => {
        //默认
        return {
          geometry: {
            type: 'Point',
            coordinates: [item.lon, item.lat]
          },
          properties: {
            color: 'rgba(255, 255, 50, 0.5)',
            count: 90
          }
        }
      })
      setHeatmapGeoJSON(data)
    }
  }

  const onclickMap = () => {
    return console.log('点击了地图!');
  }

  const onclickMarker = () => {
    return console.log('点击了地图标注!');
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
      {prop.showMark && prop.marker.map((item: any) => {
        //@ts-expect-error
        return <Marker key={item.id} position={item.position} icon={item.icon} enableDragging={true} onClick={() => prop?.onclickMarker(item) || onclickMarker} />
      })}
      {/* @ts-expect-error */}
      {prop.InfoWindow?.position && <InfoWindow onOpen={prop.InfoWindow?.onOpen} position={prop.InfoWindow?.position || point}></InfoWindow>}
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
