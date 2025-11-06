// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        colorCycle: {
          "0%": { borderColor: "#ef4444" }, // red
          "33%": { borderColor: "#facc15" }, // yellow
          "66%": { borderColor: "#22c55e" }, // green
          "100%": { borderColor: "#ef4444" }, // back to red
        },
      },
      animation: {
        "color-cycle": "colorCycle 2s linear infinite",
      },
    },
  },
  plugins: [],
};
