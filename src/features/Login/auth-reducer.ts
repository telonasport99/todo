import {
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType,
    setIsInitializedAC,
    SetIsInitializedActionType
} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {authAPI, LoginType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState={
    isLoggedIn:false,
}
type InitialStateType = typeof initialState
type ActionsType=ReturnType<typeof setIsLoggenInAC>|SetAppStatusActionType | SetAppErrorActionType|SetIsInitializedActionType
export const authReducer = (state:InitialStateType=initialState,action: ActionsType):InitialStateType=>{
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state,isLoggedIn: action.value}
        default:
            return state
    }
}

export const setIsLoggenInAC=(value:boolean)=>{
    return{type:'login/SET-IS-LOGGED-IN',value}as const
}
export const meTC = ()=>async (dispatch:Dispatch<ActionsType>)=>{
    dispatch(setAppStatusAC('loading'))
    try {
        const response = await authAPI.me()
        if(response.data.resultCode===0){
            dispatch(setIsLoggenInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        }else{
            handleServerAppError(response.data,dispatch)
        }
    }catch (e){
        handleServerNetworkError((e as any).message,dispatch)
    }finally {
        dispatch(setIsInitializedAC(true))
    }
}
export const loginTC = (data:LoginType)=>async (dispatch:Dispatch<ActionsType>)=>{
    dispatch(setAppStatusAC('loading'))
    try {
        const response = await authAPI.login(data)
        if(response.data.resultCode===0){
            dispatch(setIsLoggenInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        }else{
            handleServerAppError(response.data,dispatch)
        }
    }catch (e){
        handleServerNetworkError((e as any).message,dispatch)
    }
}
export const logOutTC = ()=>async (dispatch:Dispatch<ActionsType>)=>{
    dispatch(setAppStatusAC('loading'))
    try {
        const response = await authAPI.logOut()
        if(response.data.resultCode===0){
            dispatch(setIsLoggenInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        }else{
            handleServerAppError(response.data,dispatch)
        }
    }catch (e){
        handleServerNetworkError((e as any).message,dispatch)
    }
}
