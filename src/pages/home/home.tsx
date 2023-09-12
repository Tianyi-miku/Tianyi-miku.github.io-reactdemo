import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import Map from "../scenes/components/Map/Map";
import "./home.less";
import BaiduMap from "@/components/BaiduMap/BaiduMap";
import { useGetstations } from "@/api/home/home";
import { useDidMount } from "@/hooks/period";
import Pannel from "../components/pannel/pannel";
import titleBg from "@/assets/images/home/scene-title.png";
import RightButton from "../components/rightButton/rightButton";
import Pie from "@/components/echarts/pie/pie";

type BoxChildren = {
    title: string;
    children: any
}

type IMarker = {
    position: any, //坐标
}
const Home = () => {
    const [getList] = useGetstations()
    const [station, seStation] = useState([])
    const didMount = useDidMount();

    const [isShowRinghtBox, setisShowRinghtBox] = useState(false)  //右边的信息是否展示
    const [pannelData, setpannelData] = useState({} as BoxChildren)
    const [Marker, setMarker] = useState({} as IMarker) //当前选中的标注！
    const [showMark, setshowMark] = useState(false)


    useEffect(() => {
        if (didMount) {
            getList('', (resData: Array<any>) => {
                if (resData && resData.length > 0) {
                    resData.forEach((item: any, key: number) => {
                        item.position = new BMapGL.Point(item.longitude + key, item.latitude)
                        item.icon = `blue${key + 1}`           //图标
                    })
                    seStation(resData as any)
                }
            },
            )
        }
        return () => {
        }
    }, [getList, didMount])

    const setRight = (name: string) => {
        if (pannelData?.title === name && isShowRinghtBox) {
            setisShowRinghtBox(false);
            return
        } else {
            setisShowRinghtBox(true);
        }
        setpannelData({
            ...pannelData,
            title: name
        })
    }


    //单击标注
    const onclickMarker = (item: any) => {
        setshowMark(true)
        setMarker(item)
    }

    let InfoWindow = React.useRef({})

    useMemo(() => {
        // if (Marker.position && showMark) {
        InfoWindow.current = () => {
            if (Marker.position && showMark) {
                return {
                    text: '这是一个窗口',
                    position: Marker.position,
                    onOpen: () => { }, //打开窗口回调
                    onClose: () => { },//关闭窗口回调
                }
            }
        }
        // }
        return () => {
        }
    }, [Marker.position, showMark])

    const dataList = [{ value: 1048, name: '信号1' },
    { value: 735, name: '信号2' },
    { value: 580, name: '信号3' },
    { value: 484, name: '信号4' },
    { value: 300, name: '信号5' }]




    return (
        <div className="home">
            <div className="home-state">
                <Pannel
                    title={'设施统计'}
                    titleBgImg={titleBg}
                    className="state-equ"
                >
                    <div className="realtime">
                        <div className="realtime-info">
                            <div className="infoLabel">总数</div>
                            <div className="info-value">44 台</div>
                        </div>
                        <div className="realtime-info">
                            <div className="infoLabel">运行</div>
                            <div className="info-value">33 台</div>
                        </div>
                        <div className="realtime-info">
                            <div className="infoLabel">空闲</div>
                            <div className="info-value">11 台</div>
                        </div>
                    </div>
                </Pannel>
                <Pannel
                    title={'任务统计'}
                    titleBgImg={titleBg}
                    className="state-echarts"
                >
                    <Pie dataList={dataList}></Pie>
                </Pannel>
                <Pannel
                    title={'数据统计'}
                    titleBgImg={titleBg}
                    className="state-equ"
                >
                    <div className="task">
                        <div className="task-info">
                            <span className="info-label">数据总量:</span>
                            <span className="info-value">40</span>
                        </div>
                        <div className="task-info">
                            <span className="info-label">数据分享:</span>
                            <span className="info-value">50</span>
                        </div>
                        <div className="task-info">
                            <span className="info-label">发现信号:</span>
                            <span className="info-value">40</span>
                        </div>
                        <div className="task-info">
                            <span className="info-label">完成定位:</span>
                            <span className="info-value">30</span>
                        </div>
                    </div>
                </Pannel>
            </div>
            <div className="centerBox mapBox">
                <BaiduMap marker={station} onclickMarker={onclickMarker} InfoWindow={InfoWindow} showMark={showMark}></BaiduMap>
            </div>
            <div className="rightButton">
                <RightButton title="站点信息" onclickFuntion={() => setRight('站点信息')}></RightButton>
                <RightButton title="告警信息" onclickFuntion={() => setRight('告警信息')}></RightButton>
            </div>
            {isShowRinghtBox &&
                <div className="rightBox">
                    <Pannel title={pannelData?.title}>

                    </Pannel>
                </div>
            }

        </div>
    );
};

export default Home;
