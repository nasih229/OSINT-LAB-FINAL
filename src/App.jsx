import { useEffect, useMemo, useState } from "react";
import "./App.css";

const modules = [
  {
    id: "osint",
    name: "OSINT",
    icon: "◉",
    tools: [
      "Email Intelligence",
      "Phone Intelligence",
      "Username Intelligence",
      "Name Intelligence",
      "Social Intelligence",
      "Instagram Intelligence",
      "Facebook Intelligence",
      "Telegram Public OSINT",
      "Google Search",
      "GitHub Intelligence",
      "Image OSINT",
      "OCR",
      "Reverse Image",
      "Visual Recognition",
      "Media Authenticity",
      "Geolocation",
      "EXIF / Metadata",
    ],
  },
  {
    id: "recon",
    name: "RECON",
    icon: "⌁",
    tools: [
      "DNS / RDAP",
      "WHOIS",
      "Asset Finder",
      "Subdomains",
      "IP Intelligence",
      "ASN",
      "Reverse DNS",
      "TLS / SSL",
      "Certificates",
      "Technology Detection",
      "Shodan",
      "Recon-ng",
      "SpiderFoot",
    ],
  },
  {
    id: "security",
    name: "SECURITY",
    icon: "◈",
    tools: [
      "VirusTotal",
      "URL Scanner",
      "Phishing Detector",
      "File Scanner",
      "APK Analyzer",
      "PDF / ZIP Analysis",
      "Hash Lookup",
      "IOC Scanner",
      "Bulk IOC",
      "Email Header",
      "Content Analyzer",
      "HTTP Headers",
      "PCAP / TShark",
      "Maltego",
      "John the Ripper",
    ],
  },
  {
    id: "bugbounty",
    name: "BUG BOUNTY",
    icon: "⚡",
    tools: [
      "Authorized Programs",
      "Program Scope",
      "Rewards",
      "Rules",
      "Web Testing",
      "API Testing",
      "Recon",
      "Vulnerability Assessment",
      "Findings",
      "Validation",
      "Evidence",
      "Severity / Risk",
      "Report Generator",
      "Android App Security",
    ],
  },
];

const androidTools = [
  "APK Analysis",
  "Manifest Analysis",
  "Permissions",
  "Exported Components",
  "Secrets / API-Key Detection",
  "Insecure Storage Checks",
  "Network Security Checks",
  "Certificate / Signing Analysis",
  "Dependency Analysis",
  "Static Analysis",
  "Dynamic Testing",
  "Risk / Severity",
  "Evidence",
  "EVEE Analysis",
  "PDF Report",
];

const clocks = [
  ["🇮🇳", "INDIA", "Kochi", "Asia/Kolkata"],
  ["🇸🇦", "SAUDI ARABIA", "Riyadh", "Asia/Riyadh"],
  ["🇯🇵", "JAPAN", "Tokyo", "Asia/Tokyo"],
  ["🇳🇬", "NIGERIA", "Lagos", "Africa/Lagos"],
  ["🇬🇧", "UNITED KINGDOM", "London", "Europe/London"],
  ["🇺🇸", "USA", "New York", "America/New_York"],
];

const weatherCities = [
  "Kochi",
  "Dubai",
  "Riyadh",
  "Tokyo",
  "London",
  "New York",
];

