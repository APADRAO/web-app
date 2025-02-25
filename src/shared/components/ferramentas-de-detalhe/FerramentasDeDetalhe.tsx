import { Box, Button, Divider, Paper, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useIconeContext } from "../../contexts/IconeContexts";

interface IFerramenasDeDetalheProps{
    textoBotaoNovo?:string
    
    mostrarBotaoNovo?: boolean
    mostrarBotaoVoltar?: boolean
    mostrarBotaoApagar?: boolean
    mostrarBotaoSalvar?: boolean
    mostrarBotaoSalvarEFechar?: boolean

    mostrarBotaoNovoCarregando?: boolean
    mostrarBotaoVoltarCarregando?: boolean
    mostrarBotaoApagarCarregando?: boolean
    mostrarBotaoSalvarCarregando?: boolean
    mostrarBotaoSalvarEFecharCarregando?: boolean

    aoClicarEmNovo?: () => void;
    aoClicarEmVoltar?: () => void;
    aoClicarEmApagar?: () => void;
    aoClicarEmSalvar?: () => void;
    aoClicarEmSalvarEFechar?: () => void;
}

export const FerramenasDeDetalhe: React.FC<IFerramenasDeDetalheProps> = ({
    textoBotaoNovo = 'Novo',    
    mostrarBotaoNovo = true,
    mostrarBotaoVoltar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarEFechar = false,

       
    mostrarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarEFecharCarregando = false,

    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoClicarEmSalvar,
    aoClicarEmSalvarEFechar,

}) =>{
    const theme = useTheme();
	const smDom = useMediaQuery(theme.breakpoints.down('sm'));
	const mdDom = useMediaQuery(theme.breakpoints.down('md'));
        const{ selectedIcons } = useIconeContext()
    return (
        <Box
            height={theme.spacing(5)} 
            marginX={1} 
            padding={1} 
            paddingX={2}
            display='flex'
            gap={1} 
            alignItems='center' 
            component={Paper}>
                {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando &&(<Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={aoClicarEmSalvar}
                    startIcon={selectedIcons.save}>
                        <Typography variant="button" whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                            Salvar
                        </Typography>
                        </Button>)}
                {mostrarBotaoSalvarCarregando &&( <Skeleton 
                    width={110}
                    height={60}
                    />)}
                    {mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDom && (<Button
                        variant="outlined"
                        color="primary"
                        disableElevation
                        onClick={aoClicarEmNovo}
                        startIcon={selectedIcons.add}>
                        <Typography variant="button" whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                            {textoBotaoNovo}
                        </Typography>
                        </Button>)}
                    {mostrarBotaoNovoCarregando && !smDom && ( <Skeleton width={110} height={60} />)}
                    {mostrarBotaoSalvarEFechar&& !mostrarBotaoSalvarEFecharCarregando && !smDom && !mdDom &&(<Button
                        variant="outlined"
                        color="primary"
                        disableElevation
                        onClick={aoClicarEmSalvarEFechar}
                        startIcon={selectedIcons.save}>
                        <Typography variant="button" whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                            Salvar e fechar
                        </Typography>
                    </Button>)}
                    {mostrarBotaoSalvarEFecharCarregando && !smDom && !mdDom &&( <Skeleton 
                    width={180}
                    height={60}
                    />)}
                    {mostrarBotaoApagar && !mostrarBotaoApagarCarregando &&(<Button
                        variant="outlined"
                        color="primary"
                        disableElevation
                        onClick={aoClicarEmApagar}
                        endIcon={selectedIcons.delete}>
                        <Typography variant="button" whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                            Apagar
                        </Typography>
                    </Button>)}
                    {mostrarBotaoApagarCarregando &&( <Skeleton 
                    width={110}
                    height={60}
                    />)}
                    {
                        (
                            mostrarBotaoVoltar && 
                            (mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvar || mostrarBotaoSalvarEFechar)
                        ) && (<Divider variant="middle" orientation='vertical' />)}
                    {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando &&(<Button
                        variant="outlined"
                        color="primary"
                        disableElevation
                        onClick={aoClicarEmVoltar}
                        endIcon={selectedIcons.back}>
                        <Typography variant="button" whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                            Voltar
                        </Typography>
                    </Button>)}
                    {mostrarBotaoVoltarCarregando &&( <Skeleton 
                    width={110}
                    height={60}
                    />)}
        </Box>
    )
}