import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from '@jest/globals';
import CreacionCuentos from './CreacionCuentos';

describe('CreacionCuentos Component', () => {
  beforeEach(() => {
    render(<CreacionCuentos />);
  });

  // RF-03.01: Validar opciones de personajes
  it('debe mostrar al menos 5 opciones de personajes', () => {
    expect(screen.getByText(/un valiente caballero/i)).toBeInTheDocument();
    expect(screen.getByText(/una princesa curiosa/i)).toBeInTheDocument();
    expect(screen.getByText(/un dragón amigable/i)).toBeInTheDocument();
    expect(screen.getByText(/un robot inteligente/i)).toBeInTheDocument();
    expect(screen.getByText(/una científica brillante/i)).toBeInTheDocument();
  });

  // RF-03.02: Validar opciones de escenarios
  it('debe mostrar al menos 4 opciones de lugares', () => {
    expect(screen.getByText(/un castillo mágico/i)).toBeInTheDocument();
    expect(screen.getByText(/un bosque encantado/i)).toBeInTheDocument();
    expect(screen.getByText(/una ciudad futurista/i)).toBeInTheDocument();
    expect(screen.getByText(/una isla misteriosa/i)).toBeInTheDocument();
  });

  // RF-03.03: Validar opciones de acciones
  it('debe mostrar al menos 6 opciones de acciones', () => {
    expect(screen.getByText(/encontró un mapa del tesoro/i)).toBeInTheDocument();
    expect(screen.getByText(/hizo un nuevo amigo inesperado/i)).toBeInTheDocument();
    expect(screen.getByText(/descubrió un poder especial/i)).toBeInTheDocument();
    expect(screen.getByText(/resolvió un enigma complicado/i)).toBeInTheDocument();
    expect(screen.getByText(/salvó a alguien en peligro/i)).toBeInTheDocument();
    expect(screen.getByText(/aprendió una lección importante/i)).toBeInTheDocument();
  });

  // RF-03.06: Validar botón de generar cuento
  it('debe tener el botón para generar el cuento', () => {
    expect(screen.getByRole('button', { name: /Generar Mi Cuento/i })).toBeInTheDocument();
  });

  // Prueba de título
  it('debe renderizar el título del módulo', () => {
    expect(screen.getByText(/Creación de Textos Narrativos/i)).toBeInTheDocument();
  });

  // Prueba de instrucciones
  it('debe mostrar instrucciones claras para el usuario', () => {
    expect(screen.getByText(/Elige tu personaje principal/i)).toBeInTheDocument();
    expect(screen.getByText(/Selecciona el lugar de la historia/i)).toBeInTheDocument();
    expect(screen.getByText(/Elige las acciones de la historia/i)).toBeInTheDocument();
  });

  // RF-03.03: Validar límite de acciones
  it('debe mostrar el contador de acciones seleccionadas', () => {
    expect(screen.getByText(/Seleccionadas: 0\/3/i)).toBeInTheDocument();
  });

  // Validar estado inicial del botón generar
  it('debe deshabilitar el botón generar si no hay selecciones', () => {
    const generateButton = screen.getByRole('button', { name: /Generar Mi Cuento/i });
    expect(generateButton).toBeDisabled();
  });
});

// Pruebas de interacción del usuario
describe('CreacionCuentos - Interacción de usuario', () => {
  it('debe permitir seleccionar un personaje', () => {
    render(<CreacionCuentos />);
    
    const characterButton = screen.getByText(/un valiente caballero/i).closest('button');
    fireEvent.click(characterButton!);
    
    expect(characterButton).toHaveClass('bg-amber-500');
  });

  it('debe permitir seleccionar un lugar', () => {
    render(<CreacionCuentos />);
    
    const settingButton = screen.getByText(/un castillo mágico/i).closest('button');
    fireEvent.click(settingButton!);
    
    expect(settingButton).toHaveClass('bg-orange-500');
  });

  it('debe permitir seleccionar acciones', () => {
    render(<CreacionCuentos />);
    
    const actionButton = screen.getByText(/encontró un mapa del tesoro/i).closest('button');
    fireEvent.click(actionButton!);
    
    expect(actionButton).toHaveClass('bg-green-500');
  });

  it('debe actualizar el contador al seleccionar acciones', () => {
    render(<CreacionCuentos />);
    
    const action1 = screen.getByText(/encontró un mapa del tesoro/i).closest('button');
    fireEvent.click(action1!);
    
    expect(screen.getByText(/Seleccionadas: 1\/3/i)).toBeInTheDocument();
  });

  it('debe limitar la selección a máximo 3 acciones', () => {
    render(<CreacionCuentos />);
    
    const actions = screen.getAllByRole('button').filter(btn => 
      btn.textContent?.includes('encontró') || 
      btn.textContent?.includes('hizo') ||
      btn.textContent?.includes('descubrió') ||
      btn.textContent?.includes('resolvió')
    );
    
    // Seleccionar 4 acciones
    fireEvent.click(actions[0]);
    fireEvent.click(actions[1]);
    fireEvent.click(actions[2]);
    fireEvent.click(actions[3]);
    
    // Debe mostrar solo 3 seleccionadas
    expect(screen.getByText(/Seleccionadas: 3\/3/i)).toBeInTheDocument();
  });
});

// Pruebas de generación de cuento
describe('CreacionCuentos - Generación de cuento', () => {
  it('debe generar un cuento cuando todas las selecciones están completas', () => {
    render(<CreacionCuentos />);
    
    // Seleccionar personaje
    const character = screen.getByText(/un valiente caballero/i).closest('button');
    fireEvent.click(character!);
    
    // Seleccionar lugar
    const setting = screen.getByText(/un castillo mágico/i).closest('button');
    fireEvent.click(setting!);
    
    // Seleccionar acción
    const action = screen.getByText(/encontró un mapa del tesoro/i).closest('button');
    fireEvent.click(action!);
    
    // Generar cuento
    const generateButton = screen.getByRole('button', { name: /Generar Mi Cuento/i });
    expect(generateButton).not.toBeDisabled();
    fireEvent.click(generateButton);
    
    // Verificar que se muestra el cuento
    waitFor(() => {
      expect(screen.getByText(/Tu Cuento Creado/i)).toBeInTheDocument();
    });
  });

  it('debe habilitar el botón generar solo con todas las selecciones', () => {
    render(<CreacionCuentos />);
    
    const generateButton = screen.getByRole('button', { name: /Generar Mi Cuento/i });
    expect(generateButton).toBeDisabled();
    
    // Seleccionar personaje
    fireEvent.click(screen.getByText(/un valiente caballero/i).closest('button')!);
    expect(generateButton).toBeDisabled();
    
    // Seleccionar lugar
    fireEvent.click(screen.getByText(/un castillo mágico/i).closest('button')!);
    expect(generateButton).toBeDisabled();
    
    // Seleccionar acción
    fireEvent.click(screen.getByText(/encontró un mapa del tesoro/i).closest('button')!);
    expect(generateButton).not.toBeDisabled();
  });
});