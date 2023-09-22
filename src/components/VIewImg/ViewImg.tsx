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
