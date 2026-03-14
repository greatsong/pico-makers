import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Bot, Copy, Check } from 'lucide-react';

export default function ChatMessage({ message, isLatest }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* 아바타 */}
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
        isUser ? 'bg-orange/20 text-orange' : 'bg-cyan/20 text-cyan'
      }`}>
        {isUser ? <User size={14} /> : <Bot size={14} />}
      </div>

      {/* 메시지 내용 */}
      <div className={`max-w-[85%] min-w-0 ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block text-sm rounded-xl px-4 py-2.5 ${
          isUser
            ? 'bg-orange/15 text-text-primary rounded-tr-sm'
            : 'bg-bg-surface text-text-primary rounded-tl-sm border border-border/50'
        }`}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.text}</p>
          ) : (
            <div className="chat-markdown">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
                  code: ({ inline, children, ...props }) => {
                    if (inline) {
                      return <code {...props}>{children}</code>;
                    }
                    return <code {...props}>{children}</code>;
                  },
                }}
              >
                {message.text || ''}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);

  const code = extractText(children);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative group">
      <pre className="!my-2">{children}</pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-bg-elevated/80 text-text-muted hover:text-cyan opacity-0 group-hover:opacity-100 transition-all"
        title="코드 복사"
      >
        {copied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
      </button>
    </div>
  );
}

function extractText(children) {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (children?.props?.children) return extractText(children.props.children);
  return '';
}
