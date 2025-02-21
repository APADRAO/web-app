import { Button } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppThemeContext } from "../shared/contexts";

export const AppRouts = () => {
    const {toggleTheme } = useAppThemeContext();
    return (
        <Routes>

            <Route path="/pagina-Inicial" element={<Button variant='contained' color='primary' onClick={toggleTheme }>TESTE</Button>} />
            <Route path="*" element={<Navigate to="/pagina-Inicial"/>} />
        </Routes>
    );
};