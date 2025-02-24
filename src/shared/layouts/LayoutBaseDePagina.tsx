import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDrawerContext } from "../contexts";
import { ReactNode } from "react";
import { useIconeContext } from "../contexts/IconeContexts";

interface ILayoutBasDePagina{
    children: ReactNode;
    titulo:string;
    barraDeFerramentas:ReactNode
}
export const LayoutBaseDePagina: React.FC<ILayoutBasDePagina> = ({ children, titulo, barraDeFerramentas })=>{
    const theme = useTheme();
	const smDom = useMediaQuery(theme.breakpoints.down('sm'));
	const mdDom = useMediaQuery(theme.breakpoints.down('md'));
    const { toggleDrawerOpen } = useDrawerContext()
    const { selectedIcons, setIcon } = useIconeContext();
    
    return(
        <Box height='100%' display='flex' flexDirection='column' gap={1}>
            <Box padding={1} display='flex' alignItems='center' height={theme.spacing(smDom ? 6: mdDom ? 8 : 12)} gap={1}>
                
                {smDom &&(<IconButton onClick={toggleDrawerOpen}>
                    {selectedIcons.menu}
                </IconButton>)}

                <Typography 
                variant={smDom ? 'h5': mdDom ? 'h4':'h3'}
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
                >
                    {titulo}
                </Typography>
                
            </Box>
            {barraDeFerramentas &&(<Box>
                {barraDeFerramentas}
            </Box>)}
            <Box flex={1} overflow='auto'>
                { children }
            </Box>
        </Box>

    );
};