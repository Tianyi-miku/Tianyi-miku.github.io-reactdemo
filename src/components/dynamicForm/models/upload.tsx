import React, { useMemo, useContext, useState } from "react";
import {
  PlusOutlined,
  UploadOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Input, UploadProps } from "antd";
import { Upload, Button } from "antd";
import { checkImgPrefix, generalNotification } from "@/utils/utils";
import { Uploads } from "../dynamicFormType";
import config from "@/config";
import urls from "@/api/urls";
import ViewImg from "@/components/ViewImg/ViewImg";
import storage from "@/utils/storage";
import { dynamicFormContext } from "@/components/dynamicForm/dynamicForm";
import Icon from "@/components/Icon/Icon";

//props 做单选多选
const UploadFile = (props: Uploads) => {
  const field = props.item?.field || "";
  const listType = props.item?.listType || "picture";
  const origin = props?.action || config.UploadUrl;
  const [showSupInput, setShowSupInput] = useState<boolean>(false);

  const { state, dispatch } = useContext<any>(dynamicFormContext);

  const fileList = useMemo(() => {
    return state[field];
  }, [state, field]);

  // picture模式下 上传文件数量等于限制数量的时候 不显示上传按钮
  const hideUploadBtn = useMemo<boolean>(() => {
    if (showSupInput) return false;
    return fileList.length === props?.item?.uploadProps?.maxCount;
  }, [fileList, props?.item?.uploadProps?.maxCount, showSupInput]);

  // picture 模式下 是否显示列表
  const showMyFileList = useMemo<boolean>(() => {
    if (showSupInput) return false;
    return fileList.length > 0;
  }, [fileList, showSupInput]);

  const removeFile = (file: string) => {
    dispatch({ type: "removeFile", data: file, key: field });

    const list: any[] = fileList.filter((item: string) => item !== file);

    //设置校验值为空
    if (list.length === 0) {
      props.formRef.current?.setFieldValue(props.item.field, '')
      props.item.value = ''
    }
  };

  const uploadProps: UploadProps = {
    ...(props?.item?.uploadProps || {}),
    // 下面的优先级高于上面的uploadProps
    listType,
    name: props?.name || "file", // 后台要求是file
    action: origin + urls.file.upload,
    multiple: props?.multiple || false,
    headers: {
      authorization: "authorization-text",
      token: storage.getToken(),
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log("文件数据：", info);
      }
      if (info.file.status === "done") {
        const { response, name } = info.file;

        const k = response?.code === "000000" ? "success" : "error";
        const str = response?.message || "上传失败";
        generalNotification[k](`${name} ${str}`);

        if (k === "success") {
          dispatch({
            type: "addFile",
            data: response.data,
            key: field,
          });

          //设置一个模拟过的校验值
          if (props.item.required) {
            props.formRef.current?.setFieldValue(
              props.item.field,
              response.data
            );
          }
        }
      } else if (info.file.status === "error") {
        generalNotification.error(`${info.file.name} 上传失败`);
      } else if (info.file.status === "removed") {
        // 删除时 目前只有picture模式做了数据删除逻辑 其他都没弄
      }
    },
  };

  const clickSupInput = (e: any) => {
    e.stopPropagation();
    setShowSupInput(!showSupInput);
  };

  const changeSupInput = (e: any) => {
    if (e.target.value) {
      dispatch({
        type: "replaceFile",
        data: e.target.value,
        key: field,
      });
    }
  };

  const getFileItem = (fileUrl: string) => {
    const type = fileUrl.substring(fileUrl.lastIndexOf(".") + 1);
    const types = {
      img: ["jpg", "png", "gif", "ico"].includes(type), // 图片
      file: ["txt", "pdf", "xls", "xlsx", "doc", "docx"].includes(type), // 文件
    };

    if (types.img) {
      const ImgUrl = fileUrl.includes("group") ? fileUrl : "";
      const icon = fileUrl && !ImgUrl ? fileUrl : "";
      return ImgUrl ? (
        <ViewImg src={fileUrl}></ViewImg>
      ) : (
        <>
          <Icon icon={icon} />
          <span className="img_url_text">{fileUrl}</span>
        </>
      );
    } else if (types.file) {
      const onClickFile = () => {
        const url = checkImgPrefix(fileUrl);
        window.open(url);
      };
      return (
        <>
          <Icon icon="fileicon" onClick={onClickFile} />
          <span className="img_url_text">{type}</span>
        </>
      );
    }
    return <span className="not_url_text">{type}</span>;
  };

  return (
    <>
      <Upload {...uploadProps}>
        {listType === "picture-card" && (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>点击上传</div>
          </div>
        )}
        {listType === "picture" && (
          <>
            {!hideUploadBtn &&
              (props?.item?.uploadSupInput ? (
                <div className="uploadSupInput">
                  {showSupInput ? (
                    <Input
                      size="small"
                      onClick={(e: any) => e.stopPropagation()}
                      onBlur={changeSupInput}
                      placeholder="请输入图标名称或路径"
                    />
                  ) : (
                    <Button className="uploadBtn" icon={<UploadOutlined />}>
                      点击上传
                    </Button>
                  )}
                  <Button onClick={clickSupInput}>
                    {showSupInput ? "切换上传" : "切换输入"}
                  </Button>
                </div>
              ) : (
                <Button className="uploadBtn" icon={<UploadOutlined />}>
                  点击上传
                </Button>
              ))}
            {/* picture模式下 显示自定义的图片列表 */}
            {showMyFileList &&
              fileList.map((fileUrl: string) => {
                return (
                  <div
                    key={fileUrl}
                    className="my_filelist"
                    style={{ width: props?.item?.uploadMaxWidth || "200px" }}
                    onClick={(e: any) => {
                      e.stopPropagation();
                    }}
                  >
                    {getFileItem(fileUrl)}
                    <CloseCircleOutlined onClick={() => removeFile(fileUrl)} />
                  </div>
                );
              })}
          </>
        )}
      </Upload>
    </>
  );
};

export default UploadFile;
