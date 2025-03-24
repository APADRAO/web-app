import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthService } from "../services/api/auth/AuthService";

interface IAuthContextData{
    isAuthenticated: boolean;
    logout: () =>void;
    login: (email: string, password:string)=>Promise<string|void>
}
interface IAuthProviderProps{
	children: React.ReactNode
}
const SESSION_STORAGE_KEY_ACCESSTOKEN = 'APP_ACCESS_TOKEN';
const AuthContext = createContext({} as IAuthContextData);
export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) =>{

    const [accessToken, setAccessToken] = useState<string>();
    useEffect(()=>{
        const accessToken = sessionStorage.getItem(SESSION_STORAGE_KEY_ACCESSTOKEN)
        if(accessToken){
            setAccessToken(JSON.parse(accessToken));
        }else{
            setAccessToken(undefined);
        }
    },[])

    const handlerLogin = useCallback( async (email: string, password:string)=>{
        const result = await AuthService.auth(email,password);
        if(result instanceof Error){
            return result.message
        }
        else{
            sessionStorage.setItem(SESSION_STORAGE_KEY_ACCESSTOKEN, JSON.stringify(result.dados?.token))
            setAccessToken(result.dados?.token);
        }

    },[])
    const handlerLogout = useCallback(()=>{
        sessionStorage.removeItem(SESSION_STORAGE_KEY_ACCESSTOKEN);
        setAccessToken(undefined);
    },[])
    
    const isAuthenticated = useMemo(() => {
        return !!accessToken;
        }, [accessToken]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login:handlerLogin , logout:handlerLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContex =() => useContext(AuthContext);
