"use client";
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

export default function Markdown({ value } : any) {
  return (
    <div className='p-1'>
      <ReactMarkdown className='prose max-w-none text-xl break-words prose-slate prose-hr:w-[30rem] prose-headings:text-white prose-headings:text-3xl prose-strong:text-white prose-strong:underline prose-strong:underline-offset-4 prose-code:text-white prose-code:text-[1rem] prose-li:text-[#8db0bb] prose-a:text-blue-600 prose-p:text-[#8db0bb]'
        skipHtml
        components={{
          code: ({node, inline, className, children, ...props}) => {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <CodeBlock language={match[1]} code={children[0] as any} />
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            )
          },
        }}
      >{value}</ReactMarkdown>
    </div>
  );
}