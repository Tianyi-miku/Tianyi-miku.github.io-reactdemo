
import RouterList from "./modules"
// const Login = lazy((()=>import('@/login/login')))
import { useRoutes, RouteObject, Navigate } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: "*",
    element: <Navigate to="/403" />,
  },
  ...RouterList
];


const Routes: any = () => {
  // 路由拦截
  return useRoutes(routes);
};

export default Routes