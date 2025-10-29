"use client";

import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/utils/emotionCache";


const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    background: { default: "#f5f5f5" },
  },
});

const clientSideEmotionCache = createEmotionCache();

export default function MuiRootProvider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
