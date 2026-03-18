"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { CodeBlock } from "./code-block";

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code: ({ className, children }) => (
          <CodeBlock className={className}>{children}</CodeBlock>
        ),
        h1: ({ children }) => (
          <h1 className="text-3xl my-2 font-semibold">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold">{children}</h2>
        ),
        p: ({ children }) => <p>{children}</p>,
        table: ({ children, ...props }) => (
          <div className="my-4">
            <Table {...props}>{children}</Table>
          </div>
        ),
        thead: ({ children, ...props }) => (
          <TableHeader {...props}>{children}</TableHeader>
        ),
        tbody: ({ children, ...props }) => (
          <TableBody {...props}>{children}</TableBody>
        ),
        tr: ({ children, ...props }) => (
          <TableRow {...props}>{children}</TableRow>
        ),
        th: ({ children, ...props }) => (
          <TableHead {...props}>{children}</TableHead>
        ),
        td: ({ children, ...props }) => (
          <TableCell {...props}>{children}</TableCell>
        ),
        ol: ({ children, ...props }) => {
          return (
            <ol className="px-8 list-decimal list-outside" {...props}>
              {children}
            </ol>
          );
        },
        li: ({ children, ...props }) => {
          return (
            <li className="py-2" {...props}>
              {children}
            </li>
          );
        },
        ul: ({ children, ...props }) => {
          return (
            <ul className="px-8 list-outside list-disc" {...props}>
              {children}
            </ul>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
