import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";

export const lightColors = {
  primary: "#24389c",
  primaryContainer: "#3f51b5",
  primaryFixed: "#dee0ff",
  primaryFixedDim: "#bac3ff",
  onPrimary: "#ffffff",
  onPrimaryContainer: "#cacfff",
  onPrimaryFixed: "#00105c",
  secondary: "#565c84",
  secondaryContainer: "#c9cffd",
  onSecondary: "#ffffff",
  onSecondaryContainer: "#51577f",
  tertiary: "#6c3400",
  tertiaryContainer: "#8f4700",
  tertiaryFixed: "#ffdcc6",
  tertiaryFixedDim: "#ffb784",
  onTertiary: "#ffffff",
  error: "#ba1a1a",
  errorContainer: "#ffdad6",
  onError: "#ffffff",
  onErrorContainer: "#93000a",
  surface: "#f8f9fa",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#f3f4f5",
  surfaceContainer: "#edeeef",
  surfaceContainerHigh: "#e7e8e9",
  surfaceContainerHighest: "#e1e3e4",
  onSurface: "#191c1d",
  onSurfaceVariant: "#454652",
  outline: "#757684",
  outlineVariant: "#c5c5d4",
  background: "#f8f9fa",
  onBackground: "#191c1d",
  inverseSurface: "#2e3132",
  inverseOnSurface: "#f0f1f2",
  inversePrimary: "#bac3ff",
  surfaceTint: "#4355b9",
  success: "#4ade80",
  successContainer: "#dcfce7",
  onSuccess: "#ffffff",
  onSuccessContainer: "#166534",
  warning: "#f59e0b",
  warningContainer: "#fef3c7",
  onWarning: "#ffffff",
  onWarningContainer: "#92400e",
};

export const darkColors = {
  primary: "#bac3ff",
  primaryContainer: "#293ca0",
  primaryFixed: "#00105c",
  primaryFixedDim: "#002190",
  onPrimary: "#00105c",
  onPrimaryContainer: "#dee0ff",
  onPrimaryFixed: "#dee0ff",
  secondary: "#bec4f2",
  secondaryContainer: "#3e446b",
  onSecondary: "#1a223d",
  onSecondaryContainer: "#dee0ff",
  tertiary: "#ffb784",
  tertiaryContainer: "#713700",
  tertiaryFixed: "#301400",
  tertiaryFixedDim: "#5c2700",
  onTertiary: "#3d1c00",
  error: "#ffb4ab",
  errorContainer: "#93000a",
  onError: "#690005",
  onErrorContainer: "#ffdad6",
  surface: "#191c1d",
  surfaceContainerLowest: "#0f1111",
  surfaceContainerLow: "#1a1d1e",
  surfaceContainer: "#232628",
  surfaceContainerHigh: "#2e3132",
  surfaceContainerHighest: "#363a3c",
  onSurface: "#e2e3e5",
  onSurfaceVariant: "#c5c5d4",
  outline: "#8f9099",
  outlineVariant: "#454652",
  background: "#191c1d",
  onBackground: "#e2e3e5",
  inverseSurface: "#e2e3e5",
  inverseOnSurface: "#2e3132",
  inversePrimary: "#4355b9",
  surfaceTint: "#bac3ff",
  success: "#4ade80",
  successContainer: "#166534",
  onSuccess: "#ffffff",
  onSuccessContainer: "#dcfce7",
  warning: "#f59e0b",
  warningContainer: "#92400e",
  onWarning: "#ffffff",
  onWarningContainer: "#fef3c7",
};

export type ThemeColors = typeof lightColors;

interface ThemeContextType {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const value = useMemo(
    () => ({
      isDark,
      colors: isDark ? darkColors : lightColors,
      toggleTheme: () => setIsDark((prev) => !prev),
      setTheme: (dark: boolean) => setIsDark(dark),
    }),
    [isDark]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}