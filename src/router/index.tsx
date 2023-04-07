
import Login from "../login/login";
import maps from "./modules/maps"
import {
  createHashRouter,
} from "react-router-dom";


const router = createHashRouter([
  {
    path: "/login",
    element: <Login />,
  },
  maps
]);


export default router