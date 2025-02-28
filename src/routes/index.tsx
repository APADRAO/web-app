import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext     } from "../shared/contexts";
import { useEffect } from "react";
import { useIconeContext } from "../shared/contexts/IconeContexts";
import { DashBoard, DetalheDePessoas, ListagenDePessoa, ListagenDeCidades, DetalheDeCidades } from "../pages";

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
            },
            {
                label:'Cidades',
                path: '/cidades',
                icon: selectedIcons.city
            }
        ]);
    },[setDrawerOptions,selectedIcons.home])
    return (
        <Routes>

            <Route path="/pagina-inicial" element={<DashBoard />} />
            <Route path="*" element={<Navigate to="/pagina-inicial"/>} />
            <Route path="/pessoas" element={<ListagenDePessoa />} />
            <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />            
            <Route path="/cidades" element={<ListagenDeCidades />} />            
            <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades />} />      
        </Routes>
    );
};