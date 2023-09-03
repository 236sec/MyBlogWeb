"use client";
import { ThemeProvider } from "next-themes";

export default function ThemeProviderHook({ children }) {
  return (
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider>
  )
}