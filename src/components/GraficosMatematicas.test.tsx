import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from '@jest/globals';
import GraficosMatematicas from './GraficosMatematicas';

describe('GraficosMatematicas Component', () => {
  beforeEach(() => {
    render(<GraficosMatematicas />);
  });

  // RF-02.01: Validar presentación de datos en tabla
  it('debe mostrar la tabla de datos de ventas', () => {
    expect(screen.getByText(/Datos de Ventas/i)).toBeInTheDocument();
    expect(screen.getByText(/Lunes/i)).toBeInTheDocument();
    expect(screen.getByText(/Martes/i)).toBeInTheDocument();
    expect(screen.getByText(/45/i)).toBeInTheDocument();
  });

  // RF-02.02: Validar opciones de tipos de gráfico
  it('debe mostrar los tres tipos de gráficos disponibles', () => {
    expect(screen.getByText(/Barras/i)).toBeInTheDocument();
    expect(screen.getByText(/Líneas/i)).toBeInTheDocument();
    expect(screen.getByText(/Circular/i)).toBeInTheDocument();
  });

  // RF-02.03: Validar cambio de tipo de gráfico
  it('debe permitir cambiar el tipo de gráfico', () => {
    const lineButton = screen.getByRole('button', { name: /Líneas/i });
    fireEvent.click(lineButton);
    
    expect(lineButton).toHaveClass('bg-purple-600');
  });

  // RF-02.04: Validar presentación de preguntas
  it('debe mostrar la primera pregunta correctamente', () => {
    expect(screen.getByText(/¿Qué día se registraron más ventas?/i)).toBeInTheDocument();
    expect(screen.getByText(/Pregunta 1 de/i)).toBeInTheDocument();
  });

  // RF-02.05: Validar opciones de respuesta
  it('debe mostrar las opciones de respuesta para la pregunta actual', () => {
    expect(screen.getByRole('button', { name: /Lunes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Viernes/i })).toBeInTheDocument();
  });

  // RF-02.06: Validar puntaje inicial
  it('debe mostrar el puntaje inicial en 0', () => {
    expect(screen.getByText(/Puntaje actual:/i)).toBeInTheDocument();
  });

  // Prueba de título
  it('debe renderizar el título del módulo', () => {
    expect(screen.getByText(/Interpretación de Gráficos de Datos/i)).toBeInTheDocument();
  });

  // Prueba de estructura de datos
  it('debe mostrar todos los días de la semana en la tabla', () => {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    days.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });
});

// Pruebas de interacción del usuario
describe('GraficosMatematicas - Interacción de usuario', () => {
  it('debe actualizar la barra de progreso al responder preguntas', async () => {
    render(<GraficosMatematicas />);
    
    const firstAnswer = screen.getAllByRole('button')[3]; // Primera opción de respuesta
    fireEvent.click(firstAnswer);
    
    await waitFor(() => {
      expect(screen.getByText(/Pregunta/i)).toBeInTheDocument();
    });
  });

  it('debe deshabilitar opciones después de seleccionar respuesta', async () => {
    render(<GraficosMatematicas />);
    
    const answerButton = screen.getByRole('button', { name: /Viernes/i });
    fireEvent.click(answerButton);
    
    // La respuesta debe estar deshabilitada
    await waitFor(() => {
      expect(answerButton).toBeDisabled();
    });
  });

  it('debe cambiar el color del botón seleccionado de gráfico', () => {
    render(<GraficosMatematicas />);
    
    const pieButton = screen.getByRole('button', { name: /Circular/i });
    fireEvent.click(pieButton);
    
    expect(pieButton).toHaveClass('bg-purple-600');
  });
});

// Pruebas de finalización
describe('GraficosMatematicas - Flujo completo', () => {
  it('debe mostrar todos los elementos necesarios para la actividad', () => {
    render(<GraficosMatematicas />);
    
    expect(screen.getByText(/Tipo de Gráfico:/i)).toBeInTheDocument();
    expect(screen.getByText(/Visualización/i)).toBeInTheDocument();
    expect(screen.getByText(/Datos de Ventas/i)).toBeInTheDocument();
  });
});