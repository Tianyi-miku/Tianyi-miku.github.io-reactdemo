/*
 * @Description:
 * @Author: zhangyuru
 * @Date: 2023-03-01 16:35:56
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-08-24 14:45:07
 * @FilePath: \05-simulation_training_React\src\components\dynamicForm\models\swich.tsx
 */
import React from "react";
import {
  InputNumber,
  Input,
  DatePicker,
  Select,
  Checkbox,
  Radio,
  TreeSelect,
  Cascader,
  Button,
  Switch,
} from "antd";
import { FormData } from "../dynamicFormType";
import UploadFile from "./upload";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const SwitchItem = (
  item: FormData,
  onChange: Function,
  blur: Function,
  formRef: any
) => {
  const type = item.type;
  if (!item.prefix) {
    item.prefix = <></>;
  }
  if (!item.suffix) {
    item.suffix = <></>;
  }
  let element: any = null;
  const onBlur = (e: any) => {
    blur(e?.target?.value, item?.field);
  };
  const changeValue = (value: any) => {
    onChange({
      type: item.type,
      value,
      field: item.field,
    });
  };

  const changeValueByTarget = (e: any) => {
    onChange({
      type: item.type,
      value: e.target?.value || e,
    });
  };

  const changeValueByTime = (value: any) => {
    if (Array.isArray(value)) {
      onChange({
        type: item.type,
        value: [new Date(value[0]).getTime(), new Date(value[1]).getTime()],
      });
    } else {
      onChange({
        type: item.type,
        value: new Date(value).getTime(),
      });
    }
  };

  const textarea: any = item?.inputProps || {};

  switch (type) {
    case "int":
      element = (
        <InputNumber
          {...(item?.inputNumberProps || {})}
          onChange={changeValue}
          size="small"
          style={{ width: "100%" }}
          prefix={item.prefix}
          addonAfter={item.suffix}
          placeholder={item?.errorMessage || ""}
        />
      );
      break;
    case "char":
      element = (
        <Input
          {...(item?.inputProps || {})}
          onChange={changeValueByTarget}
          onBlur={onBlur}
          size="small"
          prefix={item.prefix}
          suffix={item.suffix}
          placeholder={item?.errorMessage}
          allowClear={item?.allowClear}
        />
      );
      break;
    case "textArea":
      element = <TextArea onChange={changeValueByTarget} {...textarea} />;
      break;
    case "password":
      element = (
        <Input.Password
          {...(item?.inputProps || {})}
          onChange={changeValueByTarget}
          size="small"
          prefix={item.prefix}
          placeholder={item?.errorMessage || ""}
        />
      );
      break;
    case "date":
      element = (
        <DatePicker
          {...(item?.dateProps || {})}
          onChange={changeValueByTime}
          size="small"
          style={{ width: "100%" }}
          format={
            item?.dateProps?.format ? item?.dateProps?.format : "YYYY-MM-DD"
          }
          placeholder={item?.errorMessage || ""}
        />
      );
      break;
    case "range":
      element = (
        <RangePicker
          onChange={changeValueByTime}
          size="small"
          style={{ width: "100%" }}
          format="YYYY-MM-DD"
        />
      );
      break;
    case "select":
      element = (
        <Select
          {...(item?.selectProps || {})}
          onChange={changeValue}
          style={{ width: "100%" }}
          options={item?.options || []}
          value={item?.value != null ? item?.value : null}
          placeholder={item?.errorMessage || ""}
          allowClear={true}
        />
      );
      break;
    case "radio":
      element = (
        <Radio.Group
          {...(item?.radioProps || {})}
          onChange={changeValueByTarget}
          size="small"
          options={item.options}
        ></Radio.Group>
      );
      break;
    case "treeSelect":
      element = (
        <TreeSelect
          onChange={changeValue}
          {...(item?.treeProps || {})}
          treeDefaultExpandedKeys={[item?.value]}
          treeData={item?.treeData || []}
          placeholder={item?.errorMessage || ""}
        />
      );
      break;
    case "checkbox":
      element = (
        <Checkbox.Group options={item.options} onChange={changeValueByTarget} />
      );
      break;
    case "upload":
      element = <UploadFile item={item} formRef={formRef}></UploadFile>;
      break;
    case "Cascader":
      element = (
        <Cascader
          options={item.Caoptions}
          placeholder={item?.errorMessage}
          fieldNames={item.fieldNames}
        />
      );
      break;
    case "button":
      element = (
        <Button
          className="formItemBtn"
          onClick={(e: any) => {
            if (item.btnProps?.event) {
              item.btnProps.event();
            }
          }}
        >
          {item.btnProps?.text || "默认按钮"}
        </Button>
      );
      break;
    case "switch":
      element = <Switch onChange={changeValueByTarget} />;
      break;
    case "pre":
      element = (
        <TextArea style={{ height: 150, color: "white" }}>
          <pre>{item.value}</pre>
        </TextArea>
      )
      break;
    default:
      element = <Input onChange={changeValueByTarget} />;
      break;
  }
  return element;
};

export default SwitchItem;
