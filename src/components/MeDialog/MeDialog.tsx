import React, { memo } from "react";
import { Button } from "antd";
import { propsType } from "./MeDialogType";
import "./MeDialog.less";

const MeDialog = memo((props: propsType) => {
  const { width, diaHeight, fullScrene, showFooter } = props;
  const boxWidth = {
    width: width ? width : fullScrene ? "100%" : "500px",
  };
  const fullScreneHeight = showFooter
    ? "calc(100vh - 175px)"
    : "calc(100vh - 135px)";
  const boxHeight = {
    height: diaHeight ? diaHeight : fullScrene ? fullScreneHeight : "auto",
  };

  return (
    <>
      {props.visiable && (
        <div className={`medialog-box ${props?.className}`}>
          <div
            style={boxWidth}
            className={`medialog-content ${
              props.visiable
                ? "animate__animated animate__fadeInDown"
                : "animate__animated animate__fadeOutDowm"
            }`}
          >
            <div className="medialog-content-top">
              <div className="top1"></div>
              <div className="top2"></div>
              <div className="top3"></div>
              <div className="top4"></div>
              <div className="top5"></div>
            </div>
            <div className="medialog-content-middle">
              <div className="middle1">
                <div className="middle1-1"></div>
                <div className="middle1-2"></div>
                <div className="middle1-3"></div>
              </div>
              {/* 内容 */}
              <div className="middle2 middle-content">
                <header className="title">
                  {props.title ? props.title : "你没传标题"}
                </header>
                <main className="dialog-content">
                  <div className="content" style={boxHeight}>
                    {props?.children || "你没传内容"}
                  </div>
                </main>

                {props?.showFooter ? (
                  <div style={{ margin: props?.footerMargin || "40px 0 0 0" }}>
                    <footer>
                      {!props?.footerSlot ? (
                        <div>
                          {/* 实现取消的逻辑 */}
                          {props.showCancel ? (
                            props.showCancel
                          ) : (
                            <Button key="cancel" onClick={props?.Cancel}>
                              {props.cancelText ? props.cancelText : "取消"}
                            </Button>
                          )}
                          {/* 实现确定的逻辑 */}
                          {props.showok ? (
                            props.showok
                          ) : (
                            <Button key="ok" onClick={props?.Ok} type="primary">
                              {props.okText ? props.okText : "确定"}
                            </Button>
                          )}
                        </div>
                      ) : (
                        props.footerSlot // 底部自定义插槽
                      )}
                    </footer>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="middle3">
                <div className="middle3-1"></div>
                <div className="middle3-2"></div>
                <div className="middle3-3"></div>
              </div>
            </div>
            <div className="medialog-content-bottom">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
export default MeDialog;
