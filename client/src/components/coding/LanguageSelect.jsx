import { useState } from "react";

function LanguageSelect({ language, setLanguage }) {
  const [open, setOpen] = useState(false);

  const options = [
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="
          bg-slate-900 border border-white/10
          px-4 py-2 rounded-xl text-sm
          flex items-center gap-2
          hover:border-teal-400
          transition-all
        "
      >
        {options.find((o) => o.value === language)?.label}
        <span className="text-slate-400">▾</span>
      </button>

      {open && (
        <div
          className="
            absolute right-0 mt-2 w-full
            bg-slate-900 border border-white/10
            rounded-xl shadow-lg
            overflow-hidden
            z-50
          "
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setLanguage(opt.value);
                setOpen(false);
              }}
              className="
                w-full text-left px-4 py-2 text-sm
                hover:bg-teal-500/20 hover:text-teal-300
                transition
              "
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSelect;
