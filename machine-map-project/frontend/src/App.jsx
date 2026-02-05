import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MachineMapPage from "./pages/Machines/MachineMapPage";
import RouteCreatePage from "./pages/Routes/RouteCreatePage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/machines" element={<MachineMapPage />} />
                <Route path="/routes" element={<RouteCreatePage />} />
                <Route path="*" element={<Navigate to="/machines" replace />} />
            </Routes>
        </Router>
    );
}
