import { PhotoProvider, PhotoView } from "react-photo-view"
import "react-photo-view/dist/react-photo-view.css"
import { checkImgPrefix } from "../../utils/utils"
import { useMemo } from "react"

export type ViewImgProps = {
    src: string
    alt?: string
    hidePreview?: boolean // 是否 隐藏 点击预览功能 默认false
    style?: React.CSSProperties
    className?: string
}

const ViewImg = (props: ViewImgProps) => {
    const className = useMemo(() => {
        return props?.className || ""
    }, [props?.className])

    return (
       <>
        {!props?.hidePreview && (
            <PhotoProvider className={className}>
                <PhotoView src={checkImgPrefix(props.src)}>
                    <img style={props.style || {}} src={checkImgPrefix(props.src)} alt={props?.alt || ""} />
                </PhotoView>
            </PhotoProvider>
        )}
        {props?.hidePreview && (
            <img
                className={className}
                style={props?.style || {}}
                src={checkImgPrefix(props.src)}
                alt={props?.alt || ""}
            />
        )}
       </>
    )
}

export default ViewImg
