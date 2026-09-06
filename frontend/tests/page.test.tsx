import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the hero heading", () => {
    render(<HomePage />);
    expect(screen.getByText("Dyna Wisdom")).toBeInTheDocument();
  });

  it("renders the CTA link", () => {
    render(<HomePage />);
    expect(screen.getByText("Let's discuss your project")).toBeInTheDocument();
  });
});
