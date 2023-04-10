import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:'user',
    initialState:{
        name:'',
        pwd:''
    },
    reducers:{
         setUser(state,{payload}){
            console.log(payload);
            
            state.name = payload.name
            state.pwd = payload.pwd
         },
        
    }
})
export const {setUser}   = userSlice.actions

export default userSlice.reducer