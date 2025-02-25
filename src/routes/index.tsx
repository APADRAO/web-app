import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext     } from "../shared/contexts";
import { useEffect } from "react";
import { useIconeContext } from "../shared/contexts/IconeContexts";
import { DashBoard, ListagenDePessoa } from "../pages";

export const AppRouts = () => {
    const { selectedIcons,  } = useIconeContext();
    const  {setDrawerOptions} = useDrawerContext();
    useEffect(()=>{
        setDrawerOptions([
            {
                label:'Página Inicial',
                path: '/pagina-inicial',
                icon: selectedIcons.home
            },
            {
                label:'Pessoas',
                path: '/pessoas',
                icon: selectedIcons.people
            }
        ]);
    },[setDrawerOptions,selectedIcons.home])
    return (
        <Routes>

            <Route path="/pagina-inicial" element={<DashBoard />} />
            <Route path="*" element={<Navigate to="/pagina-inicial"/>} />
            <Route path="/pessoas" element={<ListagenDePessoa />} />
            {/*<Route path="/cidades/detalhe/:id" element={<DashBoard />} />*/}
        </Routes>
    );
};