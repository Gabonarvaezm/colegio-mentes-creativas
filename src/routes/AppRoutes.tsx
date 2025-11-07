import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

import CircuitosElectricosView from "../views/CircuitosElectricosView";
import CreacionCuentosView from "../views/CreacionCuentosView";
import GraficosMatematicasView from "../views/GraficosMatematicasView";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CircuitosElectricosView />} />
        <Route path="circuitos" element={<CircuitosElectricosView />} />
        <Route path="cuentos" element={<CreacionCuentosView />} />
        <Route path="graficos" element={<GraficosMatematicasView />} />
      </Route>
    </Routes>
  );
}
