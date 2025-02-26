import React, { useEffect, useMemo, useState } from "react";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { FerramentasDaListagem } from "../../shared/components";
import { useSearchParams } from "react-router-dom";
import { IListagenPessoa, PessoasServices } from "../../shared/services/api/pessoas/PessoasService";
import { useDebounce } from "../../shared/hooks";
import { LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { Environment } from "../../shared/environment/environment";

export const ListagenDePessoa: React.FC = () => {
    const [ searchParams, setSearchParams] = useSearchParams();
    const {debounce} = useDebounce(300,false);
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams])
    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams])

    const [rows, setRows] = useState<IListagenPessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        setIsLoading(true);
        debounce(()=>{
            PessoasServices.getAll(pagina, busca)
            .then((result)=>{
                setIsLoading(false);
                if(result instanceof Error){
                    alert(result.message);
                    return
                }else{
                    console.log('getAll:',result);
                    setRows(result.data)
                    setTotalCount(result.totalCount)
                }    
            })
        });
        
    },[busca, pagina])


    return (
        <LayoutBaseDePagina
            titulo="Pessoas"
            barraDeFerramentas={
                <FerramentasDaListagem
                    mosrarInputBusca
                    textoBusca={busca}
                    textoBotaoNovo="Nova"
                    aoMudarTextDeBusca= {texto => setSearchParams({busca:texto, pagina:'1' },{replace:true})}
            />
            }
        >
            <TableContainer component={Paper} variant="outlined" sx={{m: 1, width:'auto'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome Completo</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row=>(
                            <TableRow key={row.id}>
                            <TableCell>Ações</TableCell>
                            <TableCell>{row.nomeCompleto}</TableCell>
                            <TableCell>{row.email}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    {totalCount===0 && !isLoading &&(
                        <caption>{Environment.LISTAGEM_VAZIA}</caption>
                    )}
                    <TableFooter>
                        {isLoading&&(
                            <TableRow>
                                <TableCell colSpan={3}>                                    
                                    <LinearProgress variant="indeterminate" />                                    
                                </TableCell>
                            </TableRow>
                        )}
                        {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
                            <TableRow>
                                <TableCell colSpan={3}>                                    
                                    <Pagination 
                                    count={Math.ceil(totalCount/Environment.LIMITE_DE_LINHAS)}
                                    page={pagina}
                                    onChange={(_, newPage)=> setSearchParams({busca, pagina:newPage.toString()}, {replace:true})}
                                    />                             
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>
        </LayoutBaseDePagina>
    )
}