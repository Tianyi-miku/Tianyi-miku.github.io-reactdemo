import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import Map from "../scenes/components/Map/Map";
import "./home.less";
import BaiduMap from "@/components/BaiduMap/BaiduMap";
import { useDidMount } from "@/hooks/period";
import Pannel from "../components/pannel/pannel";
import titleBg from "@/assets/images/home/scene-title.png";
import RightButton from "../components/rightButton/rightButton";
import Pie from "@/components/echarts/pie/pie";
import BasicInformation from "../components/basicInformation/basicInformation";
import { useNavigate } from "react-router-dom";
import { Col, Empty, Row, Tooltip, Button, Skeleton, Space, Input } from "antd";
import MeDialog from "@/components/MeDialog/MeDialog";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/store";
import { setStations } from "@/store/modules/station";
import czzIconOn from '@/assets/images/map/czz-online.svg';


export type BoxChildren = {
    title: string;
    children: any
}

export type IMarker = {
    addEventListener(arg0: string, arg1: (e: any) => void): unknown;
    position: any, //坐标
    color: any,//颜色
    count: number,//大小
}

type Task = {
    title: string; //标题
}

const Home = () => {
    const didMount = useDidMount();
    const navigate = useNavigate()

    const [pannelData, setpannelData] = useState(Object)  //站点信息
    const [rightbadges, setrightbadges] = useState(Object) //右侧按钮是哪一个
    const [markshow, setMarkshow] = useState(false) //mark 展示还是不展示
    //右侧按钮
    const [badges, setBadges] = useState([{
        title: '站点信息',
        count: 5
    }, {
        title: "告警信息",
        count: 3
    }])
    const [isShowRinghtBox, setisShowRinghtBox] = useState(false)  //右边的信息是否展示

    // const station = useSelector((state: Store) => state.station).stations 
    const siteIcon = useMemo(() => {
        return new BMapGL.Icon(czzIconOn, new BMapGL.Size(36, 35), {
            imageSize: new BMapGL.Size(36, 35)
        })
    }, [])
    const station = useMemo(() => {
        return [
            {
                id: '001',
                position: { lng: 113.284335, lat: 23.18829 },
                icon: siteIcon
            },
            {
                id: '002', position: { lng: 114.283149, lat: 25.1881565 },
                icon: siteIcon
            }
        ]
    }, [siteIcon])


    useEffect(() => {
        setpannelData(station[0])
        return () => {
        }
    }, [station])



    const dispatch = useDispatch()

    //警告信息
    const [forewarning, setForewarning] = useState([
        { title: 'xxx站发现xxxxxxxx' },
        { title: 'xxx站发现xxxxxxxx' }
    ])

    //预警信息
    const [environmentwarning, setEnvironmentwarning] = useState([
        { title: 'xxx 漫水预警' },
        { title: 'xxx 漫水预警' }
    ])

    //任务统计弹窗
    const [visiable, setVisiable] = useState(false)
    const [task, setTask] = useState({} as Task)

    useEffect(() => {
        if (didMount) {

        }
        return () => {
        }
    }, [didMount, dispatch])

    const setRight = (item: any) => {
        if (isShowRinghtBox && item.title === rightbadges.title) {
            setisShowRinghtBox(false);
            return
        } else {
            if (item.title === "告警信息") {
            }
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
        setisShowRinghtBox(false)
    }


    const dataList = [
        { value: 1048, name: '闲时任务' },
        { value: 735, name: '计划任务' },
        { value: 580, name: '即时任务' },
    ]

    const goMore = () => {
        navigate('/deviceDetails')
    }

    const legendselet = (value: string) => {
        task.title = value
        setVisiable(true)
    }

    const { Search } = Input;

    const onSearch = () => {
        //过滤之后setMarker
    }

    const GroupItems = [{
        id: '001', position: { lng: 113.284335, lat: 23.18829 },
        category: { key: 'Team', value: '开幕式保障小组' }, state: { key: 'Online', value: '在线' },
        info: {
            groupLeader: '张某', member: ['李某', '王某'], task: '开幕式场馆用频保障任务',
            equipment: ['手持式无线电监测设备', '快速部署式无线电监测设备']
        }
    }]

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
                    <Pie dataList={dataList} legendselet={legendselet}></Pie>
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
                <BaiduMap station={station} onclickMarkOpen={openButton} onclickMarkClose={closeButton}
                    center={pannelData.position}
                    markshow={markshow}
                    setMarkshow={setMarkshow}
                    info={pannelData}></BaiduMap>
            </div>
            <div className="searchInput">
                <Search
                    size="large"
                    onSearch={onSearch}
                    enterButton
                ></Search>
            </div>
            {isShowRinghtBox && <RightButton badges={badges} onclickFuntion={setRight}></RightButton>}

            {isShowRinghtBox &&
                <div className="rightBox">
                    <Pannel title={rightbadges?.title}>
                        {rightbadges?.title === '站点信息' &&
                            <>
                                <div className="baseInfo">
                                    <div className="base">基本信息</div>
                                    <div className="base_more" onClick={() => goMore()}>更多</div>
                                </div>
                                <BasicInformation></BasicInformation>
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
                            </>
                        }
                        {rightbadges?.title === '告警信息' && <>
                            <div className="baseInfo">
                                <div className="base">预警（3）</div>
                                <div className="base_more">更多</div>
                            </div>
                            <div className="forewarning">
                                {forewarning?.map((item, index) => {
                                    return <Row className="warning_item" key={index}>
                                        <Col span={12}>
                                            <Tooltip title={item.title} placement='topLeft'>
                                                <span className="forewarning_Text"> {item.title}</span>
                                            </Tooltip>
                                        </Col>
                                        <Col span={12}>
                                            <div className="forewarning_Button">
                                                <Button className="buttonClass" size="small">分析</Button>
                                                <Button className="buttonClass" size="small">定位</Button>
                                                <Button className="buttonClass" size="small">详情</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                })}
                                {forewarning?.length === 0 && <Empty></Empty>}
                            </div>
                            <div className="baseInfo">
                                <div className="base">环境预警（4）</div>
                                <div className="base_more">更多</div>
                            </div>
                            <div className="forewarning">
                                {environmentwarning?.map((item, index) => {
                                    return <Row className="warning_item" key={index}>
                                        <Col span={16}>
                                            <Tooltip title={item.title} placement='left'>
                                                <span className="forewarning_Text"> {item.title}</span>
                                            </Tooltip>
                                        </Col>
                                        <Col span={8} className="forewarning_Button">
                                            <Button className="buttonClass" size="small">消警</Button>
                                            <Button className="buttonClass" size="small">详情</Button>
                                        </Col>
                                    </Row>
                                })}
                                {environmentwarning?.length === 0 && <Empty></Empty>}
                            </div>
                        </>}
                    </Pannel>
                </div>
            }

            <MeDialog
                visiable={visiable}
                title={task.title + '列表'}
                showFooter
                Cancel={() => setVisiable(false)}
                showok={true}
            >
                {task.title + '列表'}
            </MeDialog>
        </div>
    );
};

export default Home;
