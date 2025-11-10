import { render, screen } from "@testing-library/react";
import App from "./App";

test("renderiza la marca principal en el layout", () => {
  render(<App />);
  // El App monta Layout con Navbar; verificamos la marca estable
  expect(screen.getByText(/UCC : Prácticas Desarrollo/i)).toBeInTheDocument();
});