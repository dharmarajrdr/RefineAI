import { useMemo, useState } from "react";

export function meta() {
  return [
    { title: "RefineAI | AI Text Refinement" },
    {
      name: "description",
      content:
        "RefineAI helps you transform rough text into polished, professional writing in seconds.",
    },
  ];
}

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [refinedText, setRefinedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const canSubmit = useMemo(
    () => inputText.trim().length > 0 && !isLoading,
    [inputText, isLoading],
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    const value = inputText.trim();

    setHasSubmitted(true);
    setErrorMessage("");
    setIsCopied(false);

    if (!value) {
      setRefinedText("");
      setErrorMessage("Enter some text before refining.");
      return;
    }

    setIsLoading(true);
    setRefinedText("");

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/api/groq/response?prompt=" + encodeURIComponent(value), {
        method: "GET"
      });

      let payload = {};
      try {
        payload = await response.json();
      } catch {
        payload = {};
      }

      if (!response.ok) {
        const errorMsg = payload.errorMessage || `Server responded with status ${response.status}`;
        throw new Error(errorMsg);
      }

      const output = payload.refinedText;

      setRefinedText(output);
    } catch (error) {
      const fallbackMessage = "Something went wrong. Please try again.";
      setErrorMessage(error instanceof Error ? error.message : fallbackMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onCopyResult = async () => {
    if (!refinedText) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(refinedText);
      } else {
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = refinedText;
        tempTextArea.setAttribute("readonly", "");
        tempTextArea.style.position = "absolute";
        tempTextArea.style.left = "-9999px";
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextArea);
      }

      setIsCopied(true);
    } catch {
      setErrorMessage("Unable to copy right now. Please try again.");
    }
  };

  return (
    <main className="refine-shell">
      <section className="refine-wrap">
        <header className="refine-header">
          <div className="badge-glow">
            <span className="status-dot" />
            AI-Powered Text Refinement
          </div>
          <h1 className="refine-title">RefineAI</h1>
          <p className="refine-subtitle">
            Turn rough drafts into clear, professional writing with a single
            click.
          </p>
        </header>

        <form className="refine-card" onSubmit={onSubmit}>
          <label htmlFor="rawText" className="field-label">
            Your text
          </label>
          <textarea
            id="rawText"
            className="refine-textarea"
            placeholder="Paste or type your text here..."
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            disabled={isLoading}
            rows={8}
          />

          <div className="action-row">
            <button type="submit" className="refine-button" disabled={!canSubmit}>
              {isLoading ? "Refining..." : "Refine"}
            </button>
          </div>

          {hasSubmitted && !isLoading && !inputText.trim() ? (
            <p className="feedback feedback-warning">Enter some text to continue.</p>
          ) : null}

          {errorMessage ? <p className="feedback feedback-error">{errorMessage}</p> : null}
        </form>

        <section className="result-card" aria-live="polite">
          <h2 className="field-label">Refined output</h2>

          {isLoading ? (
            <div className="loader-panel" role="status" aria-label="Refining text">
              <div className="spinner" />
              <div className="skeleton-group">
                <span className="skeleton-line" />
                <span className="skeleton-line skeleton-wide" />
                <span className="skeleton-line" />
                <span className="skeleton-line skeleton-short" />
              </div>
            </div>
          ) : refinedText ? (
            <article className="result-content">
              <button
                type="button"
                className={`copy-button ${isCopied ? "is-copied" : ""}`}
                onClick={onCopyResult}
                aria-label={isCopied ? "Copied" : "Copy refined text"}
              >
                {isCopied ? (
                  <>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="9" y="9" width="11" height="11" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
              <p>{refinedText}</p>
            </article>
          ) : (
            <div className="result-empty">Your refined text will appear here.</div>
          )}
        </section>
      </section>
    </main>
  );
}
