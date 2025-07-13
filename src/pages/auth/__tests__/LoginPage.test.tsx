import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../LoginPage.tsx";
import { type Mock, vi } from "vitest";
import { login } from "../../../api/auth.ts";
import { message } from "antd";
import { BrowserRouter } from "react-router-dom";

vi.mock("../../../api/auth", () => ({
  login: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.spyOn(message, "success").mockImplementation(() => {});
vi.spyOn(message, "error").mockImplementation(() => {});

describe("LoginPage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should call login and navigate to HR dashboard", async () => {
    const mockUser = {
      role: "ROLE_HR",
      name: "Jane",
    };

    (login as Mock).mockResolvedValue({
      token: "mock-token",
      user: mockUser,
    });

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    await userEvent.type(screen.getByPlaceholderText("Username"), "jane");
    await userEvent.type(
      screen.getByPlaceholderText("Password"),
      "password123",
    );
    await userEvent.click(screen.getByText("Sign In"));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        username: "jane",
        password: "password123",
      });
      expect(localStorage.getItem("authToken")).toBe("mock-token");
      expect(localStorage.getItem("user")).toBe(JSON.stringify(mockUser));
      expect(message.success).toHaveBeenCalledWith("Login successful!");
      expect(mockNavigate).toHaveBeenCalledWith("/hr");
    });
  });

  it("should show error on failed login", async () => {
    (login as Mock).mockRejectedValue(new Error("Unauthorized"));

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    await userEvent.type(screen.getByPlaceholderText("Username"), "invalid");
    await userEvent.type(screen.getByPlaceholderText("Password"), "wrongpass");
    await userEvent.click(screen.getByText("Sign In"));

    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith(
        "Login failed. Please check your credentials.",
      );
    });
  });
});
