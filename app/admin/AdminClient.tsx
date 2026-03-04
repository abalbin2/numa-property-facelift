"use client";

import { useState, useEffect } from "react";
import { SECTION_CONFIG } from "../sections/config";

const PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "numa2025";

export default function AdminClient() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
    if (sessionStorage.getItem("admin_authed") === "1") setAuthed(true);
  }, []);

  function handleLogin() {
    if (pw === PASSWORD) {
      sessionStorage.setItem("admin_authed", "1");
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  function buildUrl() {
    const params = new URLSearchParams();
    SECTION_CONFIG.forEach((s) => {
      const v = selections[s.id];
      if (v && v !== "all") params.set(s.id, v);
    });
    const qs = params.toString();
    return `${origin}${qs ? `/?${qs}` : "/"}`;
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(buildUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!authed) {
    return (
      <div style={s.page}>
        <div style={s.loginBox}>
          <div style={s.logoMark}>N</div>
          <p style={s.loginTitle}>Preview Builder</p>
          <input
            style={{ ...s.input, ...(error ? s.inputError : {}) }}
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            autoFocus
          />
          {error && <p style={s.errorMsg}>Incorrect password</p>}
          <button style={s.btn} onClick={handleLogin}>Enter</button>
        </div>
      </div>
    );
  }

  const previewUrl = buildUrl();

  return (
    <div style={s.page}>
      <div style={s.panel}>
        <header style={s.header}>
          <div style={s.logoMark}>N</div>
          <div>
            <h1 style={s.title}>Preview Builder</h1>
            <p style={s.subtitle}>Select a variation per section, then share the link.</p>
          </div>
        </header>

        <div style={s.sections}>
          {SECTION_CONFIG.map((section) => (
            <div key={section.id} style={s.sectionRow}>
              <p style={s.sectionLabel}>{section.label}</p>
              <div style={s.pills}>
                <button
                  style={{ ...s.pill, ...(!selections[section.id] || selections[section.id] === "all" ? s.pillActive : {}) }}
                  onClick={() => setSelections((p) => ({ ...p, [section.id]: "all" }))}
                >
                  All
                </button>
                {section.variants.map((v) => (
                  <button
                    key={v.id}
                    style={{ ...s.pill, ...(selections[section.id] === v.id ? s.pillActive : {}) }}
                    onClick={() => setSelections((p) => ({ ...p, [section.id]: v.id }))}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={s.urlRow}>
          <code style={s.urlText}>{previewUrl}</code>
          <button style={{ ...s.btn, ...s.copyBtn }} onClick={handleCopy}>
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>

        <a href={previewUrl} target="_blank" rel="noreferrer" style={s.previewLink}>
          Open preview →
        </a>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#0d0d0d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "system-ui, sans-serif",
    padding: "40px 20px",
  },
  loginBox: {
    background: "#161616",
    border: "1px solid #2a2a2a",
    borderRadius: "16px",
    padding: "48px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    width: "340px",
  },
  panel: {
    background: "#161616",
    border: "1px solid #2a2a2a",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  logoMark: {
    width: "40px",
    height: "40px",
    background: "#EA2720",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: "20px",
    flexShrink: 0,
  },
  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 600,
    color: "#fff",
  },
  subtitle: {
    margin: "4px 0 0",
    fontSize: "13px",
    color: "#666",
  },
  loginTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 600,
    color: "#fff",
  },
  sections: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  sectionRow: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  sectionLabel: {
    margin: 0,
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#555",
  },
  pills: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  pill: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid #2a2a2a",
    background: "transparent",
    color: "#888",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s",
  },
  pillActive: {
    background: "#EA2720",
    borderColor: "#EA2720",
    color: "#fff",
  },
  urlRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#111",
    border: "1px solid #2a2a2a",
    borderRadius: "10px",
    padding: "12px 16px",
  },
  urlText: {
    flex: 1,
    fontSize: "12px",
    color: "#FFC9D2",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: "monospace",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    background: "#111",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },
  inputError: {
    borderColor: "#EA2720",
  },
  errorMsg: {
    margin: 0,
    fontSize: "12px",
    color: "#EA2720",
  },
  btn: {
    padding: "10px 20px",
    background: "#EA2720",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    width: "100%",
  },
  copyBtn: {
    width: "auto",
    flexShrink: 0,
    padding: "8px 16px",
    fontSize: "13px",
  },
  previewLink: {
    textAlign: "center",
    fontSize: "13px",
    color: "#555",
    textDecoration: "none",
  },
};
