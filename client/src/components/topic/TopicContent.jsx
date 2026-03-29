import ReactMarkdown from "react-markdown";

function TopicContent({ content, onStartQuiz, onStartCoding }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <div className="mt-10 mb-8">

            {/* Title + Actions Row */}
            <div className="flex items-center justify-between gap-4">

              {/* Title */}
              <h1 className="text-3xl font-semibold">
                {children}
              </h1>

              {/* Actions */}
              <div className="flex flex-col items-end gap-1">

                <div className="flex gap-2 bg-slate-800 p-1 rounded-lg">

                  <button
                    onClick={onStartQuiz}
                    className="px-4 py-2 text-sm rounded-md bg-teal-500 hover:bg-teal-600 text-white"
                  >
                    Step 1: Quiz
                  </button>

                  <button
                    onClick={onStartCoding}
                    className="px-4 py-2 text-sm rounded-md bg-teal-500 hover:bg-teal-600 text-white"
                  >
                    Step 2: Coding
                  </button>

                </div>

                {/* Microcopy */}
                <p className="text-xs text-slate-400">
                  Complete quiz before coding for best results
                </p>

              </div>

            </div>

            {/* Divider */}
            <hr className="border-white/10 mt-4" />

          </div>
        ),

        h2: ({ children }) => (
          <div className="mt-8 mb-6">
            <h2 className="text-2xl font-semibold mb-3">{children}</h2>
            <hr className="border-white/10" />
          </div>
        ),

        p: ({ children }) => (
          <p className="text-slate-300 leading-relaxed mb-4">
            {children}
          </p>
        ),

        ul: ({ children }) => (
          <ul className="list-disc ml-6 space-y-2 text-slate-300">
            {children}
          </ul>
        ),

        li: ({ children }) => (
          <li className="ml-2">{children}</li>
        ),
      }}
    >
      {content || ""}
    </ReactMarkdown>
  );
}

export default TopicContent;