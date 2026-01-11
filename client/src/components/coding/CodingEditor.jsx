function CodingEditor({ code, onChange }) {
  return (
    <textarea
      value={code}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-2/3 h-full
        bg-slate-900
        border border-white/10
        rounded-lg
        p-6
        font-mono text-sm
        outline-none resize-none
      "
      spellCheck={false}
    />
  );
}

export default CodingEditor;
