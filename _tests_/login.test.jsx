// __tests__/login.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../app/login/page";

describe("Login Page", () => {
  it("renders the login form", () => {
    render(<Login />);
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
  });

  it("shows error message on invalid email", async () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText(/mail@simple.com/i);
    const submitButton = screen.getByText(/Log In/i);

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText(/Veuillez entrer un email correct/i)
    ).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    render(<Login />);
    const passwordInput = screen.getByPlaceholderText(/Min. 8 characters/i);
    const toggleButton = screen.getByRole("button", { name: /eye/i });

    // Initially password should be hidden
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click to show password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click again to hide password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
