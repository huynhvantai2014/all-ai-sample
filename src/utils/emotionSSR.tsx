import { ReactNode } from "react";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from "./emotionCache";
import { renderToString } from "react-dom/server";

export function renderWithEmotion(children: ReactNode) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
  const html = renderToString(
    <CacheProvider value={cache}>{children}</CacheProvider>
  );
  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);
  return { html, emotionCss };
}
