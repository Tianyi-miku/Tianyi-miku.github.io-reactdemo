/*
 * @Description:文件预览组件
  插件文档地址：https://react-photo-view.vercel.app/docs/api
 * @Author: zhangyuru
 * @Date: 2023-03-16 11:52:39
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-07-03 14:22:24
 * @FilePath: \05-simulation_training_React\src\components\ViewImg\ViewImg.tsx
 */
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { checkImgPrefix } from "@/utils/utils";

export type ViewImgProps = {
    src: string;
    alt?: string;
    hidePreview?: boolean; // 是否 隐藏 点击预览功能 默认false
    style?: React.CSSProperties;
    className?: string;
};

const ViewImg = (props: ViewImgProps) => {
    const Img = (className?: string) => {
        return (
            <img
                className={className || ""}
                style={props.style || {}}
                src={checkImgPrefix(props.src)}
                alt={props?.alt || ""}
            />
        );
    };

    return (
        <>
            {!props?.hidePreview && (
                <PhotoProvider className={props?.className}>
                    <PhotoView src={checkImgPrefix(props.src)}>{Img()}</PhotoView>
                </PhotoProvider>
            )}
            {props?.hidePreview && Img(props?.className)}
        </>
    );
};

export default ViewImg;
