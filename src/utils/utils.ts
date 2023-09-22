import { UploadProps, notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { isObj, toType } from "./checkType";
import config from "@/config";
import _, { cloneDeep, uniqueId } from "lodash";
import storage from "@/utils/storage";
import { UploadPropsTyle, uploadApi } from "@/api/upload/upload";

// 消息通知
class Notificat {
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
export const generalNotification = new Notificat();
export const notificat = generalNotification;

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
  if (str.includes("/group")) {
    str = config.FileUrl + str; // 前面有 / 就不用管
  } else {
    str = config.FileUrl + "/" + str; // 没有 / 就给它加上
  }
  return str;
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
  return +(uniqueId() + +new Date()).substring(0, maxLen);
};

// 时间转换(把时间转换成antd需要的格式)
export function dateFormat(
  date: any,
  isTime: boolean = true,
  isZhtime: boolean = false
): string {
  date = date || new Date().getTime();
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
 * 一个递归 查询/删除/替换 树节点的函数
 * 如果传了新的node 则会把list中找到的对应node替换为新的node，并返回list
 * @return { T | T[] }
 */
export function deepSearchTreeNode<T>({
  list, // 递归查找的列表
  key, // 递归查找的字段名
  value, // 递归查找的参数 (和key对应)
  values, // 递归查找的参数集合 (和key对应)
  childKey, // 递归查找的子级字段名
  newNode, // 查找到节点后 需要替换的节点
  oldNode, // 查找到节点后 需要替换的旧节点
  isDelete, // 是否删除匹配到的节点
  setParent, // 设置parent数据
}: {
  list: T[];
  key: string;
  value?: any;
  values?: any[];
  childKey: string;
  newNode?: any;
  oldNode?: any;
  isDelete?: boolean;
  setParent?: Function;
}) {
  if (!list.length) {
    return newNode ? list : null;
  }
  const isEdit = !!newNode || isDelete || !!setParent;
  values = values?.length ? values : value ? [value] : [];

  let strack: any[] = [];
  let resultNode: any = null;
  let newList = cloneDeep(list);
  let isbreak = false;

  const deepFunc: Function = (data: T[]) => {
    for (let i = 0; i < data.length; i++) {
      if (isbreak) break;
      let item: any = data[i];
      let parent: any = strack[strack.length - 1];
      if (setParent && parent && item) {
        item = setParent(item, parent);
      }
      if (values?.length) {
        for (let val of values) {
          if (item && item[key] === val) {
            if (!newNode && !isDelete) {
              resultNode = item;
            } else if (isDelete) {
              delete data[i];
            } else if (newNode) {
              let index = -1;
              if (oldNode) {
                index = data.findIndex((obj: any) => {
                  return obj[key] === newNode[key];
                });
              }
              data[i] = newNode;
              if (index > -1) {
                data[index] = item;
              }
              isbreak = true;
            }
            break;
          }
        }
      }
      const child: T[] = item && item[childKey] ? item[childKey] : [];
      if (child.length > 0) {
        strack.push(item); // 进栈
        deepFunc(child);
      }
      if (i === data.length - 1) {
        strack.pop(); // 出栈
      }
    }
  };
  deepFunc(newList);

  return isEdit ? newList : resultNode;
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
 * @return { Boolean }
 */
export const getFullscreen = (): boolean => {
  const { width: swidth, height: sheight } = window.screen;
  const { width, height } = document.body.getBoundingClientRect();
  return swidth === width && sheight === height;
};

/**
 * 开启/关闭全屏
 * @param { Function } callback 回调函数 选传
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
export const getDownFilled = (res: any, name: string) => {
  let blob = new Blob([res.data ? res.data : res], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8",
  });
  let filename = name + ".xlsx";
  let downloadElement = document.createElement("a");
  let href = window.URL.createObjectURL(blob); //创建下载的链接
  downloadElement.style.display = "none";
  downloadElement.href = href;
  downloadElement.download = filename; //下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); //点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
  window.URL.revokeObjectURL(href); //释放掉blob对象
};

// post下载
export const postDownload = (res: any, name: string) => {
  const BLOB = res.data ? res.data : res;
  const fileReader = new FileReader();
  fileReader.readAsDataURL(BLOB); //对请求返回的文件进行处理
  fileReader.onload = (e) => {
    let a: any = document.createElement("a");
    a.download = name + ".xlsx";
    a.href = e.target?.result;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
};

// 打开新窗口
export const openPage = (url: string) => {
  url = url.indexOf("/") === 0 ? url : "/" + url;
  const hrefStr = window.location.href;
  const path = hrefStr.split("/#")[0];
  window.open(`${path}/#${url}`, "_blank");
};

// 字符串json转对象
export function JsonStrToObj(str: string) {
  try {
    return JSON.parse(str);
  } catch (e: any) {
    return null;
  }
}

/**
 * 时间格式化
 * @param {string | Date} value
 * @param {string} fmt
 * @example
 *  dateFormat(value, 'yyyy-MM-dd hh:mm:ss')
 *  dateFormat(value, 'yyyy年MM月dd日 hh时mm分')
 */
export const DateFormat = (
  value: number | string,
  fmt: string = "yyyy-MM-dd hh:mm:ss"
) => {
  if (value) {
    const getDate =
      typeof value === "string"
        ? new Date(value.replace(/-/g, "/"))
        : new Date(value);
    const o: any = {
      "M+": getDate.getMonth() + 1,
      "d+": getDate.getDate(),
      "h+": getDate.getHours(),
      "m+": getDate.getMinutes(),
      "s+": getDate.getSeconds(),
      "q+": Math.floor((getDate.getMonth() + 3) / 3),
      S: getDate.getMilliseconds(),
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (getDate.getFullYear() + "").substring(4 - RegExp.$1.length)
      );
    }
    for (const k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ("00" + o[k]).substring(("" + o[k]).length)
        );
      }
    }
    return fmt;
  }
};

