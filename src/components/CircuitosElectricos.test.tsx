// src/components/CircuitosElectricos.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import CircuitosElectricos from "./CircuitosElectricos";

describe("CircuitosElectricos Component", () => {
  beforeEach(() => {
    render(<CircuitosElectricos />);
  });

  test("debe renderizar el título y los componentes disponibles", () => {
    expect(screen.getByText(/Circuitos Eléctricos Simples/i)).toBeInTheDocument();
    expect(screen.getByText(/Pila/i)).toBeInTheDocument();
    expect(screen.getByText(/Cable/i)).toBeInTheDocument();
    expect(screen.getByText(/Bombillo/i)).toBeInTheDocument();
  });

  test("debe mostrar mensaje inicial en el área de trabajo", () => {
    expect(
      screen.getByText(/Arrastra componentes aquí para comenzar/i)
    ).toBeInTheDocument();
  });

  test("debe mostrar el botón reiniciar", () => {
    const resetButton = screen.getByTestId("boton-reiniciar");
    expect(resetButton).toBeInTheDocument();
  });

  test("debe limpiar el área de trabajo al hacer clic en reiniciar", () => {
    const resetButton = screen.getByTestId("boton-reiniciar");
    fireEvent.click(resetButton);
    expect(
      screen.getByText(/Arrastra componentes aquí para comenzar/i)
    ).toBeInTheDocument();
  });

  test("el área de trabajo debe tener borde punteado", () => {
    const workArea = screen.getByTestId("area-trabajo");
    expect(workArea).toHaveClass("border-dashed");
  });

  test("no debe mostrar explicación al inicio", () => {
    const explanation = screen.queryByTestId("explicacion");
    expect(explanation).not.toBeInTheDocument();
  });

  test("debe tener layout responsive", () => {
    const layout = screen.getByTestId("layout");
    expect(layout).toHaveClass("grid-cols-1");
  });

  test("debe listar 3 componentes disponibles en el panel", () => {
    const panel = screen.getByTestId("panel-componentes");
    const draggables = panel.querySelectorAll('[draggable="true"]');
    expect(draggables.length).toBe(3);
    expect(screen.getByText(/Pila/i)).toBeInTheDocument();
    expect(screen.getByText(/Cable/i)).toBeInTheDocument();
    expect(screen.getByText(/Bombillo/i)).toBeInTheDocument();
  });
});

// Sección de fallos intencionales para CI (serán corregidos luego)
describe("CircuitosElectricos - Fallos intencionales", () => {
  test("no debe mostrar explicación al inicio (corrección)", () => {
    render(<CircuitosElectricos />);
    const explanation = screen.queryByTestId("explicacion");
    expect(explanation).not.toBeInTheDocument();
  });

  test("debe tener layout con 1 columna al inicio (corrección)", () => {
    render(<CircuitosElectricos />);
    const layout = screen.getByTestId("layout");
    expect(layout).toHaveClass("grid-cols-1");
  });

  test("botón reiniciar debe estar habilitado (corrección)", () => {
    render(<CircuitosElectricos />);
    const resetButton = screen.getByTestId("boton-reiniciar");
    expect(resetButton).not.toBeDisabled();
  });

  test("debe mostrar el título correcto (corrección)", () => {
    render(<CircuitosElectricos />);
    expect(screen.getByText(/Circuitos Eléctricos Simples/i)).toBeInTheDocument();
  });

  // ROJO: texto del botón incorrecto (espera 'Reinicio')
  test("texto del botón reinicio (rojo)", () => {
    render(<CircuitosElectricos />);
    expect(screen.getByRole("button", { name: /Reinicio/i })).toBeInTheDocument();
  });

  // ROJO: layout con 2 columnas al inicio
  test("layout muestra 2 columnas al inicio (rojo)", () => {
    render(<CircuitosElectricos />);
    const layout = screen.getByTestId("layout");
    expect(layout).toHaveClass("grid-cols-2");
  });
});
