"use client";

import { Streamdown } from "streamdown";
import { code } from "@streamdown/code";
import { math } from "@streamdown/math";

export function Markdown({ children }: { children: string }) {
  return <Streamdown plugins={{ code, math }}>{children}</Streamdown>;
}
