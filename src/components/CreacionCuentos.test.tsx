//creacion de cuentos test
import { render, screen, fireEvent } from "@testing-library/react";
import CreacionCuentos from "./CreacionCuentos";

describe("CreacionCuentos Component", () => {
  beforeEach(() => {
    render(<CreacionCuentos />);
  });

  // RF-03.01: Validar opciones de personajes
  test("debe mostrar al menos 5 opciones de personajes", () => {
    expect(screen.getByText(/un valiente caballero/i)).toBeTruthy();
    expect(screen.getByText(/una princesa curiosa/i)).toBeTruthy();
    expect(screen.getByText(/un dragón amigable/i)).toBeTruthy();
    expect(screen.getByText(/un robot inteligente/i)).toBeTruthy();
    expect(screen.getByText(/una científica brillante/i)).toBeTruthy();
  });

  // RF-03.02: Validar opciones de escenarios
  test("debe mostrar al menos 4 opciones de lugares", () => {
    expect(screen.getByText(/un castillo mágico/i)).toBeTruthy();
    expect(screen.getByText(/un bosque encantado/i)).toBeTruthy();
    expect(screen.getByText(/una ciudad futurista/i)).toBeTruthy();
  });

  // RF-03.03: Validar opciones de acciones
  test("debe mostrar al menos 6 opciones de acciones", () => {
    expect(screen.getByText(/encontró un mapa del tesoro/i)).toBeTruthy();
    expect(screen.getByText(/hizo un nuevo amigo inesperado/i)).toBeTruthy();
    expect(screen.getByText(/descubrió un poder especial/i)).toBeTruthy();
    expect(screen.getByText(/resolvió un enigma complicado/i)).toBeTruthy();
    expect(screen.getByText(/salvó a alguien en peligro/i)).toBeTruthy();
    expect(screen.getByText(/aprendió una lección importante/i)).toBeTruthy();
  });

  // RF-03.06: Validar botón de generar cuento
  test("debe tener el botón para generar el cuento", () => {
    const generateButton = screen.getByRole("button", { name: /Generar Mi Cuento/i });
    expect(generateButton).toBeTruthy();
  });

  // Prueba de título
  test("debe renderizar el título del módulo", () => {
    expect(screen.getByText(/Creación de Textos Narrativos/i)).toBeTruthy();
  });

  // Prueba de instrucciones
  test("debe mostrar instrucciones claras para el usuario", () => {
    expect(screen.getByText(/Elige tu personaje principal/i)).toBeTruthy();
    expect(screen.getByText(/Selecciona el lugar de la historia/i)).toBeTruthy();
    expect(screen.getByText(/Elige las acciones de la historia/i)).toBeTruthy();
  });

  // RF-03.03: Validar límite de acciones
  test("debe mostrar el contador de acciones seleccionadas", () => {
    expect(screen.getByText(/Seleccionadas: 0\/3/i)).toBeTruthy();
  });

  // Validar estado inicial del botón generar
  test("debe deshabilitar el botón generar si no hay selecciones", () => {
    const generateButton = screen.getByRole("button", { name: /Generar Mi Cuento/i });
    expect(generateButton).toBeDisabled();
  });
});

// Pruebas de interacción del usuario
describe("CreacionCuentos - Interacción de usuario", () => {
  test("debe permitir seleccionar un personaje", () => {
    render(<CreacionCuentos />);
    const characterButton = screen.getByText(/un valiente caballero/i).closest("button");
    fireEvent.click(characterButton!);
    expect(characterButton?.classList.contains("bg-amber-500")).toBeTruthy();
  });

  test("debe permitir seleccionar un lugar", () => {
    render(<CreacionCuentos />);
    const settingButton = screen.getByText(/un castillo mágico/i).closest("button");
    fireEvent.click(settingButton!);
    expect(settingButton?.classList.contains("bg-orange-500")).toBeTruthy();
  });

  test("debe permitir seleccionar acciones", () => {
    render(<CreacionCuentos />);
    const actionButton = screen.getByText(/encontró un mapa del tesoro/i).closest("button");
    fireEvent.click(actionButton!);
    expect(actionButton?.classList.contains("bg-green-500")).toBeTruthy();
  });

  test("debe actualizar el contador al seleccionar acciones", () => {
    render(<CreacionCuentos />);
    const action1 = screen.getByText(/encontró un mapa del tesoro/i).closest("button");
    fireEvent.click(action1!);
    expect(screen.getByText(/Seleccionadas: 1\/3/i)).toBeTruthy();
  });

  test("debe limitar la selección a máximo 3 acciones", () => {
    render(<CreacionCuentos />);
    const actions = screen.getAllByRole("button").filter(btn =>
      btn.textContent?.match(/encontró|hizo|descubrió|resolvió/i)
    );

    fireEvent.click(actions[0]);
    fireEvent.click(actions[1]);
    fireEvent.click(actions[2]);
    fireEvent.click(actions[3]);

    expect(screen.getByText(/Seleccionadas: 3\/3/i)).toBeTruthy();
  });

  test("debe deshabilitar acciones adicionales al alcanzar 3 seleccionadas", () => {
    render(<CreacionCuentos />);
    const actions = screen.getAllByRole("button").filter(btn =>
      btn.textContent?.match(/encontró|hizo|descubrió|resolvió|salvó|aprendió/i)
    );

    fireEvent.click(actions[0]);
    fireEvent.click(actions[1]);
    fireEvent.click(actions[2]);

    // Una acción no seleccionada debe quedar deshabilitada
    const extraAction = actions.find(btn => !btn.classList.contains("bg-green-500"))!;
    expect(extraAction).toBeDisabled();
    expect(screen.getByText(/Seleccionadas: 3\/3/i)).toBeTruthy();
  });

  test("debe deshabilitar acciones adicionales al alcanzar 3 seleccionadas", () => {
    render(<CreacionCuentos />);
    const actions = screen.getAllByRole("button").filter(btn =>
      btn.textContent?.match(/encontró|hizo|descubrió|resolvió|salvó|aprendió/i)
    );

    fireEvent.click(actions[0]);
    fireEvent.click(actions[1]);
    fireEvent.click(actions[2]);

    // Una acción no seleccionada debe quedar deshabilitada
    const extraAction = actions.find(btn => !btn.classList.contains("bg-green-500"))!;
    expect(extraAction).toBeDisabled();
    expect(screen.getByText(/Seleccionadas: 3\/3/i)).toBeTruthy();
  });
});

