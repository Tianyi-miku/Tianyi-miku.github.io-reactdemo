import { Navigate } from 'react-router-dom'
import LayOut from "../../pages/index";
import Home from "../../pages/home/home";

const maps = [{
  path: "/",
  element: <Navigate to="/" />,
},
{
  path: "/",
  element: <LayOut />,
  children: [
    {
      path: "/home",
      element: <Home />,
    }
  ]
},

]

export default maps