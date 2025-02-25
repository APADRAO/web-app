import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext     } from "../shared/contexts";
import { useEffect } from "react";
import { useIconeContext } from "../shared/contexts/IconeContexts";

export const AppRouts = () => {
    const { selectedIcons,  } = useIconeContext();
    const  {setDrawerOptions} = useDrawerContext();
    useEffect(()=>{
        setDrawerOptions([
            {
                label:'Página Inicial',
                path: '/pagina-inicial',
                icon: selectedIcons.home
            }
        ]);
    },[setDrawerOptions,selectedIcons.home])
    return (
        <Routes>

            <Route path="/pagina-inicial" element={<>teste</>} />
            <Route path="*" element={<Navigate to="/pagina-inicial"/>} />
            {/*<Route path="/cidades" element={<ListagenDeCidade />} />
            {/*<Route path="/cidades/detalhe/:id" element={<DashBoard />} />*/}
        </Routes>
    );
};