const publicUrls: PublicUrls = {
  // 字典管理
  dic: {
    dict: "/dict", // 根据字典类型获取字典列表[GET]
    manager: "/manager/dict/list", //manager 列表字典
  },
  // 文件服务
  file: {
    downLoad: "/file/download-file", // 文件下载[GET]
    upload: "/file/upload-file", // 文件上传[POST]
  },
  // 其他接口
  other: {
    notice: "/notice", // 获取通知列表 || 获取通知详情
  },
};

type PublicUrls = {
  dic: {
    dict: string;
    manager: string;
  };
  file: {
    downLoad: string;
    upload: string;
  };
  other: {
    notice: string;
  };
};

export default publicUrls;
