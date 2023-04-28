
import Login from "../login/login";
import RouterList from "./modules"
// const Login = lazy((()=>import('@/login/login')))
import type { RouteObject } from 'react-router-dom'
import Line from "../pages/demo/line";
import Example from "../pages/demo/example/example";
import ELine from "../pages/demo/eline";
import Waterfall from "../pages/demo/example/waterfall";
import Waterfall1 from "../pages/demo/example/waterfall1";
import Wavesurfer from "../pages/demo/example/wavesurfer";

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/line",
    element: <Line />,
  },
  {
    path: "/example",
    element: <Example />,
  },
  {
    path: "/eline",
    element: <ELine />,
  },
  {
    path: "/waterfall",
    element: <Waterfall />,
  },
  {
    path: "/waterfall1",
    element: <Waterfall1 />,
  },
  {
    path: "/wavesurfer",
    element: <Wavesurfer />,
  },
  ...RouterList
];


export default routes