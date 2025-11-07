// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";
import { FaBolt, FaBookOpen, FaChartBar } from "react-icons/fa";

const mainItems = [
  { label: "Circuitos Eléctricos", route: "/circuitos", color: "from-yellow-300 to-orange-400", icon: <FaBolt /> },
  { label: "Creación de Cuentos", route: "/cuentos", color: "from-pink-300 to-fuchsia-400", icon: <FaBookOpen /> },
  { label: "Gráficos Matemáticos", route: "/graficos", color: "from-sky-300 to-emerald-400", icon: <FaChartBar /> },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-[260px] bg-gradient-to-b from-indigo-100 to-white p-4 shadow-lg border-r border-indigo-200">
      <h2 className="text-2xl font-bold text-indigo-700 text-center mb-6">Menú Principal</h2>
      <nav className="space-y-4">
        {mainItems.map((item) => (
          <NavLink
            key={item.route}
            to={item.route}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium transition-all
               bg-gradient-to-r ${item.color} shadow-md hover:scale-105
               ${isActive ? "ring-4 ring-indigo-300" : ""}`
            }
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