// 获取url中全部参数的对象
export function getUrlParams() {
  // 解决乱码问题
  let url = decodeURI(window.location.href);
  let res: any = {};
  let url_data = _.split(url, "?").length > 1 ? _.split(url, "?")[1] : null;
  if (!url_data) return null;
  let params_arr = _.split(url_data, "&");
  _.forEach(params_arr, function (item) {
    let key = _.split(item, "=")[0];
    let value = _.split(item, "=")[1];
    res[key] = value;
  });
  return res;
}

// 获取坐标位置
export function getLocation() {
  let coords;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position: any) {
      coords = position.coords;
    });
  }
  return coords;
}

export const IUploadProps = (data: UploadPropsTyle, select?: Function) => {
  // 头部框导入配置，用到的时候自行扩展
  const upload: UploadProps = {
    name: "file",
    headers: {
      token: storage.getToken(),
      Responsetype: "blob",
    },
    data: data?.data,
    multiple: data?.multiple ? data?.multiple : false,
    showUploadList: false,
    customRequest: (file) => customUpload(file, data, select),
  };
  return upload;
};

const customUpload = (file: any, data: UploadPropsTyle, select?: Function) => {
  let fromData = new FormData();
  fromData.append("file", file.file);
  for (const i of Object.keys(data?.data)) {
    fromData.append(i, data?.data[i]);
  }
  uploadApi(data.action, fromData).then((response: any) => {
    if (response.type === "application/json") {
      let fileReader = new FileReader();
      fileReader.onload = function () {
        try {
          //@ts-expect-error
          let jsonData = JSON.parse(fileReader.result); // 说明是普通对象数据，后台转换失败
          console.log(jsonData);
          if (jsonData.code === "000000") {
            generalNotification.success("导入成功", `${jsonData.message}`);
          } else {
            generalNotification.error("失败", `${jsonData.message}`);
          }
        } catch (err) {
          generalNotification.error("失败", `解析失败`);
        }
      };
      fileReader.readAsText(response);
    } else {
      postDownload(response, "图谱");
      generalNotification.error("失败", `文件导入失败`);
    }
    if (select) {
      select();
    }
  })
    .catch(() => {
      generalNotification.error("失败", `文件上传失败`);
    });
};

/**
 * json字符串转换为对象
 * @param { any } str 入参
 * @return { object }
 */
export const transformObject = (str: any, isArray: boolean = false): any => {
  if (str instanceof isObj) return str;
  if (str && /\{((?:.|\r?\n)+?)\}/g.test(str)) {
    if (typeof str === "string") {
      const data: any = JSON.parse(str);
      if (Array.isArray(data) && isArray) {
        const obj: any = {};
        data.forEach((i: any) => {
          obj[i.Key] = i.value;
        });
        return obj;
      } else return data;
    } else return {};
  } else return {};
};