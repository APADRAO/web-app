import { Autocomplete, CircularProgress, TextField } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { CidadesServices } from "../../../shared/services/api/cidades/CidadesService"
import { useDebounce } from "../../../shared/hooks"
import { boolean } from "yup"
import { useField } from "@unform/core"


type TAutoCompleteOption = {
    id:number;
    label:string;
}
interface IAutoCompleteCidadeProps{
    isExternalLoading?: boolean
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> =({isExternalLoading=false}) =>{
    const { clearError, defaultValue, error, fieldName, registerField} = useField('cidadeid')
    const{ debounce} = useDebounce();
    const [busca, setBusca] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);
    const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
    
    useEffect(()=>{
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_,newSelectedId) => setSelectedId(newSelectedId) 
        })
    },[registerField, selectedId, setSelectedId])
    useEffect(()=>{
        setIsLoading(true)
            debounce(()=>{
                CidadesServices.getAll(1, busca)
                .then((result)=>{
                    setIsLoading(false)
                    if(result instanceof Error){
                        //alert(result.message);
                        //return
                    }else{
                        console.log('getAll:',result);
                        setOptions(
                            result.data.map(
                                cidade=>(
                                    {
                                        id:cidade.id,
                                        label:cidade.nome
                                    }
                                )
                            )
                        )
                    }    
                })
            });
            
        },[busca]);
        const AutoCompleteOption = useMemo(()=>{
            if(!selectedId) return null;
            const selectedOptions = options.find(option =>option.id===selectedId);
            if(!selectedId) return null;
            return selectedOptions
        },[selectedId,options])

    return(
        <Autocomplete 
        openText="Abrir"
        closeText="Fechar"
        noOptionsText="Sem Opções"
        loadingText="Carregando..."

        disablePortal

        value={AutoCompleteOption}
        loading={isLoading}
        disabled={isExternalLoading}
        popupIcon={isExternalLoading || isLoading?<CircularProgress size={28}/>:undefined}
        onInputChange={(_,newValue)=> setBusca(newValue)}
        onChange={(_,newValue)=>{setSelectedId(newValue?.id); setBusca(''); clearError()}}
        options={options}
        renderInput={(params)=>(
            <TextField
            {...params}            
            error={!!error}
            helperText = {error}
            label='Cidade'
            />
        )}
        />
    );
}