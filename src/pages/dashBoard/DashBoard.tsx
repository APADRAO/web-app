import { Box, Card, CardContent, Grid2, Paper, Typography, useMediaQuery, useTheme } from "@mui/material"
import { FerramenasDeDetalhe, FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"
import { useEffect, useState } from "react";
import { PessoasServices } from "../../shared/services/api/pessoas/PessoasService";
import { CidadesServices } from "../../shared/services/api/cidades/CidadesService";


export const DashBoard = () => {
    const theme = useTheme();
	const smDom = useMediaQuery(theme.breakpoints.down('sm'));
	const mdDom = useMediaQuery(theme.breakpoints.down('md'));
    const [isLoadingCidades, setIsLoadingCidades] = useState(true);
    const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
    const [totalcountPessoas, setTotalCountPessoas] = useState(0);
    const [totalcountCidades, setTotalCountCidades] = useState(0);
    useEffect(()=>{
        setIsLoadingPessoas(true);
                PessoasServices.getAll(1)
                .then((result)=>{
                    setIsLoadingPessoas(false);
                    if(result instanceof Error){
                        alert(result.message);
                        return
                    }else{
                        setTotalCountPessoas(result.totalCount)
                    }    
                })
            
        setIsLoadingCidades(true);
            CidadesServices.getAll(1)
            .then((result)=>{
                setIsLoadingCidades(false);
                if(result instanceof Error){
                    alert(result.message);
                    return
                }else{
                    setTotalCountCidades(result.totalCount)
                }    
            })
    },[]);
    return (
        <LayoutBaseDePagina 
        titulo="Pagina Inicial" 
        barraDeFerramentas={(
           
            <FerramentasDaListagem mosrarBotaoNovo={false}/>
        )}>
           <Box height='100%'  >
            <Grid2 container direction='column' margin={2} spacing={2} size={12}>
                <Grid2 container direction="row" spacing={2} size={12}>
                    <Grid2 size={mdDom ? 12 : smDom ? 6 : 6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" align="center"> 
                                    Total de Cidades
                                </Typography>
                                <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                                {!isLoadingCidades&&(
                                        <Typography variant="h1">
                                           {totalcountCidades}
                                        </Typography>
                                    )}
                                    <Typography variant="h1"> 
                                    
                                    </Typography>
                                    {isLoadingCidades&&(
                                        <Typography variant="h6">
                                            Carregando...
                                        </Typography>
                                    )}
                                </Box>                                
                            </CardContent>
                        </Card>
                    </Grid2>
                    <Grid2 size={mdDom ? 12 : smDom ? 6 : 6}>
                    <Card>
                            <CardContent>
                                <Typography variant="h5" align="center"> 
                                    Total de Pessoas
                                </Typography>
                                <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                                    {!isLoadingPessoas&&(
                                        <Typography variant="h1">
                                           {totalcountPessoas}
                                        </Typography>
                                    )}
                                    <Typography variant="h1"> 
                                    
                                    </Typography>
                                    {isLoadingPessoas&&(
                                        <Typography variant="h6">
                                            Carregando...
                                        </Typography>
                                    )}
                                </Box>                                
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>
            </Grid2>
           </Box>
        </LayoutBaseDePagina>
    )
}