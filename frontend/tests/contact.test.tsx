import { render, screen } from "@testing-library/react";
import ContactPage from "@/app/contact/page";

describe("ContactPage", () => {
  it("renders the contact heading", () => {
    render(<ContactPage />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("renders the inquiry type select", () => {
    render(<ContactPage />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders submit and WhatsApp buttons", () => {
    render(<ContactPage />);
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Chat on WhatsApp/i })).toBeInTheDocument();
  });
});
