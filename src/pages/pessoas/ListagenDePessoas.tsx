import React, { useEffect, useMemo } from "react";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { FerramentasDaListagem } from "../../shared/components";
import { useSearchParams } from "react-router-dom";
import { PessoasServices } from "../../shared/services/api/pessoas/PessoasService";

export const ListagenDePessoa: React.FC = () => {
    const [ searchParams, setSearchParams] = useSearchParams();
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams])

    useEffect(()=>{
        PessoasServices.getAll(1, busca)
        .then((result)=>{
            if(result instanceof Error){
                alert(result.message);
                return
            }else{
                console.log(result);
            }

        })
    },[busca])


    return (
        <LayoutBaseDePagina
            titulo="Pessoas"
            barraDeFerramentas={
            <FerramentasDaListagem
                textoBotaoNovo="Nova"
                mosrarInputBusca
                textoBusca={busca}
                aoMudarTextDeBusca= {texto => setSearchParams({busca:texto},{replace:true})}
            />
            }
        >
            <></>
        </LayoutBaseDePagina>
    )
}