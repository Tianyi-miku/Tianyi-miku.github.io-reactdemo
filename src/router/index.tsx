
import Login from "../login/login";
import RouterList from "./modules"
// const Login = lazy((()=>import('@/login/login')))
import type { RouteObject } from 'react-router-dom'
import Line from "../pages/demo/line";
import Example from "../pages/demo/example/example";

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
  ...RouterList
];


export default routes