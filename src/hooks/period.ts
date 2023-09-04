/*
 * @Description:函数组件中 自定义的生命周期钩子
 * @Author: zhangyuru
 * @Date: 2023-03-17 09:40:41
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-04-04 16:17:52
 * @FilePath: \05-simulation_training_React\src\hooks\period.ts
 */
import { useCallback, useEffect, useState } from "react";

// 模拟生命周期的初次挂载
export const useDidMount = () => {
  const [didMount, setDidMount] = useState<boolean>(true);
  useEffect(() => {
    if (didMount) setDidMount(false);
    return () => {};
  }, [didMount]);
  return didMount;
};

// 模拟生命周期的初次挂载
export const useComponentDidMount = (callback: Function) => {
  const [didMount, setDidMount] = useState<boolean>(true);
  useEffect(() => {
    if (didMount) {
      setDidMount(false);
      callback();
    }
  }, [didMount, callback]);
};

/*
  模拟forceUpdate 强制刷新一次
  使用方法:
    const update = useForceUpdate()
    需要强制刷新的时候 调用 update()
*/
export const useForceUpdate = () => {
  const [state, setState] = useState<number>(0);
  const update = useCallback(() => {
    setState(state + 1);
  }, [state]);
  return update;
};
