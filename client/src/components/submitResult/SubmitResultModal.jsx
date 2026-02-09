    import ResultRing from "./ResultRing";
    import ResultMessage from "./ResultMessage";

    function SubmitResultModal({ isOpen, result, submitAttempt, onClose, onNext, isLast }) {
    if (!result) return null;

    // ✅ MUST be inside the component
    const isSuccess = result.passed === result.total;
    const isZero = result.passed === 0;


    return (
        <div
        className={`
            fixed inset-0 z-50 flex items-center justify-center
            bg-black/60
            transition-opacity duration-300
            ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        >
        <div
    className={`
        relative w-full max-w-md rounded-lg p-6
        border-2
        transform transition-all duration-300 ease-out
        ${
        isSuccess
            ? "bg-slate-700/60 border-green-500 ring-1 ring-green-500/10"
            : "bg-slate-700/60 border-red-400 ring-1 ring-red-500/10"
        }
        ${
        isOpen
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-4 opacity-0"
        }
    `}
    >


            {/* Close */}
            <button
            onClick={onClose}
            className="absolute top-3 right-3 text-slate-400 hover:text-white transition"
            >
            ✕
            </button>

            <ResultRing
            key={submitAttempt}
            passed={result.passed}
            total={result.total}
            />

            <ResultMessage
            passed={result.passed}
            total={result.total}
            isLast={isLast}
            onNext={onNext}
            onRetry={onClose}
            />
        </div>
        </div>
    );
    }

    export default SubmitResultModal;
