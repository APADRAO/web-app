import { FormHandles } from "@unform/core";
import { useCallback, useRef } from "react";

export const useVForm = () =>{    
    const formRef = useRef<FormHandles>(null);
    const isSaveAndNew = useRef(false);
    const isSaveAndClose = useRef(false);
        const handleSave = useCallback(()=>{
            isSaveAndClose.current=false;
            isSaveAndNew.current=false;
            return formRef.current?.submitForm();
        },[]);
        const handleSaveAndNew = useCallback(()=>{
            isSaveAndClose.current=false;
            isSaveAndNew.current=true;
            return formRef.current?.submitForm();
        },[]);
        const handleSaveAndClose = useCallback(()=>{
            isSaveAndClose.current=true;
            isSaveAndNew.current=false;
            return formRef.current?.submitForm();

        },[]);
        const handleIsSaveAndNew = useCallback(()=>{
            return isSaveAndNew.current;
        },[]);
        const handleIsSaveAndClose = useCallback(()=>{
            return isSaveAndClose.current;
        },[]);
    return {
        formRef, 
        save: handleSave,
        saveAndNew: handleSaveAndNew,
        saveAndClose: handleSaveAndClose,
        isSaveAndNew: handleIsSaveAndNew, 
        isSaveAndClose: handleIsSaveAndClose
    };
};