function App() {
  const [active, setActive] = useState("dashboard");
  const [sidebar, setSidebar] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [cases, setCases] = useState([]);
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");

  function navigate(id) {
    setActive(id);
    setSelectedTool(null);
    setSidebar(false);
  }

  function openTool(tool) {
    setSelectedTool(tool);
  }

  function addCase(data) {
    setCases((old) => [
      ...old,
      {
        id: Date.now(),
        title: data?.title || selectedTool || "Investigation",
        type: data?.type || "OSINT",
        status: "OPEN",
        date: new Date().toLocaleDateString(),
      },
    ]);
  }

  function addReport(title) {
    setReports((old) => [
      ...old,
      {
        id: Date.now(),
        title,
        date: new Date().toLocaleDateString(),
        status: "DRAFT",
      },
    ]);
  }

  return (
    <div className="app">
      <div className="grid-bg" />
      <div className="scan-line" />

      <header className="topbar">
        <button
          className="menu-btn"
          onClick={() => setSidebar(!sidebar)}
          aria-label="Navigation"
        >
          ☰
        </button>

        <button className="brand" onClick={() => navigate("dashboard")}>
          <span className="brand-mark">◉</span>
          <div>
            <h1>OSINT LAB</h1>
            <span>CYBER INTELLIGENCE PLATFORM</span>
          </div>
        </button>

        <div className="status">
          <i />
          SYSTEM ONLINE
        </div>
      </header>

      <aside className={`sidebar ${sidebar ? "open" : ""}`}>
        <div className="side-title">MODULES</div>

        <NavButton
          active={active === "dashboard"}
          icon="⌂"
          text="Dashboard"
          onClick={() => navigate("dashboard")}
        />

        {modules.map((m) => (
          <NavButton
            key={m.id}
            active={active === m.id}
            icon={m.icon}
            text={m.name}
            onClick={() => navigate(m.id)}
          />
        ))}

        <NavButton
          active={active === "evee"}
          icon="✦"
          text="EVEE AI"
          onClick={() => navigate("evee")}
        />

        <NavButton
          active={active === "cases"}
          icon="📁"
          text="Case Manager"
          onClick={() => navigate("cases")}
        />

        <NavButton
          active={active === "reports"}
          icon="📊"
          text="Reports"
          onClick={() => navigate("reports")}
        />

        <NavButton
          active={active === "settings"}
          icon="⚙"
          text="Settings"
          onClick={() => navigate("settings")}
        />

        <div className="side-footer">
          <div className="footer-line" />
          <small>DEVELOPED BY</small>
          <strong>NASIH AMEEN TH</strong>
          <a
            href="https://instagram.com/naassyhh"
            target="_blank"
            rel="noreferrer"
          >
            @naassyhh
          </a>
        </div>
      </aside>

      {sidebar && (
        <div className="overlay" onClick={() => setSidebar(false)} />
      )}

      <main className="main">
        <PageHeading active={active} />

        {active === "dashboard" && (
          <Dashboard
            navigate={navigate}
            openTool={openTool}
            addCase={addCase}
          />
        )}

        {active === "osint" && (
          <ToolModule
            title="OSINT"
            description="Open-source intelligence and public-source investigation"
            tools={modules[0].tools}
            openTool={openTool}
          />
        )}

        {active === "recon" && (
          <ToolModule
            title="RECON"
            description="Domain, infrastructure and technology reconnaissance"
            tools={modules[1].tools}
            openTool={openTool}
          />
        )}

        {active === "security" && (
          <ToolModule
            title="SECURITY"
            description="Security analysis and defensive investigation tools"
            tools={modules[2].tools}
            openTool={openTool}
          />
        )}

        {active === "bugbounty" && (
          <BugBounty
            openTool={openTool}
            navigate={navigate}
          />
        )}

        {active === "evee" && (
          <Evee
            openTool={openTool}
            addCase={addCase}
          />
        )}

        {active === "cases" && (
          <CaseManager cases={cases} setCases={setCases} />
        )}

        {active === "reports" && (
          <Reports reports={reports} addReport={addReport} />
        )}

        {active === "settings" && <Settings />}

        {selectedTool && (
          <ToolPanel
            tool={selectedTool}
            close={() => setSelectedTool(null)}
            addCase={addCase}
            addReport={addReport}
          />
        )}
      </main>
    </div>
  );
}

function NavButton({ active, icon, text, onClick }) {
  return (
    <button className={`nav-item ${active ? "active" : ""}`} onClick={onClick}>
      <span className="nav-icon">{icon}</span>
      <span>{text}</span>
    </button>
  );
}

function PageHeading({ active }) {
  const names = {
    dashboard: "Dashboard",
    osint: "OSINT",
    recon: "Recon",
    security: "Security",
    bugbounty: "Bug Bounty",
    evee: "EVEE AI",
    cases: "Case Manager",
    reports: "Reports",
    settings: "Settings",
  };

  const name = names[active] || active;

  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">OSINT LAB / {name.toUpperCase()}</p>
        <h2>{name}</h2>
      </div>
      <div className="heading-line">
        <span />
      </div>
    </div>
  );
}

