import { render, screen } from "@testing-library/react";
import AdminLoginPage from "@/app/admin/login/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe("AdminLoginPage", () => {
  it("renders the login form", () => {
    render(<AdminLoginPage />);
    expect(screen.getByText("Admin Access")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("admin")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign In to Dashboard/i })).toBeInTheDocument();
  });
});
