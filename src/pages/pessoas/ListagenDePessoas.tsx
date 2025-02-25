import React, { useEffect, useMemo, useState } from "react";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { FerramentasDaListagem } from "../../shared/components";
import { useSearchParams } from "react-router-dom";
import { IListagenPessoa, PessoasServices } from "../../shared/services/api/pessoas/PessoasService";
import { useDebounce } from "../../shared/hooks";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export const ListagenDePessoa: React.FC = () => {
    const [ searchParams, setSearchParams] = useSearchParams();
    const {debounce} = useDebounce(300,false);
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams])

    const [rows, setRows] = useState<IListagenPessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        setIsLoading(true);
        debounce(()=>{
            PessoasServices.getAll(1, busca)
            .then((result)=>{
                setIsLoading(false);
                if(result instanceof Error){
                    alert(result.message);
                    return
                }else{
                    console.log('getAll:',result);
                    setRows(result.data)
                    setTotalCount(result.data.length)
                }    
            })
        });
        
    },[busca])


    return (
        <LayoutBaseDePagina
            titulo="Pessoas"
            barraDeFerramentas={
                <FerramentasDaListagem
                    mosrarInputBusca
                    textoBusca={busca}
                    textoBotaoNovo="Nova"
                    aoMudarTextDeBusca= {texto => setSearchParams({busca:texto},{replace:true})}
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
                </Table>
            </TableContainer>
        </LayoutBaseDePagina>
    )
}