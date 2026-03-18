"use client";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import rust from "react-syntax-highlighter/dist/cjs/languages/prism/rust";
import c from "react-syntax-highlighter/dist/cjs/languages/prism/c";
import cpp from "react-syntax-highlighter/dist/cjs/languages/prism/cpp";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import go from "react-syntax-highlighter/dist/cjs/languages/prism/go";
import sql from "react-syntax-highlighter/dist/cjs/languages/prism/sql";
import yaml from "react-syntax-highlighter/dist/cjs/languages/prism/yaml";
import html from "react-syntax-highlighter/dist/cjs/languages/prism/markup";
import java from "react-syntax-highlighter/dist/cjs/languages/prism/java";
import php from "react-syntax-highlighter/dist/cjs/languages/prism/php";
import ruby from "react-syntax-highlighter/dist/cjs/languages/prism/ruby";
import kotlin from "react-syntax-highlighter/dist/cjs/languages/prism/kotlin";
import swift from "react-syntax-highlighter/dist/cjs/languages/prism/swift";
import dart from "react-syntax-highlighter/dist/cjs/languages/prism/dart";
import r from "react-syntax-highlighter/dist/cjs/languages/prism/r";
import erlang from "react-syntax-highlighter/dist/cjs/languages/prism/erlang";
import materialOceanic from "react-syntax-highlighter/dist/cjs/styles/prism/material-oceanic";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("rust", rust);
SyntaxHighlighter.registerLanguage("c", c);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("go", go);
SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("yaml", yaml);
SyntaxHighlighter.registerLanguage("html", html);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("php", php);
SyntaxHighlighter.registerLanguage("ruby", ruby);
SyntaxHighlighter.registerLanguage("kotlin", kotlin);
SyntaxHighlighter.registerLanguage("swift", swift);
SyntaxHighlighter.registerLanguage("dart", dart);
SyntaxHighlighter.registerLanguage("r", r);
SyntaxHighlighter.registerLanguage("erlang", erlang);

export function CodeBlock({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const match = /language-(\w+)/.exec(className || "");
  const language = match?.[1] || "bash";

  return (
    <code className="w-full text-sm rounded-md">
      <SyntaxHighlighter language={language} style={materialOceanic}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </code>
  );
}