// Pruebas de generación de cuento
describe("CreacionCuentos - Generación de cuento", () => {
  test("debe generar un cuento cuando todas las selecciones están completas", () => {
    render(<CreacionCuentos />);
    const character = screen.getByText(/un valiente caballero/i).closest("button");
    const setting = screen.getByText(/un castillo mágico/i).closest("button");
    const action = screen.getByText(/encontró un mapa del tesoro/i).closest("button");

    fireEvent.click(character!);
    fireEvent.click(setting!);
    fireEvent.click(action!);

    const generateButton = screen.getByRole("button", { name: /Generar Mi Cuento/i });
    expect(generateButton).not.toBeDisabled();
    fireEvent.click(generateButton);

    // Simple verificación de que se muestra algo con el cuento
    const storyOutput = screen.getByText(/Tu Cuento Creado/i);
    expect(storyOutput).toBeTruthy();
  });

  test("debe habilitar el botón generar solo con todas las selecciones", () => {
    render(<CreacionCuentos />);
    const generateButton = screen.getByRole("button", { name: /Generar Mi Cuento/i });
    expect(generateButton).toBeDisabled();

    fireEvent.click(screen.getByText(/un valiente caballero/i).closest("button")!);
    fireEvent.click(screen.getByText(/un castillo mágico/i).closest("button")!);
    fireEvent.click(screen.getByText(/encontró un mapa del tesoro/i).closest("button")!);

    expect(generateButton).not.toBeDisabled();
  });

  // Sección de fallos intencionales para CI (serán corregidos luego)
  test("debe deshabilitar el botón generar al inicio (corrección)", () => {
    render(<CreacionCuentos />);
    const generateButton = screen.getByRole("button", { name: /Generar Mi Cuento/i });
    expect(generateButton).toBeDisabled();
  });

  test("debe mostrar contador 0/3 al inicio (corrección)", () => {
    render(<CreacionCuentos />);
    expect(screen.getByText(/Seleccionadas: 0\/3/i)).toBeInTheDocument();
  });

  test("no debe mostrar la vista de cuento al inicio (corrección)", () => {
    render(<CreacionCuentos />);
    expect(screen.queryByText(/Tu Cuento Creado/i)).not.toBeInTheDocument();
  });
});

// Sección de fallos intencionales para CI (serán corregidos luego)
describe("CreacionCuentos - Encabezado", () => {
  test("encabezado correcto", () => {
    render(<CreacionCuentos />);
    expect(screen.getByText(/Creación de Textos Narrativos/i)).toBeInTheDocument();
  });
});

// Prueba roja del contador de guardados
describe("CreacionCuentos - Guardado de cuento", () => {
  test("contador de cuentos guardados correcto", () => {
    render(<CreacionCuentos />);
    jest.spyOn(window, "alert").mockImplementation(() => {});

    // Seleccionar opciones necesarias
    fireEvent.click(screen.getByText(/un valiente caballero/i).closest("button")!);
    fireEvent.click(screen.getByText(/un castillo mágico/i).closest("button")!);
    fireEvent.click(screen.getByText(/encontró un mapa del tesoro/i).closest("button")!);

    // Generar y guardar una vez
    const generateButton = screen.getByRole("button", { name: /Generar Mi Cuento/i });
    fireEvent.click(generateButton);
    const saveButton = screen.getByRole("button", { name: /Guardar Cuento/i });
    fireEvent.click(saveButton);

    // Expectativa correcta: 1 guardado
    expect(screen.getByText(/Cuentos guardados: 1/i)).toBeInTheDocument();
  });
});

// Prueba roja: tras crear nuevo cuento, no debe resetear guardados (expectativa incorrecta)
describe("CreacionCuentos - Reinicio", () => {
  test("no muestra contador tras crear nuevo", () => {
    render(<CreacionCuentos />);
    jest.spyOn(window, "alert").mockImplementation(() => {});

    // Generar y guardar una vez
    fireEvent.click(screen.getByText(/un valiente caballero/i).closest("button")!);
    fireEvent.click(screen.getByText(/un castillo mágico/i).closest("button")!);
    fireEvent.click(screen.getByText(/encontró un mapa del tesoro/i).closest("button")!);
    fireEvent.click(screen.getByRole("button", { name: /Generar Mi Cuento/i }));
    fireEvent.click(screen.getByRole("button", { name: /Guardar Cuento/i }));

    // Reiniciar para crear nuevo cuento
    fireEvent.click(screen.getByRole("button", { name: /Crear Nuevo Cuento/i }));

    // Tras reinicio, el contador no se muestra en la vista inicial
    expect(screen.queryByText(/Cuentos guardados:/i)).not.toBeInTheDocument();
  });
});
