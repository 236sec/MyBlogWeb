import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({ language , code } : { language?: string, code: string }) {
  return (
    <div className='w-full h-full rounded-2xl overflow-hidden text-xl'>
      <SyntaxHighlighter showLineNumbers language={language} style={vscDarkPlus} >
        {code}
     </SyntaxHighlighter>
    </div>
  );
}
