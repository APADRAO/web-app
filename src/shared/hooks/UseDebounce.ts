import { useCallback, useRef } from "react";

export const useDebounce =(delay =1000, notDalayInFirtTime=true ) =>{
    const isFirstTime = useRef(notDalayInFirtTime);
    isFirstTime.current = notDalayInFirtTime;
    const deboucing = useRef<NodeJS.Timeout | null>(null);

    const debounce = useCallback(( func: ()=> void) =>{
        if(isFirstTime.current){
            isFirstTime.current =false;
            deboucing.current = setTimeout(()=>{func();}, 0);
        }else{
            if(deboucing.current){
                clearTimeout(deboucing.current);
            }
            deboucing.current = setTimeout(()=>{func();}, delay);
        }       
        
    }, [delay]);
    return {debounce};
}