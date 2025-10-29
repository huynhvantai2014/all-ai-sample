
import { ReactNode } from "react";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from "@/utils/emotionCache";
import { renderToString } from "react-dom/server";
import React from "react";

export function renderWithEmotion(children: ReactNode) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
  const html = renderToString(
    React.createElement(CacheProvider, { value: cache }, children)
  );
  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);
  return { html, emotionCss };
}
