import { Navigate } from 'react-router-dom'
import LayOut from "@/pages/index";
import Home from "@/pages/home/home";
import DeviceDetails from "@/pages/deviceDetails/deviceDetails"

const maps = [{
  path: "/",
  element: <Navigate to="/home" />,
},
{
  path: "/",
  element: <LayOut />,
  children: [
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/deviceDetails",
      element: <DeviceDetails />,
    },
  ]
},

]

export default maps