function Dashboard({ navigate, openTool, addCase }) {
  return (
    <section className="dashboard">
      <div className="hero-card">
        <div className="hero-content">
          <span className="tag">SECURITY INTELLIGENCE</span>

          <h3>
            Welcome to <b>OSINT LAB</b>
          </h3>

          <p>
            Unified workspace for OSINT, reconnaissance, security analysis,
            authorized testing and investigation management.
          </p>

          <div className="progress">
            <span />
          </div>

          <div className="hero-meta">
            <span>CORE STATUS: READY</span>
            <span>LOCAL INTERFACE</span>
          </div>
        </div>

        <div className="orb">
          <div className="orb-inner">OSINT</div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-label">WORLD CLOCK / REAL-TIME</div>

        <div className="clock-grid">
          {clocks.map((clock) => (
            <WorldClock
              key={clock[3]}
              flag={clock[0]}
              country={clock[1]}
              city={clock[2]}
              timezone={clock[3]}
            />
          ))}
        </div>
      </div>

      <Weather />

      <div className="cards">
        <InfoCard
          title="OSINT"
          value="READY"
          detail="Intelligence modules"
        />
        <InfoCard
          title="RECON"
          value="READY"
          detail="Reconnaissance modules"
        />
        <InfoCard
          title="SECURITY"
          value="READY"
          detail="Security analysis"
        />
        <InfoCard
          title="EVEE"
          value="AI READY"
          detail="Cybersecurity assistant"
        />
      </div>

      <div className="quick">
        <div className="section-label">QUICK ACCESS</div>

        <div className="quick-grid">
          <button
            className="quick-button"
            onClick={() => navigate("osint")}
          >
            ◉ OSINT
          </button>

          <button
            className="quick-button"
            onClick={() => navigate("recon")}
          >
            ⌁ RECON
          </button>

          <button
            className="quick-button"
            onClick={() => navigate("security")}
          >
            ◈ SECURITY
          </button>

          <button
            className="quick-button"
            onClick={() => navigate("bugbounty")}
          >
            ⚡ BUG BOUNTY
          </button>

          <button
            className="quick-button"
            onClick={() => navigate("cases")}
          >
            📁 CASES
          </button>

          <button
            className="quick-button"
            onClick={() => navigate("reports")}
          >
            📊 REPORTS
          </button>
        </div>
      </div>
    </section>
  );
}

