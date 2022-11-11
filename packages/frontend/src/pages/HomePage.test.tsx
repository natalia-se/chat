import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("HomePage", () => {
  it("render welcome message", () => {
    render(<HomePage />);
    const welcomeElement = screen.getByText(/Welcome to our friends chat!/i);
    expect(welcomeElement).toBeInTheDocument();
  });
});
