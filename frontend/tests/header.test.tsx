import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

describe("Header", () => {
  it("renders the brand name", () => {
    render(<Header />);
    expect(screen.getByText("DYNA WISDOM")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /DYNA WISDOM/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Services/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Tech Stack/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Products/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Activities/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /About Us/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Contact/ })).toBeInTheDocument();
  });
});
