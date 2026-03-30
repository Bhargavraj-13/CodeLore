import Editor from '@monaco-editor/react';

// Map our language keys to Monaco language identifiers
const MONACO_LANGUAGE_MAP = {
  cpp: 'cpp',
  python: 'python',
  java: 'java',
  javascript: 'javascript',
};

function CodingEditor({ code, onChange, language = 'cpp' }) {
  const monacoLang = MONACO_LANGUAGE_MAP[language] || language;

  return (
    <div className="w-2/3 h-full border border-white/10 rounded-lg overflow-hidden">
      <Editor
        height="100%"
        language={monacoLang}
        theme="vs-dark"
        value={code}
        onChange={(value) => onChange(value ?? '')}
        options={{
          tabSize: 4,
          insertSpaces: true,
          autoIndent: 'full',
          formatOnType: true,
          formatOnPaste: true,
          autoClosingBrackets: 'always',
          autoClosingQuotes: 'always',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          fontFamily: 'monospace',
        }}
      />
    </div>
  );
}

export default CodingEditor;
