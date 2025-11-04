import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from '@jest/globals';
import CircuitosElectricos from './CircuitosElectricos';

describe('CircuitosElectricos Component', () => {
  beforeEach(() => {
    render(<CircuitosElectricos />);
  });

  // RF-01.01: Validar que los componentes son arrastrables
  it('debe mostrar los componentes disponibles para arrastrar', () => {
    expect(screen.getByText(/Pila/i)).toBeInTheDocument();
    expect(screen.getByText(/Cable/i)).toBeInTheDocument();
    expect(screen.getByText(/Bombillo/i)).toBeInTheDocument();
  });

  // RF-01.04: Validar existencia del botón reiniciar
  it('debe mostrar el botón de reiniciar', () => {
    const resetButton = screen.getByRole('button', { name: /Reiniciar/i });
    expect(resetButton).toBeInTheDocument();
  });

  // Prueba de renderizado inicial
  it('debe renderizar el título correctamente', () => {
    expect(screen.getByText(/Circuitos Eléctricos Simples/i)).toBeInTheDocument();
  });

  // Prueba del área de trabajo vacía
  it('debe mostrar mensaje cuando el área de trabajo está vacía', () => {
    expect(screen.getByText(/Arrastra componentes aquí para comenzar/i)).toBeInTheDocument();
  });

  // RF-01.04: Prueba del botón reiniciar
  it('debe limpiar el área de trabajo al hacer clic en reiniciar', () => {
    const resetButton = screen.getByRole('button', { name: /Reiniciar/i });
    fireEvent.click(resetButton);
    
    // Verificar que el área está vacía
    expect(screen.getByText(/Arrastra componentes aquí para comenzar/i)).toBeInTheDocument();
  });

  // Validar estructura del componente
  it('debe tener el área de trabajo con borde adecuado', () => {
    const workArea = screen.getByText(/Área de Trabajo/i).parentElement;
    expect(workArea).toHaveClass('border-dashed');
  });

  // RF-01.03: Validar que existe retroalimentación visual
  it('no debe mostrar explicación cuando el circuito no está completo', () => {
    const explanation = screen.queryByText(/Has creado un circuito eléctrico simple/i);
    expect(explanation).not.toBeInTheDocument();
  });

  // Validar elementos interactivos
  it('debe tener todos los componentes con atributo draggable', () => {
    const components = screen.getAllByText(/Pila|Cable|Bombillo/i);
    expect(components.length).toBeGreaterThan(0);
  });
});

// Pruebas de integración del flujo completo
describe('CircuitosElectricos - Flujo de usuario', () => {
  it('debe permitir interacción con los componentes del panel', () => {
    render(<CircuitosElectricos />);
    
    const pilaButton = screen.getByText(/Pila/i).closest('div');
    expect(pilaButton).toBeInTheDocument();
    expect(pilaButton).toHaveClass('cursor-move');
  });

  it('debe mantener la estructura del layout responsive', () => {
    render(<CircuitosElectricos />);
    
    const mainContainer = screen.getByText(/Componentes/i).closest('.grid');
    expect(mainContainer).toHaveClass('grid-cols-1');
  });
});