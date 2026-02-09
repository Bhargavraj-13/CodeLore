function EndExamConfirmModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-slate-800 rounded-lg p-6 w-full max-w-sm space-y-4">
        <h3 className="text-lg font-semibold">
          Exit exam?
        </h3>

        <p className="text-slate-300 text-sm">
          Are you sure you want to exit the exam? You can review your results on the next page.
        </p>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-slate-700 text-slate-100 rounded-md hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-slate-900 rounded-md hover:bg-red-600"
          >
            Exit Exam
          </button>
        </div>
      </div>
    </div>
  );
}

export default EndExamConfirmModal;
