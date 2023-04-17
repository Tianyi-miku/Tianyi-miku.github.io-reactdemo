
import Login from "../login/login";
import RouterList from "./modules"
// const Login = lazy((()=>import('@/login/login')))
import type { RouteObject } from 'react-router-dom'


const routes:RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  ...RouterList
];


export default routes