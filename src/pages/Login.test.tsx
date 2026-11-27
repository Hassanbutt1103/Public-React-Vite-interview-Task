import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

const mockLogin = jest.fn();
const mockNavigate = jest.fn();

jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows live prefix error as soon as another country code is typed", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/phone number/i);
    fireEvent.change(input, { target: { value: "+92" } });

    expect(
      screen.getByText(/only \+254 country code is allowed/i)
    ).toBeInTheDocument();
  });

  it("logs in and navigates to /home when valid demo phone is submitted", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/phone number/i);
    fireEvent.change(input, { target: { value: "+254712345678" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/home", { replace: true });
  });
});