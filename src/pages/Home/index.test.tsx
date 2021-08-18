import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Home } from "./index";

const setup = () => {
  const utils = render(<Home />);
  const input = utils.getByPlaceholderText("Digite o nome do livro");
  const button = utils.getByText("Buscar");
  return {
    button,
    input,
    ...utils,
  };
};

test("Verifica renderização e titulo da pagina", () => {
  render(<Home />);
  const title = screen.getByText(/Explore livros na biblioteca da Google/i);
  expect(title).toBeInTheDocument();
});

test("Verifica se o input esta digitavél", () => {
  const { input } = setup();
  expect(input.value).toBe("");
  fireEvent.change(input, { target: { value: "Javascript" } });
  expect(input.value).toBe("Javascript");
});

test("Verifica se o botão esta clicavel", async () => {
  const { button, input } = setup();
  expect(input.value).toBe("");
  fireEvent.change(input, { target: { value: "Javascript" } });
  await fireEvent.click(button);

  expect(button).toHaveTextContent("Buscar");
});
