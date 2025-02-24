import { Box, Button, Paper, TextField, useTheme } from "@mui/material"
import { Component, ReactNode } from "react"
import { useIconeContext } from "../../contexts/IconeContexts";


interface IFerramentasDaListagemProps {
    textoBusca?:string;
    mosrarInputBusca?:boolean;
    aoMudarTextDeBusca?: (novoTexto:string) =>void
    textoBotaoNovo?:string;
    mosrarBotaoNovo?:boolean;
    aoClicaremNovo?: () =>void
} 

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
    textoBusca = '',
    mosrarInputBusca = false,
    aoMudarTextDeBusca,
    textoBotaoNovo = 'Novo',
    mosrarBotaoNovo=true,
    aoClicaremNovo,
}) => {
    
    const theme = useTheme();
    const{ selectedIcons } = useIconeContext()
    return(
        <Box 
        height={theme.spacing(5)} 
        marginX={1} 
        padding={1} 
        paddingX={2}
        display='flex'
        gap={1} 
        alignItems='center' 
        component={Paper}
        >
           {mosrarInputBusca && ( <TextField 
            size="small"
            placeholder="Pesquisar"
            value={textoBusca}
            onChange={(e)=>aoMudarTextDeBusca?.(e.target.value)}
            />)}
            <Box flex={1} display='flex' justifyContent='end'>
                {mosrarBotaoNovo &&(<Button
                variant="contained"
                color="primary"
                disableElevation
                endIcon={selectedIcons.add}
                onClick={aoClicaremNovo}
                >{textoBotaoNovo}</Button>)}
            </Box>
        </Box>
    )

}