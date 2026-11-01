import { useEffect, useState } from "react";
import {
  profile,
  stats,
  experience,
  projects,
  skills,
  education,
  achievements,
} from "./data.js";

// Backend ka URL (deploy ke baad .env.production me set karna). Khali ho to mailto fallback chalega.
const API_URL = import.meta.env.VITE_API_URL || "";

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    } catch {
      return "light";
    }
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);
  return (
    <button className="navbtn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}

function Section({ id, title, path, children }) {
  return (
    <section id={id}>
      <div className="sec-h">
        <h2>{title}</h2>
        <span className="path">{path}</span>
      </div>
      {children}
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [sending, setSending] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!API_URL) {
      // Backend nahi hai to user ke mail app me khol do
      const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }
    setSending(true);
    setStatus({ type: "", msg: "" });
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus({ type: "ok", msg: "Message sent. Thanks, I will reply soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ type: "err", msg: err.message });
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <label>
        Name
        <input name="name" value={form.name} onChange={onChange} required maxLength={100} />
      </label>
      <label>
        Email
        <input name="email" type="email" value={form.email} onChange={onChange} required maxLength={150} />
      </label>
      <label>
        Message
        <textarea name="message" rows={5} value={form.message} onChange={onChange} required maxLength={2000} />
      </label>
      <button className="btn primary" type="submit" disabled={sending}>
        {sending ? "Sending..." : "Send message"}
      </button>
      {status.msg && <p className={`status ${status.type}`}>{status.msg}</p>}
    </form>
  );
}

export default function App() {
  return (
    <div className="wrap">
      <header className="bar">
        <a className="brand" href="#top" id="top">{profile.name}</a>
        <nav className="nav" aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
          <ThemeToggle />
        </nav>
      </header>

      <main>
        <div className="hero">
          <div>
            <p className="eyebrow">{profile.role}</p>
            <h1>{profile.headline}</h1>
            <p className="lede">{profile.summary}</p>
            <div className="cta">
              <a className="btn primary" href="#contact">Get in touch</a>
              <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
          <div className="req" role="img" aria-label="Sample API response describing Milind">
            <div className="head"><span>GET /milind</span><span className="ok">200 OK</span></div>
            <pre>{`{
  "name": "${profile.name}",
  "role": "Software Engineer Associate",
  "company": "Xyncely",
  "stack": ["Python", "FastAPI",
            "PostgreSQL", "Redis"],
  "education": "MCA, CDAC Noida",
  "open_to": "backend roles"
}`}</pre>
          </div>
        </div>

        <Section id="work" title="Work" path="/experience">
          <div className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="role">
            <h3>{experience.title}, {experience.company}</h3>
            <small>{experience.period}</small>
          </div>
          <div className="routes">
            {experience.items.map((it) => (
              <div className="route" key={it.tag}>
                <span className="tag">{it.tag}</span>
                <p>{it.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects" path="/projects">
          <div className="grid">
            {projects.map((p) => (
              <article className="card" key={p.name}>
                <h3>{p.name}</h3>
                <p className="meta">{p.subtitle} · {p.period}</p>
                <ul>
                  {p.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
                <ul className="chips" aria-label="Technologies">
                  {p.tech.map((t) => <li key={t}>{t}</li>)}
                </ul>
                {p.link && (
                  <p className="note"><a href={p.link} target="_blank" rel="noopener noreferrer">View project →</a></p>
                )}
              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills" path="/skills">
          <dl className="skills">
            {skills.map((s) => (
              <div className="skill" key={s.group}>
                <dt>{s.group}</dt>
                <dd>{s.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="education" title="Education" path="/education">
          <div className="edu">
            {education.map((e) => (
              <div key={e.title}>
                <b>{e.title}</b>
                <span className="when">{e.period}</span>
                <em>{e.note}</em>
              </div>
            ))}
          </div>
          <h3 className="sub">Achievements</h3>
          <ul className="plain">
            {achievements.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </Section>

        <Section id="contact" title="Contact" path="/contact">
          <div className="contact-grid">
            <div className="contact">
              <p>I am looking for backend and software engineering roles. Send me a note about the role or the team.</p>
              <p className="mono">{profile.email}<br />{profile.phone}</p>
            </div>
            <Contact />
          </div>
        </Section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Python · FastAPI · PostgreSQL · React</span>
      </footer>
    </div>
  );
}
