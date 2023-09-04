/*
 * @Description:
 * @Author: zhangyuru
 * @Date: 2023-03-31 17:33:16
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-04-04 17:31:42
 * @FilePath: \05-simulation_training_React\src\hooks\withRouter.tsx
 */
import { useSearchParams } from "react-router-dom";
import { useLocation, useNavigate, useParams } from "react-router";

export type WithRouterProps = {
  location?: any;
  navigate?: any;
  params?: any;
  searchParams?: any;
};

export default function withRouter<T>(Child: React.FC<T>) {
  return (props: T) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [searchParams] = useSearchParams();

    return (
      <Child
        {...props}
        navigate={navigate}
        location={location}
        params={params}
        searchParams={searchParams}
      />
    );
  };
}
