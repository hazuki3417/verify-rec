export const theme = {
  color: {
    main: {
      emerald: "var(--color-main-emerald)",
    },
    base: {
      pealGray: "var(--color-base-peal-gray)",
      riverBlue: "var(--color-base-river-blue)",
      veryPealGray: "var(--color-base-very-peal-gray)",
      white: "var(--color-base-white)",
    },
    sub: {
      black: "var(--color-sub-black)",
      coral: "var(--color-sub-coral)",
      darkEmerald: "var(--color-sub-dark-emerald)",
      darkGray: "var(--color-sub-dark-gray)",
      gray: "var(--color-sub-gray)",
      green: "var(--color-sub-green)",
      lightGray: "var(--color-sub-light-gray)",
      lightPink: "var(--color-sub-light-pink)",
      lightYellow: "var(--color-sub-light-yellow)",
      ocher: "var(--color-sub-ocher)",
      pealEmerald: "var(--color-sub-peal-emerald)",
      skyBlue: "var(--color-sub-sky-blue)",
      slightlyEmerald: "var(--color-sub-slightly-emerald)",
      slightlyLightGray: "var(--color-sub-slightly-light-gray)",
      slightlyLightPink: "var(--color-sub-slightly-light-pink)",

      // FIX: 定義されていないやつ
      addLightYellow: "#DCD69F",
      addSlightlyLightYellow: "#FFFDEA",
    },
    status: {
      lightBeige: "var(--color-status-light-beige)",
      lightBlue: "var(--color-status-light-blue)",
      lightGreen: "var(--color-status-light-green)",
      lightYellow: "var(--color-status-light-yellow)",
      peacockGreen: "var(--color-status-peacock-green)",
      pink: "var(--color-status-pink)",
      purple: "var(--color-status-purple)",
      slightlyLightBlue: "var(--color-status-slightly-light-blue)",
      slightlyLightOrange: "var(--color-status-slightly-light-orange)",
      slightlyLightRed: "var(--color-status-slightly-light-red)",
      yellowGreen: "var(--color-status-yellow-green)",
    },
    box: {
      shadow: {
        // NOTE: rgba(0,0,0,0.2)
        "1": "var(--color-box-shadow-1)",
        // NOTE: rgba(38,58,64,0.2)
        "2": "var(--color-box-shadow-2)",
      },
    },
  },
  font: {
    family: {
      base: "var(--font-family-base)",
    },
    size: {
      "10": "var(--font-size-10)",
      "11": "var(--font-size-11)",
      "12": "var(--font-size-12)",
      "14": "var(--font-size-14)",
      "16": "var(--font-size-16)",
      "18": "var(--font-size-18)",
      "20": "var(--font-size-20)",
      "24": "var(--font-size-24)",
    },
    lineHeight: {
      "160": "var(--font-line-height-160)",
    },
    weight: {
      regular: "var(--font-weight-regular)",
      medium: "var(--font-weight-medium)",
      semiBold: "var(--font-weight-semi-bold)",
      bold: "var(--font-weight-bold)",
    },
  },
  icon: {
    // NOTE: svgタグのweight,heightに指定する値のため数値のみ保持
    size: {
      "12": "12",
      "14": "14",
      "16": "16",
      "18": "18",
      "20": "20",
      "24": "24",
      "36": "36",
      "72": "72",
    },
  },
};
