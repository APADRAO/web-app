import { Box, Paper } from "@mui/material"
import { FerramenasDeDetalhe, FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"


export const DashBoard = () => {
    return (
        <LayoutBaseDePagina 
        titulo="Pagina Inicial" 
        barraDeFerramentas={(
           
            <FerramentasDaListagem mosrarInputBusca/>
        )}>
           <Box height='100%' display='flex' flexDirection='column' gap={1} component={Paper} variant="outlined" margin={1}>
            
           </Box>
        </LayoutBaseDePagina>
    )
}