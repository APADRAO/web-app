import { FerramenasDeDetalhe, FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"


export const DashBoard = () => {
    return (
        <LayoutBaseDePagina 
        titulo="PaginaInicial" 
        barraDeFerramentas={(
           
            <FerramenasDeDetalhe  mostrarBotaoSalvarEFechar/>
        )}>
            <> Conteudo</>
        </LayoutBaseDePagina>
    )
}