import ReactMarkdown from "react-markdown";

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      components={{
        strong: ({ children }) => (
          <strong className="text-highlight">{children}</strong>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
