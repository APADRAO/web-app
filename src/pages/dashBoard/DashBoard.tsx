import { FerramenasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"


export const DashBoard = () => {
    return (
        <LayoutBaseDePagina 
        titulo="Pagina Inicial" 
        barraDeFerramentas={(
           
            <FerramenasDeDetalhe  mostrarBotaoSalvarEFechar/>
        )}>
            <> Conteudo</>
        </LayoutBaseDePagina>
    )
}