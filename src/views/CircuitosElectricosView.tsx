// src/components/CircuitosElectricos.tsx
import { useState } from "react";

interface Component {
  id: string;
  type: "battery" | "wire" | "bulb";
  position: { x: number; y: number };
}

export default function CircuitosElectricos() {
  const [components, setComponents] = useState<Component[]>([]);
  const [isCircuitComplete, setIsCircuitComplete] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const availableComponents = [
    { type: "battery" as const, label: "Pila", icon: "🔋", color: "bg-yellow-300" },
    { type: "wire" as const, label: "Cable", icon: "➖", color: "bg-gray-400" },
    { type: "bulb" as const, label: "Bombillo", icon: "💡", color: "bg-orange-200" },
  ];

  const handleDragStart = (type: string) => {
    setDraggedItem(type);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggedItem) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newComponent: Component = {
      id: `${draggedItem}-${Date.now()}`,
      type: draggedItem as "battery" | "wire" | "bulb",
      position: { x, y },
    };

    const updated = [...components, newComponent];
    setComponents(updated);
    checkCircuit(updated);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const checkCircuit = (comps: Component[]) => {
    const hasBattery = comps.some((c) => c.type === "battery");
    const hasWires = comps.filter((c) => c.type === "wire").length >= 2;
    const hasBulb = comps.some((c) => c.type === "bulb");

    if (hasBattery && hasWires && hasBulb) {
      setIsCircuitComplete(true);
      setShowExplanation(true);
    } else {
      setIsCircuitComplete(false);
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setComponents([]);
    setIsCircuitComplete(false);
    setShowExplanation(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-900 mb-2">
          Circuitos Eléctricos Simples
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Arrastra los componentes al área de trabajo para crear tu circuito
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Panel de componentes */}
          <div className="md:col-span-1 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Componentes</h2>
            <div className="space-y-4">
              {availableComponents.map((comp) => (
                <div
                  key={comp.type}
                  draggable
                  onDragStart={() => handleDragStart(comp.type)}
                  className={`${comp.color} p-4 rounded-lg cursor-move hover:scale-105 transition-transform shadow-md`}
                >
                  <div className="text-3xl text-center mb-2">{comp.icon}</div>
                  <div className="text-sm font-semibold text-center text-gray-800">
                    {comp.label}
                  </div>
                </div>
              ))}
            </div>

            <button
              data-testid="boton-reiniciar"
              onClick={handleReset}
              className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Reiniciar
            </button>
          </div>

          {/* Área de trabajo */}
          <div className="md:col-span-3">
            <div
              data-testid="area-trabajo"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`relative bg-white rounded-lg shadow-lg p-8 min-h-[500px] border-4 ${
                isCircuitComplete ? "border-green-500" : "border-gray-300"
              } border-dashed transition-colors`}
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Área de Trabajo
              </h3>

              {components.length === 0 && (
                <div className="flex items-center justify-center h-full text-gray-400 text-xl">
                  Arrastra componentes aquí para comenzar
                </div>
              )}

              {/* Mostrar componentes arrastrados */}
              {components.map((comp) => {
                const compInfo = availableComponents.find((c) => c.type === comp.type);
                return (
                  <div
                    key={comp.id}
                    style={{
                      position: "absolute",
                      left: comp.position.x,
                      top: comp.position.y,
                      transform: "translate(-50%, -50%)",
                    }}
                    className="text-3xl"
                  >
                    {compInfo?.icon}
                  </div>
                );
              })}

              {isCircuitComplete && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg animate-bounce">
                  ¡Circuito Completo!
                </div>
              )}
            </div>

            {showExplanation && (
              <div className="mt-6 bg-green-50 border-2 border-green-500 rounded-lg p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-green-800 mb-3">
                  Excelente trabajo
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Has creado un circuito eléctrico simple. La energía fluye desde la pila,
                  pasa por los cables y llega al bombillo, que se enciende al recibir la corriente.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
