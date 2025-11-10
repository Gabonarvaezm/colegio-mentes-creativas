import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GraficosMatematicas from "./GraficosMatematicas";
// Usamos waitFor para sincronizar con setTimeout sin modificar el componente

describe("GraficosMatematicas", () => {
  test("Muestra la primera pregunta al iniciar", () => {
    render(<GraficosMatematicas />);
    expect(screen.getByText("¿Qué día se registraron más ventas?")).toBeInTheDocument();
  });

  test("Permite seleccionar una respuesta", async () => {
    render(<GraficosMatematicas />);
    const button = screen.getByText("Viernes");
    await userEvent.click(button);
    expect(screen.getByTestId("score")).toHaveTextContent("Puntaje actual: 1");
  });

  test("Muestra la siguiente pregunta después de responder", async () => {
    render(<GraficosMatematicas />);
    const button = screen.getByText("Viernes");
    await userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText("¿Cuántas ventas se registraron el miércoles?"))
        .toBeInTheDocument();
    }, { timeout: 1500 });
  });

  test("Muestra los resultados al finalizar", async () => {
    render(<GraficosMatematicas />);
    const firstAnswer = screen.getByText("Viernes");
    await userEvent.click(firstAnswer);
    await waitFor(() => {
      expect(screen.getByText("¿Cuántas ventas se registraron el miércoles?"))
        .toBeInTheDocument();
    }, { timeout: 1500 });
    const secondAnswer = screen.getByText("38");
    await userEvent.click(secondAnswer);
    await waitFor(() => {
      expect(screen.getByText("¡Actividad Completada!"))
        .toBeInTheDocument();
    }, { timeout: 1500 });
  });

  test("Reintentar restablece estado y vuelve a la primera pregunta", async () => {
    render(<GraficosMatematicas />);
    const firstAnswer = screen.getByText("Viernes");
    await userEvent.click(firstAnswer);
    await waitFor(() => {
      expect(screen.getByText("¿Cuántas ventas se registraron el miércoles?"))
        .toBeInTheDocument();
    }, { timeout: 1500 });
    const secondAnswer = screen.getByText("38");
    await userEvent.click(secondAnswer);
    await waitFor(() => {
      expect(screen.getByText("¡Actividad Completada!"))
        .toBeInTheDocument();
    }, { timeout: 1500 });

    await userEvent.click(screen.getByRole("button", { name: /Reintentar/i }));
    expect(screen.getByText("¿Qué día se registraron más ventas?")).toBeInTheDocument();
    expect(screen.getByTestId("progreso")).toHaveTextContent("Pregunta 1 de 2");
    expect(screen.getByTestId("score")).toHaveTextContent("Puntaje actual: 0");
  });

  test("Cambia el tipo de gráfico al seleccionar opción", async () => {
    render(<GraficosMatematicas />);
    expect(screen.getByText(/Tipo de gráfico seleccionado: barras/i)).toBeInTheDocument();
    await userEvent.click(screen.getByText("Líneas"));
    expect(screen.getByText(/Tipo de gráfico seleccionado: líneas/i)).toBeInTheDocument();
    await userEvent.click(screen.getByText("Circular"));
    expect(screen.getByText(/Tipo de gráfico seleccionado: circular/i)).toBeInTheDocument();
  });

  test("Deshabilita opciones tras seleccionar una respuesta", async () => {
    render(<GraficosMatematicas />);
    const option = screen.getByText("Viernes");
    await userEvent.click(option);
    const allOptions = ["Lunes", "Martes", "Jueves", "Viernes"]; 
    allOptions.forEach((text) => {
      expect(screen.getByText(text)).toBeDisabled();
    });
  });

  // Sección de fallos intencionales para CI (serán corregidos luego)
  test("Muestra tipo 'barras' al iniciar (corrección)", () => {
    render(<GraficosMatematicas />);
    expect(screen.getByText(/Tipo de gráfico seleccionado: barras/i)).toBeInTheDocument();
  });

  test("Opciones habilitadas al iniciar sin respuesta (corrección)", () => {
    render(<GraficosMatematicas />);
    ["Lunes", "Martes", "Jueves", "Viernes"].forEach((text) => {
      expect(screen.getByText(text)).not.toBeDisabled();
    });
  });

  test("Muestra primera pregunta al iniciar (corrección)", () => {
    render(<GraficosMatematicas />);
    expect(screen.getByText("¿Qué día se registraron más ventas?")).toBeInTheDocument();
  });

  test("Oculta resultados al inicio", () => {
    render(<GraficosMatematicas />);
    expect(screen.queryByText("¡Actividad Completada!")).not.toBeInTheDocument();
  });

  // VERDE: encabezado correcto con acento, insensible al emoji
  test("Encabezado muestra 'Interpretación de Gráficos' (verde)", () => {
    render(<GraficosMatematicas />);
    expect(screen.getByText(/Interpretación de Gráficos/i)).toBeInTheDocument();
  });
});
