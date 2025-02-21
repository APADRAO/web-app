import { Navigate, Route, Routes } from "react-router-dom";

export const AppRouts =() => {
    return (
        <Routes>
            <Route path="/pagina-Inicial" element={<p>Pagina Inicial</p>} />
            <Route path="*" element={<Navigate to="/pagina-Inicial"/>} />
        </Routes>
    );
};