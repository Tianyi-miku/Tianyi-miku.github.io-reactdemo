import React from 'react'
import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmapgl';
import { styleJson } from "./mapStyleJson";

export default function BaiduMap() {

  const defaultStyle = {
    styleJson: styleJson
  }
  const point = {
    lng: 116.402544, lat: 39.928216
  }
  const zoom = 11
  const enableScrollWheelZoom = true //滚轮缩放

  return (
    <Map mapStyleV2={defaultStyle} style={{ height: '100%' }} center={point} zoom={zoom} enableScrollWheelZoom={enableScrollWheelZoom}></Map>
  )
}
