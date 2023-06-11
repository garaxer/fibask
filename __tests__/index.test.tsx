import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../src/pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    render(<Home />);
  });
  it("renders a heading", () => {
    const heading = screen.getByRole("heading", {
      name: /Fibonacci Guesser/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it("allows you to enter a message", async () => {
    const guessInput = screen.getByPlaceholderText("Guess");

    expect(guessInput).toBeInTheDocument();

    fireEvent.change(guessInput, { target: { value: "11" } });
    fireEvent.keyDown(guessInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    const firstResponse = await screen.findByText(
      "Please enter the first number"
    );

    expect(firstResponse).toBeInTheDocument();

    fireEvent.change(guessInput, { target: { value: "10" } });

    const button = screen.getByRole("button", { name: "Send" });
    fireEvent.click(button);

    const secondResponse = await screen.findByText(
      "Please enter the next number"
    );

    expect(secondResponse).toBeInTheDocument();
  });
});