function WorldClock({ flag, country, city, timezone }) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    function update() {
      const now = new Date();

      setTime(
        now.toLocaleTimeString("en-GB", {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );

      setDate(
        now.toLocaleDateString("en-GB", {
          timeZone: timezone,
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      );
    }

    update();

    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, [timezone]);

  return (
    <div className="clock-card">
      <div className="clock-top">
        <span className="clock-flag">{flag}</span>

        <div>
          <strong>{country}</strong>
          <small>{city}</small>
        </div>
      </div>

      <div className="clock-time">{time}</div>
      <div className="clock-date">{date}</div>

      <div className="clock-status">
        <span />
        LIVE
      </div>
    </div>
  );
}

function Weather() {
  const [city, setCity] = useState("Kochi");

  return (
    <section className="weather-panel">
      <div className="section-label">WEATHER INTELLIGENCE</div>

      <div className="weather-top">
        <div>
          <span className="muted">LOCATION</span>

          <select value={city} onChange={(e) => setCity(e.target.value)}>
            {weatherCities.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="weather-current">
          <span>☁️</span>
          <strong>--°C</strong>
          <small>Connect weather API</small>
        </div>
      </div>

      <div className="weather-grid">
        <WeatherItem title="CONDITION" value="—" />
        <WeatherItem title="HUMIDITY" value="—" />
        <WeatherItem title="WIND" value="—" />
        <WeatherItem title="RAIN" value="—" />
      </div>

      <div className="forecast">
        <div className="forecast-title">7-DAY FORECAST</div>

        <div className="forecast-grid">
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
            (day) => (
              <div className="forecast-card" key={day}>
                <strong>{day}</strong>
                <span>☁</span>
                <small>—°</small>
              </div>
            )
          )}
        </div>
      </div>

      <small className="api-note">
        Weather interface ready — live values require a weather API connector.
      </small>
    </section>
  );
}

function WeatherItem({ title, value }) {
  return (
    <div className="weather-item">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function InfoCard({ title, value, detail }) {
  return (
    <div className="info-card">
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

function ToolModule({ title, description, tools, openTool }) {
  const [filter, setFilter] = useState("");

  const filtered = tools.filter((tool) =>
    tool.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section className="module">
      <div className="module-header">
        <span className="module-icon">◈</span>

        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

      <div className="tool-toolbar">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={`Search ${title} tools...`}
        />

        <span>{filtered.length} MODULES</span>
      </div>

      <div className="tool-grid">
        {filtered.map((tool) => (
          <button
            className="tool-card"
            key={tool}
            onClick={() => openTool(tool)}
          >
            <span>◈</span>
            <strong>{tool}</strong>
            <small>OPEN MODULE →</small>
          </button>
        ))}
      </div>
    </section>
  );
}

function BugBounty({ openTool, navigate }) {
  return (
    <section className="module">
      <div className="module-header">
        <span className="module-icon">⚡</span>

        <div>
          <h3>BUG BOUNTY</h3>
          <p>Authorized security testing workspace</p>
        </div>
      </div>

      <div className="notice">
        <strong>AUTHORIZED TESTING ONLY</strong>
        <p>
          Use testing tools only against systems and programs where you have
          explicit permission.
        </p>
      </div>

      <div className="tool-grid">
        {[
          "Authorized Programs",
          "Program Scope",
          "Rewards",
          "Rules",
          "Web Testing",
          "API Testing",
          "Recon",
          "Vulnerability Assessment",
          "Findings",
          "Validation",
          "Evidence",
          "Severity / Risk",
          "Report Generator",
        ].map((tool) => (
          <button
            className="tool-card"
            key={tool}
            onClick={() => openTool(tool)}
          >
            <span>⚡</span>
            <strong>{tool}</strong>
            <small>OPEN MODULE →</small>
          </button>
        ))}
      </div>

      <div className="subsection">
        <div className="section-label">ANDROID APP SECURITY</div>

        <div className="tool-grid">
          {androidTools.map((tool) => (
            <button
              className="tool-card"
              key={tool}
              onClick={() => openTool(tool)}
            >
              <span>📱</span>
              <strong>{tool}</strong>
              <small>OPEN MODULE →</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolPanel({ tool, close, addCase, addReport }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [file, setFile] = useState(null);

  const isJohn = tool === "John the Ripper";
  const isEmail = tool === "Email Intelligence";
  const isPhone = tool === "Phone Intelligence";
  const isImage =
    tool.includes("Image") ||
    tool === "OCR" ||
    tool === "Media Authenticity" ||
    tool === "Visual Recognition";
  const isAPK = tool.toLowerCase().includes("apk");

  function analyze() {
    setResult({
      target: input || file?.name || "No target entered",
      status: "LOCAL ANALYSIS READY",
      time: new Date().toLocaleTimeString(),
    });
  }

  return (
    <div className="modal-backdrop">
      <div className="tool-modal">
        <div className="modal-header">
          <div>
            <span className="tag">OSINT LAB MODULE</span>
            <h3>{tool}</h3>
          </div>

          <button className="close-btn" onClick={close}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {isJohn ? (
            <JohnRipperPanel
              file={file}
              setFile={setFile}
              input={input}
              setInput={setInput}
              result={result}
              setResult={setResult}
            />
          ) : (
            <>
              {isImage || isAPK ? (
                <label className="upload-box">
                  <input
                    type="file"
                    accept={isImage ? "image/*,video/*" : ".apk"}
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  <span>📁</span>
                  <strong>
                    {file ? file.name : "SELECT FILE FROM DEVICE"}
                  </strong>
                  <small>Local file selection</small>
                </label>
              ) : (
                <div className="input-block">
                  <label>INPUT / TARGET</label>

                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Enter ${tool} target...`}
                  />
                </div>
              )}

              <div className="action-row">
                <button className="primary-btn" onClick={analyze}>
                  ANALYZE
                </button>

                <button
                  className="secondary-btn"
                  onClick={() =>
                    setResult({
                      status: "MODULE CONFIGURATION READY",
                      target: input || file?.name || "—",
                    })
                  }
                >
                  PREVIEW
                </button>
              </div>

              {result && (
                <AnalysisResult
                  result={result}
                  addCase={addCase}
                  addReport={addReport}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function JohnRipperPanel({
  file,
  setFile,
  input,
  setInput,
  result,
  setResult,
}) {
  const [hashType, setHashType] = useState("Auto Detect");
  const [running, setRunning] = useState(false);

  function startAudit() {
    setRunning(true);

    setTimeout(() => {
      setRunning(false);

      setResult({
        status: "AUDIT PREVIEW COMPLETE",
        target: input || "Hash supplied",
        note: "Connect a local authorized audit backend to execute John the Ripper.",
      });
    }, 700);
  }

  return (
    <div className="john-panel">
      <div className="notice">
        <strong>AUTHORIZED PASSWORD AUDITING</strong>
        <p>
          Use only with hashes and systems you own or have explicit permission
          to audit.
        </p>
      </div>

      <div className="input-block">
        <label>HASH INPUT</label>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter authorized hash..."
        />
      </div>

      <div className="input-block">
        <label>HASH TYPE</label>

        <select
          value={hashType}
          onChange={(e) => setHashType(e.target.value)}
        >
          <option>Auto Detect</option>
          <option>MD5</option>
          <option>SHA-1</option>
          <option>SHA-256</option>
          <option>NTLM</option>
          <option>bcrypt</option>
        </select>
      </div>

      <div className="input-block">
        <label>WORDLIST / PASSLIST</label>

        <label className="file-selector">
          <input
            type="file"
            accept=".txt,.lst,.dic"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <span>📁 SELECT FROM DEVICE</span>
        </label>

        <small className="selected-file">
          {file ? `Selected: ${file.name}` : "No passlist selected"}
        </small>
      </div>

      <div className="john-options">
        <button
          className="secondary-btn"
          onClick={() =>
            setResult({
              status: "COMMAND PREVIEW",
              target: input || "hash",
              wordlist: file?.name || "No wordlist",
              hashType,
            })
          }
        >
          COMMAND PREVIEW
        </button>

        <button
          className="primary-btn"
          disabled={running}
          onClick={startAudit}
        >
          {running ? "RUNNING..." : "START AUDIT"}
        </button>

        <button
          className="danger-btn"
          onClick={() => {
            setRunning(false);
            setResult({
              status: "AUDIT STOPPED",
            });
          }}
        >
          STOP
        </button>
      </div>

      {result && <AnalysisResult result={result} />}
    </div>
  );
}

function AnalysisResult({ result, addCase, addReport }) {
  return (
    <div className="result-box">
      <div className="result-title">RESULT / EVIDENCE</div>

      <div className="result-grid">
        {Object.entries(result).map(([key, value]) => (
          <div key={key}>
            <span>{key.toUpperCase()}</span>
            <strong>{String(value)}</strong>
          </div>
        ))}
      </div>

      <div className="action-row">
        {addCase && (
          <button
            className="secondary-btn"
            onClick={() =>
              addCase({
                title: result.target || "Investigation",
                type: "ANALYSIS",
              })
            }
          >
            ADD TO CASE
          </button>
        )}

        {addReport && (
          <button
            className="secondary-btn"
            onClick={() => addReport("Security Analysis Report")}
          >
            EXPORT / REPORT
          </button>
        )}
      </div>
    </div>
  );
}

function Evee({ addCase }) {
  const [messages, setMessages] = useState([
    {
      from: "EVEE",
      text: "Hello. I'm EVEE, your personal cybersecurity and ethical-hacking learning assistant.",
    },
  ]);

  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;

    const question = input.trim();

    setMessages((old) => [
      ...old,
      { from: "YOU", text: question },
      {
        from: "EVEE",
        text:
          "I can help structure this as an OSINT, recon, security, coding, defensive or authorized-testing task. Connect an AI API/backend in Settings for live AI responses.",
      },
    ]);

    setInput("");
  }

  return (
    <section className="evee">
      <div className="evee-header">
        <div className="evee-avatar">E</div>

        <div>
          <span>PERSONAL CYBERSECURITY AI</span>
          <h3>EVEE</h3>
        </div>
      </div>

      <div className="evee-capabilities">
        {[
          "Chat AI",
          "Cyber AI",
          "Recon AI",
          "Security AI",
          "Analyst AI",
          "Coding",
          "OSINT Analysis",
          "Threat Detection",
          "Reports",
          "Correlation",
        ].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            className={`chat-message ${
              message.from === "YOU" ? "user-message" : ""
            }`}
            key={index}
          >
            <b>{message.from}</b>
            <p>{message.text}</p>
          </div>
        ))}

        <div className="input-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
            placeholder="Ask EVEE about cybersecurity..."
          />

          <button onClick={send}>➤</button>
        </div>
      </div>

      <button
        className="secondary-btn"
        onClick={() =>
          addCase({
            title: "EVEE Investigation",
            type: "EVEE",
          })
        }
      >
        CREATE EVEE CASE
      </button>
    </section>
  );
}

function CaseManager({ cases, setCases }) {
  return (
    <section className="module">
      <div className="module-header">
        <span className="module-icon">📁</span>

        <div>
          <h3>CASE MANAGER</h3>
          <p>Results, evidence, sources, notes and timelines</p>
        </div>
      </div>

      <div className="case-summary">
        <InfoCard title="CASES" value={cases.length} detail="Total cases" />
        <InfoCard title="OPEN" value={cases.length} detail="Active workspace" />
        <InfoCard title="EVIDENCE" value="—" detail="Collected items" />
        <InfoCard title="RISK" value="—" detail="Correlation score" />
      </div>

      {cases.length === 0 ? (
        <EmptyState
          title="NO CASES YET"
          text="Use Add to Case from an analysis module."
        />
      ) : (
        <div className="case-list">
          {cases.map((item) => (
            <div className="case-card" key={item.id}>
              <div>
                <span>{item.type}</span>
                <h4>{item.title}</h4>
                <small>{item.date}</small>
              </div>

              <div>
                <b>{item.status}</b>

                <button
                  className="danger-small"
                  onClick={() =>
                    setCases((old) =>
                      old.filter((caseItem) => caseItem.id !== item.id)
                    )
                  }
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function Reports({ reports, addReport }) {
  return (
    <section className="module">
      <div className="module-header">
        <span className="module-icon">📊</span>

        <div>
          <h3>REPORTS</h3>
          <p>Investigation and security reporting workspace</p>
        </div>
      </div>

      <div className="report-types">
        {[
          "OSINT Investigation Report",
          "Recon Report",
          "Security Analysis Report",
          "Bug Bounty Report",
          "Android Security Report",
          "Evidence Report",
          "Timeline Report",
        ].map((title) => (
          <button
            className="tool-card"
            key={title}
            onClick={() => addReport(title)}
          >
            <span>📄</span>
            <strong>{title}</strong>
            <small>CREATE DRAFT →</small>
          </button>
        ))}
      </div>

      <div className="section-label">REPORT QUEUE</div>

      {reports.length === 0 ? (
        <EmptyState
          title="NO REPORTS"
          text="Create a report from the options above."
        />
      ) : (
        <div className="case-list">
          {reports.map((report) => (
            <div className="case-card" key={report.id}>
              <div>
                <span>REPORT</span>
                <h4>{report.title}</h4>
                <small>{report.date}</small>
              </div>

              <b>{report.status}</b>
            </div>
          ))}
        </div>
      )}

      <div className="notice">
        <strong>PDF EXPORT</strong>
        <p>
          The report workspace is prepared for PDF export integration. A PDF
          generator/backend can be connected later.
        </p>
      </div>
    </section>
  );
}

function EmptyState({ title, text }) {
  return (
    <div className="empty-state">
      <div>📁</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Settings() {
  const [localMode, setLocalMode] = useState(true);
  const [privacy, setPrivacy] = useState(true);

  return (
    <section className="module">
      <div className="module-header">
        <span className="module-icon">⚙</span>

        <div>
          <h3>SETTINGS</h3>
          <p>Connectors, tools, storage and privacy</p>
        </div>
      </div>

      <div className="settings-list">
        <SettingRow
          title="API CONNECTORS"
          detail="Configure external intelligence providers"
          button="CONFIGURE"
        />

        <SettingRow
          title="TOOL CONFIGURATION"
          detail="Manage local analysis modules"
          button="CONFIGURE"
        />

        <SettingRow
          title="API KEYS"
          detail="Store provider credentials securely"
          button="MANAGE"
        />

        <SettingRow
          title="STORAGE"
          detail="Local cases and report storage"
          button="LOCAL"
        />

        <div className="setting-toggle">
          <div>
            <strong>LOCAL MODE</strong>
            <small>Prefer local processing where supported</small>
          </div>

          <button
            className={localMode ? "toggle on" : "toggle"}
            onClick={() => setLocalMode(!localMode)}
          >
            {localMode ? "ON" : "OFF"}
          </button>
        </div>

        <div className="setting-toggle">
          <div>
            <strong>PRIVACY MODE</strong>
            <small>Minimize external data transmission</small>
          </div>

          <button
            className={privacy ? "toggle on" : "toggle"}
            onClick={() => setPrivacy(!privacy)}
          >
            {privacy ? "ON" : "OFF"}
          </button>
        </div>

        <SettingRow
          title="ABOUT"
          detail="OSINT LAB Cyber Intelligence Platform"
          button="INFO"
        />
      </div>
    </section>
  );
}

function SettingRow({ title, detail, button }) {
  return (
    <div className="setting-row">
      <div>
        <strong>{title}</strong>
        <small>{detail}</small>
      </div>

      <button className="secondary-btn">{button}</button>
    </div>
  );
}

export default App;

