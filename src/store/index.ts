import {configureStore} from "@reduxjs/toolkit"
import user from "./modules/user"

const store  = configureStore({
    reducer:{
        user //用户数据
    }
})
export default store