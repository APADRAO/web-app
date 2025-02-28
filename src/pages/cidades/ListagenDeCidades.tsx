import React, { useEffect, useMemo, useState } from "react";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { FerramentasDaListagem } from "../../shared/components";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { IListagenCidade, CidadesServices } from "../../shared/services/api/cidades/CidadesService";
import { useDebounce } from "../../shared/hooks";
import { IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { Environment } from "../../shared/environment/environment";
import { useIconeContext } from "../../shared/contexts/IconeContexts";

export const ListagenDeCidades: React.FC = () => {
    const [ searchParams, setSearchParams] = useSearchParams();
    const {debounce} = useDebounce(300,false);
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams])
    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams])

    const [rows, setRows] = useState<IListagenCidade[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { selectedIcons,  } = useIconeContext();
    const navigate = useNavigate();

    useEffect(()=>{
        setIsLoading(true);
        debounce(()=>{
            CidadesServices.getAll(pagina, busca)
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
        
    },[busca, pagina]);

    const handleDelete = (id:number) =>{
        if(window.confirm('Realmente deseja apagar?')){
            CidadesServices.deleteById(id)
            .then(result =>{
                if(result instanceof Error){
                    alert(result.message);
                }else{
                    setRows(oldRows => [
                        ...oldRows.filter(oldRow =>oldRow.id !==id)
                    ]);
                    alert('Apagado com sucesso!');
                }
            });
        }
    }

    return (
        <LayoutBaseDePagina
            titulo="Cidades"
            barraDeFerramentas={
                <FerramentasDaListagem
                    mosrarInputBusca
                    textoBusca={busca}
                    textoBotaoNovo="Nova"
                    aoClicaremNovo={()=> navigate('/cidades/detalhe/nova')}
                    aoMudarTextDeBusca= {texto => setSearchParams({busca:texto, pagina:'1' },{replace:true})}
            />
            }
        >
            <TableContainer component={Paper} variant="outlined" sx={{m: 1, width:'auto'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width={100}>Ações</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Uf</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row=>(
                            <TableRow key={row.id}>
                            <TableCell>
                                <IconButton size="small" onClick={()=> handleDelete(row.id)}>
                                    {selectedIcons.delete}
                                </IconButton>
                                <IconButton size="small" onClick={()=> navigate(`/cidades/detalhe/${row.id}`)}>
                                    {selectedIcons.edit}
                                </IconButton>
                            </TableCell>
                            <TableCell>{row.nome}</TableCell>
                            <TableCell>{row.uf}</TableCell>
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