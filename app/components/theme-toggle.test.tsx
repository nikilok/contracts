import { render, fireEvent, screen, act } from "@testing-library/react"
import { ThemeProvider, useTheme } from "./theme-provider" // Mock or actual
import { ThemeToggle } from "./theme-toggle"
import React from "react"

// Mock localStorage (if not already globally mocked by theme-provider.test.tsx in the same test run)
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()
if (!window.localStorage) {
  Object.defineProperty(window, "localStorage", { value: localStorageMock })
}


// Mock matchMedia (if not already globally mocked)
const matchMediaMock = (query: string) => ({
  matches: query === "(prefers-color-scheme: dark)",
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
})
if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(matchMediaMock),
  })
}


// Helper to render ThemeToggle within ThemeProvider
const renderThemeToggle = (defaultTheme: "light" | "dark" | "system" = "system") => {
  return render(
    <ThemeProvider defaultTheme={defaultTheme} storageKey="test-theme-key">
      <ThemeToggle />
      <TestConsumer /> 
    </ThemeProvider>
  )
}

// Optional: A simple consumer to verify theme changes if needed directly in ThemeToggle tests
const TestConsumer = () => {
  const { theme } = useTheme()
  return <div data-testid="current-theme-consumer">{theme}</div>
}


describe("ThemeToggle", () => {
  beforeEach(() => {
    // Ensure localStorage is clean before each test
    localStorageMock.clear()
    // Reset documentElement classes
    document.documentElement.classList.remove("light", "dark")
    // Reset matchMedia mock to default (dark system theme)
    window.matchMedia = jest.fn().mockImplementation(matchMediaMock)
  })

  test("renders the toggle button", () => {
    renderThemeToggle()
    expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument()
  })

  test("opens the dropdown menu on click", () => {
    renderThemeToggle()
    const toggleButton = screen.getByRole("button", { name: /toggle theme/i })
    fireEvent.click(toggleButton)
    expect(screen.getByRole("menuitem", { name: /light/i })).toBeVisible()
    expect(screen.getByRole("menuitem", { name: /dark/i })).toBeVisible()
    expect(screen.getByRole("menuitem", { name: /system/i })).toBeVisible()
  })

  test('calls setTheme with "light" when Light option is clicked', () => {
    renderThemeToggle()
    const toggleButton = screen.getByRole("button", { name: /toggle theme/i })
    fireEvent.click(toggleButton)
    
    const lightOption = screen.getByRole("menuitem", { name: /light/i })
    fireEvent.click(lightOption)
    
    expect(localStorageMock.getItem("test-theme-key")).toBe("light")
    expect(document.documentElement.classList.contains("light")).toBe(true)
    expect(screen.getByTestId("current-theme-consumer").textContent).toBe("light")
  })

  test('calls setTheme with "dark" when Dark option is clicked', () => {
    renderThemeToggle()
    const toggleButton = screen.getByRole("button", { name: /toggle theme/i })
    fireEvent.click(toggleButton)

    const darkOption = screen.getByRole("menuitem", { name: /dark/i })
    fireEvent.click(darkOption)

    expect(localStorageMock.getItem("test-theme-key")).toBe("dark")
    expect(document.documentElement.classList.contains("dark")).toBe(true)
    expect(screen.getByTestId("current-theme-consumer").textContent).toBe("dark")
  })

  test('calls setTheme with "system" when System option is clicked', () => {
    // Set system to be light for this test to see a change from default dark mock
    window.matchMedia = jest.fn().mockImplementation(query => ({
        ...matchMediaMock(query),
        matches: false, // System is light
    }));

    renderThemeToggle("dark") // Start with dark theme to see a change
    expect(screen.getByTestId("current-theme-consumer").textContent).toBe("dark")


    const toggleButton = screen.getByRole("button", { name: /toggle theme/i })
    fireEvent.click(toggleButton)

    const systemOption = screen.getByRole("menuitem", { name: /system/i })
    fireEvent.click(systemOption)
    
    expect(localStorageMock.getItem("test-theme-key")).toBe("system")
    expect(document.documentElement.classList.contains("light")).toBe(true) // System is light
    expect(screen.getByTestId("current-theme-consumer").textContent).toBe("system")
  })

  test("icons change based on theme", () => {
    // System theme is dark by default mock
    const { rerender } = renderThemeToggle("system")
    const sunIcon = document.querySelector(".lucide-sun")
    const moonIcon = document.querySelector(".lucide-moon")

    // In dark mode (system default), moon is visible, sun is not
    expect(moonIcon).not.toHaveClass("scale-0")
    expect(sunIcon).toHaveClass("scale-0")

    // Switch to light theme
    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }))
    fireEvent.click(screen.getByRole("menuitem", { name: /light/i }))
    
    // In light mode, sun is visible, moon is not
    // Need to query icons again as their classes change
    const updatedSunIcon = document.querySelector(".lucide-sun")
    const updatedMoonIcon = document.querySelector(".lucide-moon")
    expect(updatedSunIcon).not.toHaveClass("scale-0")
    expect(updatedMoonIcon).toHaveClass("scale-0")

    // Switch to dark theme
    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }))
    fireEvent.click(screen.getByRole("menuitem", { name: /dark/i }))

    const finalSunIcon = document.querySelector(".lucide-sun")
    const finalMoonIcon = document.querySelector(".lucide-moon")
    expect(finalMoonIcon).not.toHaveClass("scale-0")
    expect(finalSunIcon).toHaveClass("scale-0")
  })
})
