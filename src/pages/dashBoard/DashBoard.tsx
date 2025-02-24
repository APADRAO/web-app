import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"


export const DashBoard = () => {
    return (
        <LayoutBaseDePagina 
        titulo="PaginaInicial" 
        barraDeFerramentas={(
            <FerramentasDaListagem mosrarInputBusca textoBotaoNovo="Busca"/>
        )}>
            <> Conteudo</>
        </LayoutBaseDePagina>
    )
}