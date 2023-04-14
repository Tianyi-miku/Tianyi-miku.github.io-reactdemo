import React, { memo } from 'react'
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import {setUser} from "../../store/modules/user"
import {withRouter} from '../../hoc'
import storage from "../../utils/storage"
const Demo = memo((props)=>{
  console.log(props);

  // 1.使用useSelector将redux中store的数据映射到组件内 获取数据
  const { name,pwd } = useSelector((state:any) => ({
    name: state.user.name,
    pwd: state.user.pwd
  }), shallowEqual)

  // 改变数据
  const dispatch = useDispatch()
  function changeMessageHandle() {
    storage.setToken(123456)
    storage.getForEachAll()
    dispatch(setUser({name:"你好啊,我是张三",pwd:'123456'}))
  }
  return (
    <div>
        <h2>{name}</h2>
        <h2>{pwd}</h2>
        <button onClick={e=>changeMessageHandle()}>点击</button>
    </div>
  )
})

export default withRouter(Demo)

