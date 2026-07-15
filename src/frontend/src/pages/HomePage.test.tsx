import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { HomePage } from "./HomePage";

describe("HomePage", () => {
  it("renders home shell and Level 1 / Level 2 CTAs", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("cta-level-1")).toHaveAttribute("href", "/demo/level-1");
    expect(screen.getByTestId("cta-level-2")).toHaveAttribute("href", "/demo/level-2");
  });

  it("marks Levels 1 and 2 as available maturity cards", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("maturity-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("maturity-card-2")).toBeInTheDocument();
    expect(screen.getByText(/Demo 1 covers Levels 1 and 2/)).toBeInTheDocument();
  });
});
