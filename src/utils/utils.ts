
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { toType } from "./checkType";
const _ =require('underscore')

// 消息通知
class notificat {
  success(
    message?: string,
    description?: string,
    placement?: NotificationPlacement | undefined
  ) {
    notification.success({
      message: message || "操作成功",
      description: description || "成功",
      placement: placement || "topRight",
    });
  }

  info(
    message?: string,
    description?: string,
    placement?: NotificationPlacement | undefined
  ) {
    notification.info({
      message: message || "操作提示",
      description: description || "是否执行操作",
      placement: placement || "topRight",
    });
  }

  warning(
    message?: string,
    description?: string,
    placement?: NotificationPlacement | undefined
  ) {
    notification.warning({
      message: message || "操作警告",
      description: description || "是否执行此操作",
      placement: placement || "topRight",
    });
  }

  error(
    message?: string,
    description?: string,
    placement?: NotificationPlacement | undefined
  ) {
    notification.error({
      message: message || "操作失败",
      description: description || "服务器内部错误",
      placement: placement || "topRight",
    });
  }
}
export const generalNotification = new notificat();

// 去除无效数据(删除对象中的 null和undefined)
export function removeInvalidData(data: any) {
  let values = data?.data || data?.params;
  const type = toType(values);
  if (type === "array") {
    values = values.filter((item: any) => {
      return removeInvalidData(item);
    });
  }
  if (type === "object") {
    Object.keys(values).forEach((key: string) => {
      if (values[key] == null) {
        delete values[key];
      }
    });
  }
  if (data?.data) data.data = values;
  if (data?.params) data.params = values;
  return data;
}

/**
 * 选择图片前缀，返回图片完全路径
 * @param {string} str
 * @return { string } 'http://192.168.36.45687/xxx/xxx/xxx.jpg'
 */
export const checkImgPrefix = (str: string): string => {
  if (!str) return "";
  if (!str.includes("group")) return str; // 没有group说明是本地文件
  if (str.includes("http")) return str; // 有http的线上文件直接返回本身
  return "/document/" + str;
};

/**
 * 获取一个uuid
 * @return { string }
 */
