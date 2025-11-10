//src\components\MultiplicationTable.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import MultiplicationTable from "./MultiplicationTable";

describe("MultiplicationTable", () => {
  test("renderiza el encabezado principal", () => {
    render(<MultiplicationTable />);
    expect(screen.getByText(/Tablas de Multiplicar/i)).toBeInTheDocument();
  });
  test("muestra la tabla de multiplicar cuando se genera", () => {
    // 1. Renderizar el componente
    render(<MultiplicationTable />);

    // 2. Obtener el input y el botón
    const input = screen.getByPlaceholderText("Número");
    const button = screen.getByRole("button", { name: /Generar/i });

    // 3. Simular escribir el número 5 en el input
    fireEvent.change(input, { target: { value: "5" } });

    // 4. Hacer clic en el botón "Generar"
    fireEvent.click(button);

    // 5. Verificar que aparece el título con "Tabla del 5"
    expect(screen.getByText("Tabla del 5")).toBeInTheDocument();

    // 6. Verificar que se generó el resultado correcto (ejemplo: 5 × 1 = 5)
    expect(screen.getByText("5 × 1 = 5")).toBeInTheDocument();
    expect(screen.getByText("5 × 10 = 50")).toBeInTheDocument();
  });

  test("genera 10 filas al crear la tabla", () => {
    render(<MultiplicationTable />);
    const input = screen.getByPlaceholderText("Número");
    const button = screen.getByRole("button", { name: /Generar/i });
    fireEvent.change(input, { target: { value: "3" } });
    fireEvent.click(button);
    // Debe generar del 1 al 10
    expect(screen.getByText("3 × 10 = 30")).toBeInTheDocument();
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(10);
  });

  test("no genera tabla si el input está vacío", () => {
    render(<MultiplicationTable />);
    const button = screen.getByRole("button", { name: /Generar/i });

    // Clic sin haber ingresado número
    fireEvent.click(button);

    // La tabla no debe mostrarse
    expect(screen.queryByText(/Tabla del/)).toBeNull();
  });
});
