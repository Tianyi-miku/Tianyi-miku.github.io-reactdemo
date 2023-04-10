import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.less';
import router from './router/index';
import { Provider } from "react-redux" //store
import store  from "./store" //store

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
     <RouterProvider router={router} />
  </Provider>
  
);

