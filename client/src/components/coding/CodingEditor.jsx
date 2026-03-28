import Editor from "@monaco-editor/react";

function CodingEditor({ code, onChange }) {
  return (
    <div className="w-2/3 h-full border border-white/10 rounded-lg overflow-hidden">
      <Editor
        height="100%"
        language="python"
        theme="vs-dark"
        value={code}
        onChange={(value) => onChange(value ?? "")}
        options={{
          tabSize: 4,
          insertSpaces: true,
          autoIndent: "full",
          formatOnType: true,
          formatOnPaste: true,
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          fontFamily: "monospace",
        }}
      />
    </div>
  );
}

export default CodingEditor;
