
import Login from "../login/login";
import maps from "./modules/maps"
// const Login = lazy((()=>import('@/login/login')))
import {
  createHashRouter,
} from "react-router-dom";


const router = createHashRouter([
  {
    path: "/login",
    element: <Login />,
  },
  ...maps
]);


export default router