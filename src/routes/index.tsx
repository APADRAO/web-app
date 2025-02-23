import { Button } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext     } from "../shared/contexts";

export const AppRouts = () => {
    const {toggleDrawerOpen } = useDrawerContext();
    return (
        <Routes>

            <Route path="/pagina-Inicial" element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen }>TESTE</Button>} />
            <Route path="*" element={<Navigate to="/pagina-Inicial"/>} />
        </Routes>
    );
};