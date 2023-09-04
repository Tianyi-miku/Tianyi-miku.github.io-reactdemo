/*
 * 动态表单类型约束
 */
import type {
  UploadProps,
  SelectProps,
  InputProps,
  InputNumberProps,
  DatePickerProps,
  RadioProps,
  TreeSelectProps,
} from "antd";
import { RcFile } from "antd/es/upload";
import { type } from "os";

// 联级选择
type fieldNamesType = {
  label: string;
  value: string;
  children: string;
};

// 按钮
type ButtonProps = {
  icon?: any;
  text?: any;
  event?: Function;
};

// 表单配置项
export type FormData = {
  [x: string]: any;
  field: string; // 输入框关联数据的字段名
  // 输入框类型
  type?:
  | "char" // 文本输入框
  | "textArea" // 文本域
  | "int" // number输入框
  | "password" // 密码输入框
  | "date" // 日期选择
  | "range" // 时间段选择
  | "select" // 下拉
  | "radio" // 单选
  | "checkbox" // 多选
  | "treeSelect" // tree下拉
  | "upload" // 文件上传
  | "Cascader" //级联选择
  | "button"// 按钮
  | "switch"
  | "pre";
  listType?: "text" | "picture" | "picture-card" | "picture-circle"; // 文件上回传组件的样式类型
  uploadSupInput?: boolean; // 上传组件是否支持输入
  text?: string; // 输入框的label
  errorMessage?: string; // 校验错误提示
  required?: boolean; // 是否必填
  value?: any; // 默认值
  offset?: number | any; // 偏移量
  prefix?: undefined | React.ReactNode; //前缀图标
  suffix?: undefined | React.ReactNode; //后缀图标
  colspan?: number; // 栅格布局(row)中的col宽度占比
  wrapColSpan?: number; // 输入框在当前col中的宽度占比
  options?: Array<Option>; // 下拉\复选\单选 数据配置
  treeData?: Array<any>; // tree 数据配置
  uploadMaxWidth?: string; // 文件列表最大宽度
  className?: string; // 当前col的样式类名
  btnProps?: ButtonProps;
  // 以下是antd组件的官方配置
  uploadProps?: UploadProps; // 文件上传
  selectProps?: SelectProps; // 下拉框
  inputProps?: InputProps; // 文本输入框
  inputNumberProps?: InputNumberProps; // number输入框
  dateProps?: DatePickerProps; // 日期
  radioProps?: RadioProps; // 单选
  treeProps?: TreeSelectProps; // tree 和treeSelect共用
  fieldNames?: fieldNamesType; //联级选择递归别名
  Caoptions?: Array<any>; //联级选择数组
  showRightBtn?: boolean; // 是否显示输入框/下拉框的右侧按钮
  rightBtnText?: string; // 右侧按钮的文本
  rightBtnCallback?: Function; // 右侧按钮的回调事件
  allowClear?: boolean //是否带有清楚
};

// 样式配置
export type Formstyle = {
  labelCol?: number; // 输入框label的宽度占比
  wrapperCol?: number; // 输入框的宽度占比
  maxWidth?: number | string; // 表单的最大宽度
  formLayout?: "horizontal" | "inline"; // 表单的layout布局方式
  formSpan?: number; // 横向表单布局的时候 输入框 栅格宽度占比
  anySlotSpan?: number; // 任意插槽 栅格宽度占比 (横向表单时会用)
  footerSlotSpan?: number; // 底部插槽 栅格宽度占比 (横向表单时会用)
  formItemSlotSpan?: number; // form-item插槽 栅格宽度占比 (横向表单时会用)
  anySlotStyle?: any;  //自定义样式
};

// 动态表单组件的props
export type DynamicFormProp = {
  form?: any; //表单上下文 传入form 之后可根据form.getFieldsValue(true)获取最新表单数据
  data?: FormData[];
  formstyle?: Formstyle;
  anySlot?: any; // 任意插槽
  footerSlot?: any; // 底部插槽
  formItemSlot?: any; // form-item插槽 (用来扩展查询按钮)
  update?: Function; // 提交事件
  cancel?: Function; // 取消事件
  className?: string; // class类名
  getValues?: Function; // 实时获取当前表单输入的数据 接收两个参数，第一个是全部表单数据，第二个是正在输入的表单数据
  isDisabled?: boolean; //是否禁用
  getRef?: Function; // 获取表单的Ref
  onFailed?: Function; // 表单校验失败的回调函数
  onBlur?: Function; // 输入框失去焦点回调
  hideClose?: boolean; // 不显示取消按钮
  hideSubmit?: boolean; // 不显示确定按钮
  hideFooter?: boolean; // 不显示底部按钮
};

export type switchType = {
  type?: string; //'类型 如同'char'之类的'
  prefix?: undefined | React.ReactNode; //前缀图标
  options?: Array<Option>; //下拉列表数据
  treeData?: Array<any>; //树形结构
};

export type Uploads = {
  formRef: any; // 表单方法
  item: FormData; // 配置文件
  accept?: string; //'接受文件的类型'，
  action?:
  | string
  | ((file: RcFile) => string)
  | ((file: RcFile) => PromiseLike<string>)
  | undefined; //地址，接受异步回来的请求地址
  data?: any; //'上传带的参数'，
  defaultFileList?: object[]; //默认已经上传的文件列表
  disabled?: boolean; //是否禁用s
  isImageUrl?: boolean; //自定义缩略图是否使用 <img /> 标签进行显示
  multiple?: boolean; //多选
  name?: string; //发到后台的文件参数名
};

export type Option = {
  label: string;
  value: any;
  children?: Array<Option>;
};
