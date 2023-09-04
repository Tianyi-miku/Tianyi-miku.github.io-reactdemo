import React, { useRef, useState } from "react";
// import Map from "../scenes/components/Map/Map";
import { Button } from "antd";
import "./home.less";
import Icon from "@/components/Icon/Icon";
import BaiduMap from "@/components/BaiduMap/BaiduMap";

const Home = () => {
    return (
        <div className="home-xian">
            <div className="centerBox mapBox">
                <BaiduMap></BaiduMap>
            </div>
        </div>
    );
};

export default Home;
