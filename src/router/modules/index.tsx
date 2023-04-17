// import Map from "../../pages/maps/map";
import { Navigate } from 'react-router-dom'
import StoreDemo from "../../pages/StoreDemo/index";
import HomeIndex from "../../pages/index";
import Home from "../../pages/home/home";
import RoutineMon from "../../pages/RoutineMon/RoutineMon";
import NetworkManage from "../../pages/networkManage/networkManage";
import SysConfiguration from "../../pages/sysConfiguration/sysConfiguration";

const maps = [{
  path: "/",
  // element: <Map />,
  element: <Navigate to="/home" />,
},
{
  path: "/home",
  element: <HomeIndex />,
  children:[
    {
      path: '/home',
      element: <Navigate to="/home/home" />
    },
    {
      path: '/home/home',
      element: <Home />
    },
    {
      path: "/home/routineMon",
      element: <RoutineMon />,
    },
    {
      path: "/home/networkManage",
      element: <NetworkManage />,
    },
    {
      path: "/home/sysConfiguration",
      element: <SysConfiguration />,
    },
    {
      path: "/home/demo",
      element: <StoreDemo />,
    }
  ]
},

]

export default maps