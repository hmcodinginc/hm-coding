
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#000000",
          cyan: "#3ec3ca",
          mint: "#50d6a1",
          magenta: "#8c437b",
          indigo: "#35438a",
          navy: "#314489",
          lavender: "#6e5c7d",
          surface: "#0d0d0d",
        },
        admin: {
          primary: "#2563eb",
          secondary: "#f8fafc",
          surface: "#f1f5f9",
          text: "#0f172a",
        },
      },
      fontFamily: {
        display: ["Orbitron", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #3ec3ca 0%, #35438a 50%, #8c437b 100%)",
        "hero-glow":
          "radial-gradient(ellipse at 50% 0%, rgba(62,195,202,0.16) 0%, transparent 60%)",
        "hero-glow-about":
          "radial-gradient(ellipse at 30% 50%, rgba(62,195,202,0.12) 0%, transparent 55%)",
      },
      boxShadow: {
        "neon-cyan": "0 0 20px rgba(62, 195, 202, 0.4)",
        "neon-magenta": "0 0 20px rgba(140, 67, 123, 0.4)",
        "card-md": "0 4px 24px rgba(0, 0, 0, 0.35)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.55), 0 0 24px rgba(62, 195, 202, 0.1)",
      },
      animation: {
        shimmer: "shimmer 2.4s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
      },
    },
  },
  plugins: [],
};
