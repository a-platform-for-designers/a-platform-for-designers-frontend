import Footer from "../footer/Footer";
import { render, screen } from "@testing-library/react";

describe("Footer", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test("render Footer right years", () => {
    expect(screen.getByText("Footer 2023")).toBeDefined();
  });
});
