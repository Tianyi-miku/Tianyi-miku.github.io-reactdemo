import React, {
  createContext,
  forwardRef,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import { Form, Button, Row, Col } from "antd";
import switchItem from "./models/swich";
import { dateFormat, getUUID } from "@/utils/utils";
import type { FormInstance } from "antd/es/form";
import type {
  DynamicFormProp,
  FormData as FormDatas,
  Formstyle as Formstyles,
} from "./dynamicFormType";
import "./dynamicForm.less";
import dayjs from "dayjs";
import { cloneDeep } from "lodash";

// 上下文
export const dynamicFormContext = createContext<any>({});
// 上下文reducer
export const dynamicFormReducer = (
  state: any,
  action: { type: string; data: any; key?: string }
) => {
  const newState = cloneDeep(state);
  const { type, data, key } = action;
  switch (type) {
    case "addFile":
      if (key && newState[key] && Array.isArray(newState[key])) {
        const list = [...newState[key], data];
        newState[key] = list;
      }
      return newState;
    case "removeFile":
      if (key && newState[key] && Array.isArray(newState[key])) {
        const list = newState[key].filter((i: string) => i !== data);
        newState[key] = list;
      }
      return newState;
    case "replaceFile":
      if (key && newState[key] && Array.isArray(newState[key])) {
        const list = [data];
        newState[key] = list;
      }
      return newState;
    default:
      return newState;
  }
};

export type FormData = FormDatas;
export type Formstyle = Formstyles;

const DynamicForm = (props: DynamicFormProp, ref: any) => {
  const formRef = React.useRef<FormInstance>(null);
  const onReset = () => {
    formRef.current?.resetFields();
    if (props?.cancel) props.cancel();
  };

  /*
    上下文共享数据
    有一种场景 一个动态表单包含多个文件上传的时候 一个fileList明显不够用了
    通过遍历FormData 用配置的字段名 创建动态的state
  */
  const initState: any = {};
  const formDatas: FormDatas[] = useMemo(() => {
    return props?.data || [];
  }, [props]);
  formDatas.forEach((item: FormDatas) => {
    if (item.type === "upload") {
      const value: any[] = !Array.isArray(item.value)
        ? item?.value
          ? [item.value]
          : []
        : item.value;
      initState[item.field] = value;

      if (value.length > 0) {
        formRef.current?.setFieldValue(item.field, value);
      }
    }
  });
  const [state, dispatch] = useReducer(dynamicFormReducer, initState);
  const providerValue = useMemo(() => ({ state, dispatch }), [state]);

  // 表单内容改变时触发
  const onChange = useCallback(
    (value: any) => {
      // 下拉切换时 触发父组件的getValues 其他如有需要 继续在这里添加
      if (value?.type === "select") {
        const formValue = formRef?.current?.getFieldsValue();
        if (props?.getValues) props.getValues(formValue, value);
      }
    },
    [formRef, props]
  );

  // 输入框失去焦点时触发回调
  const onBlur = useCallback(
    (value: any, key: any) => {
      if (props?.onBlur) {
        props.onBlur(value, key);
      }
    },
    [props]
  );

  // 设置默认参数
  const setDefaultValue = (item: FormData) => {
    // 转换时间格式(转换成antd组件需要的格式)
    if (item.type === "date" && item.value) {
      return dayjs(dateFormat(item.value, false), "YYYY/MM/DD");
    }
    if (item.type === "range" && item.value) {
      return [
        dayjs(dateFormat(item.value[0], false), "YYYY/MM/DD"),
        dayjs(dateFormat(item.value[1], false), "YYYY/MM/DD"),
      ];
    }
    // if (item.type === "switch" && item.value) {
    //   item.checked = item.value
    // }

    return item.value;
  };

  // 查找props.data中的指定类型的数据
  const findType = (key: string) => {
    const list: any[] = props?.data || [];
    return list.filter((item) => item?.type === key);
  };

  // 点击提交 表单校验通过
  const onFinish = (values: any) => {
    if (props?.update) {
      // 转换文件数据
      const upload = findType("upload");
      if (upload.length > 0) {
        upload.forEach((item) => {
          const key = item.field;
          values[key] = Array.isArray(state[key]) ? state[key].join(",") : "";
        });
      }
      // 转换时间数据(转换成后台需要的时间戳格式)
      const date = findType("date");
      if (date.length > 0) {
        date.forEach((item) => {
          values[item.field] = new Date(values[item.field]).getTime();
        });
      }
      const range = findType("range");
      if (range.length > 0) {
        range.forEach((item) => {
          values[item.field][0] = new Date(values[item.field][0]).getTime();
          values[item.field][1] = new Date(values[item.field][1]).getTime();
        });
      }
      const switchs = findType("switch");
      if (switchs.length > 0) {
        switchs.forEach((item) => {
          values[item.field] = values[item.field] ? 1 : 0;
        });
      }
      props.update(values);
    }
  };

  // 点击提交 表单校验失败
  const onFinishFailed = (errorInfo: any) => {
    if (props?.onFailed) {
      props.onFailed(errorInfo);
    } else {
      console.log("Failed:", errorInfo);
    }
  };

  React.useEffect(() => {
    if (props?.getRef && formRef.current) {
      props.getRef(formRef.current);
    }
  }, [props, formRef]);

  //判断是否插槽按钮
  function showFooter() {
    if (props.hideFooter) {
      return;
    }
    let footerSlot = props?.footerSlot;
    if (!footerSlot) {
      footerSlot = (
        <Form.Item
          wrapperCol={{
            offset: props?.formstyle?.labelCol || 0,
            span: props?.formstyle?.wrapperCol || 24,
          }}
        >
          {!props.hideClose && (
            <Button htmlType="button" onClick={onReset} disabled={false}>
              取消
            </Button>
          )}
          {!props.hideSubmit && (
            <Button type="primary" htmlType="submit" className="buttons" disabled={false}>
              确定
            </Button>
          )}

        </Form.Item>
      );
    }
    return (
      <Col span={props?.formstyle?.footerSlotSpan || 24} className="footerCol">
        {footerSlot}
      </Col>
    );
  }
  // 任意插槽
  function showSnySlot() {
    if (!props?.anySlot) return <></>;
    return (
      <Col span={props?.formstyle?.anySlotSpan || 24} style={props.formstyle?.anySlotStyle}>
        {props.anySlot}
      </Col>
    );
  }
  // form-item插槽
  function showFormItemSlot() {
    if (!props?.formItemSlot) return <></>;
    return (
      <Col span={props?.formstyle?.formItemSlotSpan || 24}>
        {props.formItemSlot}
      </Col>
    );
  }

  return (
    // 外层ref是为了让父组件拿到ref
    <div className="dynaminc" ref={ref}>
      <dynamicFormContext.Provider value={providerValue}>
        <Form
          form={props.form}
          ref={formRef}
          className={props?.className || ""}
          labelCol={{ span: props?.formstyle?.labelCol || 0 }}
          wrapperCol={{ span: props?.formstyle?.wrapperCol || 24 }}
          style={{ maxWidth: props?.formstyle?.maxWidth || 600 }}
          onFinish={(values: any) => onFinish(values)}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout={props?.formstyle?.formLayout || "horizontal"}
          disabled={props?.isDisabled}
        >
          <Row>
            <Col span={props?.formstyle?.formSpan || 24}>
              <Row>
                {formDatas.map((item: FormData, index: number) => {
                  return (
                    <Col
                      key={index + getUUID()}
                      span={item?.colspan || 24}
                      className={`${item?.className || ""}${
                        item.showRightBtn ? "flexCol" : ""
                      }`}
                    >
                      <Form.Item
                        label={item?.text || ""}
                        name={item.field}
                        // hasFeedback
                        rules={[
                          {
                            required: item?.required,
                            message: item?.errorMessage || "请输入",
                          },
                        ]}
                        wrapperCol={{
                          offset: item?.offset || 0,
                          span: item?.wrapColSpan || 24,
                        }}
                        initialValue={setDefaultValue(item)}
                        valuePropName={
                          item.type === "switch" ? "checked" : undefined
                        }
                      >
                        {switchItem(item, onChange, onBlur, formRef)}
                      </Form.Item>
                      {item.showRightBtn && (
                        <Button
                          style={{ marginRight: "0", height: "40px" }}
                          onClick={() => {
                            if (item.rightBtnCallback) {
                              item.rightBtnCallback();
                            }
                          }}
                        >
                          {item.rightBtnText || "编辑"}
                        </Button>
                      )}
                    </Col>
                  );
                })}
                {/* form-item插槽 */}
                {showFormItemSlot()}
              </Row>
            </Col>

            {/* 任意插槽 */}
            {showSnySlot()}

            {/* 底部插槽 */}
            {showFooter()}
          </Row>
        </Form>
      </dynamicFormContext.Provider>
    </div>
  );
};

export default forwardRef(DynamicForm);
