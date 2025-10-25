import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          500: "#6366F1",
          600: "#4F46E5",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          500: "#06B6D4",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        "primary-500": "#6366F1",
        "primary-600": "#4F46E5",
        "accent-500": "#06B6D4",
        "accent-primary": "#6366F1",
        "bg-dark-start": "#121212",
        "bg-dark-end": "#1A1A2E",
        "surface-800": "#1E1E2A",
        "success-500": "#10B981",
        "warn-500": "#F59E0B",
        "danger-500": "#EF4444",
        background: "#0D0D0F",
        "text-primary": "#F0F0F0",
        "text-secondary": "#8A8A8A",
        "border-contrast": "#2A2A3C",
        "gradient-aurora-start": "var(--color-primary-500)",
        "gradient-aurora-mid": "#8B5CF6",
        "gradient-aurora-end": "#EC4899",
        "gradient-cyber-start": "var(--color-accent-500)",
        "gradient-cyber-mid": "#3B82F6",
        "gradient-cyber-end": "#8B5CF6",
        "glow-primary": "rgba(99, 102, 241, 0.6)",
        "glow-accent": "rgba(6, 182, 212, 0.5)",
        "glow-intense": "rgba(139, 92, 246, 0.8)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backdropBlur: {
        xs: "4px",
        glass: "16px",
        "glass-intense": "24px",
      },
      boxShadow: {
        "elevation-float":
          "0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1), 0 16px 32px rgba(0,0,0,0.1), 0 0 40px var(--color-glow-primary)",
        "elevation-panel":
          "0 4px 8px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.1)",
        "elevation-modal":
          "0 12px 24px rgba(0,0,0,0.2), 0 24px 48px rgba(0,0,0,0.2), 0 48px 96px rgba(0,0,0,0.2), 0 0 80px var(--color-glow-intense)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient-shift": "gradient-shift 10s ease infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
