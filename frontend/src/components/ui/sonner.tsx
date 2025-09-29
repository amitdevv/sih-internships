"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors={false}
      toastOptions={{
        classNames: {
          toast: "border shadow-sm",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          // Force light success palette (used when richColors=false)
          "--success-bg": "#ecfdf5", // emerald-50
          "--success-border": "#a7f3d0", // emerald-200
          "--success-text": "#065f46", // emerald-800
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
