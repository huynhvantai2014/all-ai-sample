"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import createEmotionCache from "@/utils/emotionCache";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    background: { default: "#f5f5f5" },
  },
  components: {
    // Material UIコンポーネントのデフォルトpropsを設定してSSRとクライアントの一貫性を保つ
    MuiContainer: {
      defaultProps: {
        disableGutters: false,
      },
    },
  },
});

const clientSideEmotionCache = createEmotionCache();

export default function MuiRootProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Emotionスタイルの重複を防ぐ
    const emotionStyles = document.querySelectorAll('style[data-emotion]');
    const seenKeys = new Set();
    
    emotionStyles.forEach((style) => {
      const emotionKey = style.getAttribute('data-emotion');
      if (emotionKey && seenKeys.has(emotionKey)) {
        style.remove();
      } else if (emotionKey) {
        seenKeys.add(emotionKey);
      }
    });
  }, []);

  // 水化が完了するまでは最小限のスタイルで表示
  if (!mounted) {
    return (
      <div style={{ visibility: 'hidden' }}>
        {children}
      </div>
    );
  }

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
