//云端
const homeUrls: Login = {
  stations: "/api/v1/Station/GetList", //获取所有站点运行时信息（包括下级所有站点）
  // station: '/api/v1/Station/GetOne', //获取指定站点运行时信息
  // rootstationId: '/api/v1/Station/GetRootStationID',//获取跟站点ID
  // rootStation: '/api/v1/StationConfiguration/GetRootStation', //获取跟站点
  // configuration: '/api/v1/StationConfiguration/GetOne', //获取指定边缘端配置信息
  // allconfiguration: '/api/v1/StationConfiguration/GetAll', //全部边缘端
  // template: '/api/v1/StationConfiguration/GetTemplate', //获取指定类型的模板信息
};

type Login = {
  stations: string;
  // station: string;
  // rootstationId: string;
  // rootStation: string;
  // configuration: string;
  // allconfiguration: string;
  // template: string
};

export default homeUrls;
