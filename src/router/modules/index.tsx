import { Navigate } from 'react-router-dom'
import LayOut from "@/pages/index";
import Home from "@/pages/home/home";
import Routine from "@/pages/routine/routine";
import CoverageRate from "@/pages/coverageRate/coverageRate"
import DeviceDetails from "@/pages/deviceDetails/deviceDetails"
import SingleFrequency from "@/pages/singleFrequency/singleFrequency"

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
      path: "/routine",
      element: <Routine />,
    },
    {
      path: "/coverageRate",
      element: <CoverageRate />,
    },
    {
      path: "/deviceDetails",
      element: <DeviceDetails />,
    },
    {
      path: "/singleFrequency",
      element: <SingleFrequency />,
    },
  ]
},

]

export default maps