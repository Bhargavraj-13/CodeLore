function CodingEditor({ code, onChange }) {
  const lines = code.split("\n").length;

  const handleKeyDown = (e) => {
    const textarea = e.target;
    const { selectionStart, selectionEnd } = textarea;

    // 🔑 ALWAYS read from textarea.value (NOT from prop)
    const value = textarea.value;
    const before = value.slice(0, selectionStart);
    const after = value.slice(selectionEnd);

    const pairs = {
      "{": "}",
      "(": ")",
      "[": "]",
      '"': '"',
      "'": "'",
    };

    /* Auto-close brackets */
    if (pairs[e.key]) {
      e.preventDefault();

      const open = e.key;
      const close = pairs[e.key];

      const newCode = before + open + close + after;
      const cursorPos = selectionStart + 1;

      onChange(newCode);

      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = cursorPos;
      });

      return;
    }

    /* Smart Enter */
    if (e.key === "Enter") {
      e.preventDefault();

      const currentLine = before.split("\n").pop();
      const indentation =
        currentLine.match(/^\s*/)?.[0] ?? "";

      const extraIndent =
        currentLine.trim().endsWith("{") ? "  " : "";

      const newCode =
        before +
        "\n" +
        indentation +
        extraIndent +
        after;

      const cursorPos =
        before.length +
        1 +
        indentation.length +
        extraIndent.length;

      onChange(newCode);

      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = cursorPos;
      });
    }
  };

  return (
    <div className="flex w-2/3 h-full rounded-lg overflow-hidden border border-white/10 bg-slate-900">
      <div className="px-3 py-6 text-slate-500 text-sm font-mono text-right select-none bg-slate-900">
        {Array.from({ length: lines }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>

      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="
          flex-1 h-full
          bg-transparent
          p-6
          font-mono text-sm text-slate-100
          outline-none resize-none
        "
        spellCheck={false}
      />
    </div>
  );
}

export default CodingEditor;
