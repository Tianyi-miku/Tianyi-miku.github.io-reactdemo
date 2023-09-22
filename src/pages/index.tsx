import React from "react";
import { Button } from "antd";
import Head from "@/components/layout/head/head";
import { Outlet } from "react-router-dom";
import Footer from "@/components/layout/footer/footer";
import withRouter, { WithRouterProps } from "@/hooks/withRouter";
import { useControlCtx, controlCtx, ControlCtx } from "./indexHoc";
import {
    FullscreenExitOutlined,
    FullscreenOutlined,
} from "@ant-design/icons";
import "./index.less";

const IndexApp = (props: WithRouterProps) => {

    const ctx: ControlCtx = useControlCtx();
    const { showFooter, footerHeight, outletFullScreen } = ctx.state;

    const [navActive, setNavActive] = React.useState<number>(0);

    // 主体内容全屏按钮图标
    const fullScreenIcon = outletFullScreen ? (
        <FullscreenExitOutlined />
    ) : (
        <FullscreenOutlined />
    );

    // 动态计算content高度
    const contentHeight = React.useMemo(() => {
        if (outletFullScreen) return "calc(100% - 72px)";
        return `calc(100% - ${showFooter ? footerHeight : 114}px)`;
    }, [outletFullScreen, showFooter, footerHeight]);

    // 切换主体内容是否全屏
    const checkedFullScreen = () => {
        ctx.dispatch.setTableFullScreen(!outletFullScreen);
    };

    return (
        <controlCtx.Provider value={ctx}>
            <div className="layout">
                {/* Head */}
                {!outletFullScreen && <Head showMenu></Head>}

                {/* nav */}
                {/* <div
                    className={
                        outletFullScreen ? "layout-nav layout-nav-fullScene" : "layout-nav"
                    }
                >
                    <Button icon={fullScreenIcon} onClick={checkedFullScreen}></Button>
                </div> */}

                {/* content */}
                <div
                    className={
                        outletFullScreen
                            ? "layout-content fullScene-content"
                            : "layout-content"
                    }
                    style={{ height: contentHeight }}
                >
                    <Outlet />
                </div>
                {/* footer */}
                {showFooter && !outletFullScreen && <Footer></Footer>}
            </div>
        </controlCtx.Provider>
    );
};

export default withRouter<WithRouterProps>(IndexApp);
