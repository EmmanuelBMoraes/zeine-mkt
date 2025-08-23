/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        title: ["DM Sans", "sans-serif"],
      },
      fontSize: {
        "title-lg": ["28px", { lineHeight: "120%", fontWeight: "700" }],
        "title-md": ["24px", { lineHeight: "120%", fontWeight: "700" }],
        "title-sm": ["18px", { lineHeight: "120%", fontWeight: "700" }],
        subtitle: ["16px", { lineHeight: "120%", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "120%", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "120%", fontWeight: "400" }],
        "body-xs": ["12px", { lineHeight: "120%", fontWeight: "400" }],
        "label-md": ["12px", { lineHeight: "120%", fontWeight: "500" }],
        "label-sm": ["10px", { lineHeight: "120%", fontWeight: "500" }],
        "action-md": ["16px", { lineHeight: "120%", fontWeight: "500" }],
        "action-sm": ["14px", { lineHeight: "120%", fontWeight: "500" }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          orange: {
            base: "#F24D0D",
            dark: "#C43C08",
          },
          blue: {
            light: "#D7EFF9",
            base: "#5EC5FD",
            dark: "#009CF0",
          },
          anunciado: "#5EC5FD",
        },
        "badge-dark": "#1D1D1D",
        "base-shape": "#F5EAEA",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