export const getUUID = (): string => {
  const str = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  return str.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * 获取一个number类型的uuid,
 * @param { number } maxLen 最大长度
 * @return { number }
 */
export const getNumberUUID = (maxLen: number = 10): number => {
  return +(_.uniqueId() + +new Date()).substring(0, maxLen);
};

// 时间转换(把时间转换成antd需要的格式)
export function dateFormat(
  date: any,
  isTime: boolean = true,
  isZhtime: boolean = false
): string {
  const dat: Date = new Date(date);
  const year = dat.getFullYear();
  const mon =
    dat.getMonth() + 1 < 10 ? "0" + (dat.getMonth() + 1) : dat.getMonth() + 1;
  const data = dat.getDate() < 10 ? "0" + dat.getDate() : dat.getDate();
  const hour = dat.getHours() < 10 ? "0" + dat.getHours() : dat.getHours();
  const min = dat.getMinutes() < 10 ? "0" + dat.getMinutes() : dat.getMinutes();
  const seon =
    dat.getSeconds() < 10 ? "0" + dat.getSeconds() : dat.getSeconds();
  if (isTime) {
    return year + "-" + mon + "-" + data + " " + hour + ":" + min + ":" + seon;
  }
  if (isZhtime) {
    return (
      year + "年" + mon + "月" + data + "日" + hour + ":" + min + ":" + seon
    );
  }
  return year + "-" + mon + "-" + data;
}

/**
 * 一个递归查询树节点的函数
 * 如果传了新的node 则会把list中找到的对应node替换为新的node，并返回list
 * @return { T | T[] }
 */
export function deepSearchOrgNode<T>({
  list, // 递归查找的列表
  key, // 递归查找的字段名
  value, // 递归查找的参数(和key对应)
  childKey, // 递归查找的子级字段名
  newNode, // 查找到节点后 需要替换的节点
}: {
  list: T[];
  key: string;
  value: any;
  childKey: string;
  newNode?: T;
}) {
  let result: any = null;
  let newList = _.clone(list);
  const deepFunc: Function = (data: T[]) => {
    for (let i = 0; i < data.length; i++) {
      const item: any = data[i];
      if (item[key] === value) {
        if (!newNode) result = item;
        else data[i] = newNode;
        return;
      }
      const child: T[] = item[childKey] || [];
      if (child.length > 0) deepFunc(child);
    }
  };
  deepFunc(newList);

  return newNode ? newList : result;
}

/**
 * 一个递归给树节点添加节点唯一key和父节点唯一key的函数
 * @return { T | T[] }
 */
export function deepExpanded<T>({
  list,
  childAddKey,
  parentAddKey,
  childrenKey = "children",
  initPnode = 0,
  setParentArr,
  parentArrKey,
  parentNode,
  returnKeys,
}: {
  list: T[]; // tree列表数据
  childAddKey?: string; // 子节点需要添加的参数key
  parentAddKey?: string; // 父节点需要添加的参数key
  childrenKey?: string; // 子节点数据的数组key
  initPnode?: number; // 第一个父节点参数数据
  setParentArr?: boolean; // 是否增加父节点数组
  parentArrKey?: string; // 父节点数组的参数key
  parentNode?: any; // 父节点
  returnKeys?: Array<string>; // 指定返回哪些字段
}) {
  return list.map((item: any) => {
    // 添加指定的节点唯一key和父节点唯一key
    if (childAddKey) item[childAddKey] = getNumberUUID();
    if (parentAddKey) item[parentAddKey] = initPnode;

    // 添加父节点数据
    if (setParentArr && parentNode && parentArrKey) {
      item[parentArrKey] = Array.isArray(item[parentArrKey])
        ? [...item[parentArrKey], parentNode]
        : [parentNode];
    }

    // 用于递归给子节点的父节点数据
    const pnode: any = setParentArr ? { ...item } : null;
    if (pnode) delete pnode[childrenKey];

    // 递归子节点
    if (item[childrenKey] && item[childrenKey].length > 0) {
      item[childrenKey] = deepExpanded<T>({
        list: item[childrenKey],
        childAddKey,
        parentAddKey,
        childrenKey,
        initPnode: childAddKey ? item[childAddKey] : initPnode,
        setParentArr,
        parentArrKey,
        parentNode: pnode,
        returnKeys,
      });
    }

    let result = item;
    // 返回指定的字段
    if (returnKeys && returnKeys?.length > 0) {
      const obj: any = {};
      returnKeys.forEach((key: string) => {
        obj[key] = item[key] || 0;
      });
      result = obj;
    }

    return result;
  });
}

/**
 * 判断是否全屏
 * @returns boolean
 */
export const getFullscreen = (): boolean => {
  const { width: swidth, height: sheight } = window.screen; //全屏高度
  const { width, height } = document.body.getBoundingClientRect(); //当前屏幕高度
  return swidth === width && sheight === height;
};

/**
 *  开启关闭全屏
 * @param callback 回调函数
 */
export const launchFullScreen = (callback: Function) => {
  const fullscreen = getFullscreen();
  const element: any = document.documentElement;
  if (!fullscreen) {
    if (element?.requestFullscreen) {
      element.requestFullscreen();
    } else if (element?.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element?.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element?.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  } else {
    if (document?.exitFullscreen) {
      document.exitFullscreen();
    }
  }
  callback();
};

//get下载
export const getDownFilled = (res:any,name:string)=>{
  let blob = new Blob([res.data], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'
   });
  let filename = name + '.xlsx';
  let downloadElement = document.createElement('a');
  let href = window.URL.createObjectURL(blob); //创建下载的链接
  downloadElement.style.display = 'none';
  downloadElement.href = href;
  downloadElement.download =filename ; //下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); //点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
  window.URL.revokeObjectURL(href); //释放掉blob对象
}

// post下载
export const postDownload = (res:any,name:string) =>{
  const BLOB = res.data;
  const fileReader = new FileReader();
  fileReader.readAsDataURL(BLOB);  //对请求返回的文件进行处理
  fileReader.onload = (e) => {
    let a:any = document.createElement('a') ;
    a.download = name + '.xlsx';
    a.href = e.target?.result;
    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a)
  }
}