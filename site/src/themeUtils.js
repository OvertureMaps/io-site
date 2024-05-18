export function setTheme(themeName, setClassName) {
  localStorage.setItem("theme", themeName);
  setClassName(themeName);
  document.documentElement.setAttribute(
    "data-theme",
    themeName === "theme-light" ? "light" : "dark"
  );
}

export function keepTheme(setClassName) {
  const theme = localStorage.getItem("theme");
  if (theme) {
    setTheme(theme, setClassName);
    return;
  }

  const prefersLightTheme = window.matchMedia("(prefers-color-scheme: light)");
  if (prefersLightTheme.matches) {
    setTheme("theme-light", setClassName);
    return;
  }

  setTheme("theme-dark", setClassName);
}
