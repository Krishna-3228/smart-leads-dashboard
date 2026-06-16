import { describe, expect, it, beforeEach, jest } from "@jest/globals";
import { render, screen, act } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../ThemeContext";

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme} data-testid="toggle-btn">
        Toggle
      </button>
    </div>
  );
};

describe("ThemeContext", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("should default to light theme and set class on HTML element", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme-value").textContent).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("should load stored theme from localStorage", () => {
    localStorage.setItem("theme", "dark");

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme-value").textContent).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("should toggle theme and update localStorage and HTML class list", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleBtn = screen.getByTestId("toggle-btn");

    // Toggle to dark
    act(() => {
      toggleBtn.click();
    });

    expect(screen.getByTestId("theme-value").textContent).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");

    // Toggle back to light
    act(() => {
      toggleBtn.click();
    });

    expect(screen.getByTestId("theme-value").textContent).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("should throw error if useTheme is used outside ThemeProvider", () => {
    // Prevent React from printing boundary console errors
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useTheme must be used inside ThemeProvider");

    consoleSpy.mockRestore();
  });
});
