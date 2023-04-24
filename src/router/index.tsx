
import Login from "../login/login";
import RouterList from "./modules"
// const Login = lazy((()=>import('@/login/login')))
import type { RouteObject } from 'react-router-dom'
import Line from "../pages/demo/line";
import Example from "../pages/demo/example/example";
import ELine from "../pages/demo/eline";

const routes:RouteObject[] = [
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
  ...RouterList
];


export default routes