import { Button } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext     } from "../shared/contexts";
import { DashBoard } from "../pages";

export const AppRouts = () => {
    
    return (
        <Routes>

            <Route path="/pagina-Inicial" element={<DashBoard />} />
            <Route path="*" element={<Navigate to="/pagina-Inicial"/>} />
        </Routes>
    );
};