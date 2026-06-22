const getResolvedTheme = (theme) => {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return theme;
};

export const applyTheme = (theme) => {
  const html = document.documentElement;
  const resolvedTheme = getResolvedTheme(theme);

  html.setAttribute("data-theme", resolvedTheme);
  html.style.colorScheme = resolvedTheme;
};

export const applyPalette = (palette) => {
  document.documentElement.setAttribute("data-palette", palette);
};

export const getSavedTheme = () => localStorage.getItem("theme") || "system";

export const getSavedPalette = () => localStorage.getItem("palette") || "default";
