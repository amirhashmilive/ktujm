# KTUJM Scholars

> **An independent, student-run academic resource hub and Ph.D. scholars mentorship commons.**  
> **Live Site:** [https://amirhashmilive.github.io/ktujm/](https://amirhashmilive.github.io/ktujm/)  
> **Status:** Phase 1 Foundation Active  

---

## ⚖️ Independent Status & Institutional Neutrality

**KTUJM Scholars** is an independent, non-commercial initiative founded by alumnus and Ph.D. scholar Amir Hashmi. 

> **Important Notice:** This platform is **NOT affiliated with, sponsored by, or endorsed by** Kushabhau Thakre Patrakarita Avam Jansanchar Vishwavidyalaya (KTUJM), Raipur. The official website of the university is [https://www.ktujm.ac.in/](https://www.ktujm.ac.in/).  
> All syllabi and paper codes are reproduced tentatively for study guidance only. Authoritative ordinances and evaluation schemes are available exclusively on the university's official ordinance portal: [https://www.ktujm.ac.in/ordinance.htm](https://www.ktujm.ac.in/ordinance.htm).

---

## 🏛️ 3-Tier Editorial Governance Model

To ensure this platform thrives permanently across graduating batches of research scholars, editorial oversight is distributed across three clear tiers:

1. **Founder & Permanent Patron (Amir Hashmi):** Holds permanent oversight, infrastructure stewardship, long-term vision, alumni partnerships, and senior appointments.
2. **Managing Editor (1-Year Term):** Appointed annually from active senior Ph.D. scholars to coordinate the publishing calendar, review queues, and campus engagement.
3. **Departmental Coordinators (1–2 Scholars per Department):** Active researchers across all 9 university departments who verify syllabus alignment, review note contributions, and nominate alumni.

### The Mandatory Succession & Shadowing Rule
Every Departmental Coordinator and Managing Editor must recruit and train a junior Ph.D. scholar (1st or 2nd year) **at least three months before submitting their doctoral thesis** to ensure seamless knowledge transfer upon graduation.

---

## 📚 Academic LMS & Note Repository Architecture

Study notes follow a strict, faceted hierarchy:
`Course → Semester → Paper Code → Unit → Topic`

### Note Structure (Standard 7 Sections)
Each topic note contains:
1. **Definition:** Academic definition with authoritative citations.
2. **Key Concepts / Models:** Core theoretical breakdown.
3. **Diagram:** Visual flowchart using Mermaid syntax.
4. **Examples:** Real-world instances grounded in Chhattisgarh and Indian media contexts.
5. **Exam-Style Questions:** Short answer (5 marks, ≤100 words) and long answer (10 marks).
6. **Further Reading:** Recommended textbooks and research papers.
7. **References:** Formal APA / MLA citations.

---

## 🛠️ How to Add Notes & Regenerate Stubs Safely

### 1. Generating Note Stubs Idempotently
When a new syllabus YAML is added to `content/syllabus/` (e.g., `mamc.yaml`):

```bash
npm run gen:stubs
```

- **Idempotency Guarantee:** The script checks every existing file. Files containing human-written notes are **NEVER overwritten**. Only missing files or unchanged stubs marked with `<!-- STUB:AUTO-GENERATED -->` are updated.

### 2. Contributing Notes via Git
1. Locate the note file in `content/notes/<course>/sem-<n>/<paper_code>/unit-<n>/<topic-slug>.md`.
2. Replace the stub template with your verified notes.
3. In frontmatter, change `status: "draft"` to `"review"`, add your name as `author`, and specify the current date.
4. Open a Pull Request on GitHub. A Departmental Coordinator will verify and publish your notes with full academic credit.

---

## 🚀 Local Development & Static Build

Built with [Astro](https://astro.build/) and indexed with [Pagefind](https://pagefind.app/) for fast, free, static client-side search.

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build static output and generate Pagefind search index
npm run build

# Preview static distribution
npm run preview
```

---

## 📁 Repository Directory Structure

```text
ktujm/
├── .github/workflows/deploy.yml   # Automatic GitHub Pages CI/CD
├── astro.config.mjs              # Astro configuration (base: '/ktujm')
├── content/
│   ├── syllabus/
│   │   └── mamc.yaml             # MAMC Ordinance 08 complete syllabus data
│   └── notes/
│       └── mamc/                 # 554 generated topic stubs across 4 semesters
├── scripts/
│   └── gen_stubs.js              # Idempotent YAML-to-Markdown stub generator
├── src/
│   ├── components/               # Header, Footer, Breadcrumbs, DraftBadge, TentativeNotice
│   ├── layouts/BaseLayout.astro  # Global layout with persistent disclaimer banners
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── about.astro           # Founder's vision & charter
│   │   ├── contribute.astro      # 7-section template & 8-10 alumni questions
│   │   ├── editorial-board.astro # 3-tier governance & shadowing rule
│   │   ├── disclaimer.astro      # Full legal and institutional-neutrality policy
│   │   ├── career-alumni.astro   # Alumni media series hub
│   │   ├── clubs-events.astro    # Campus events calendar (Phase 2 placeholder)
│   │   ├── marketplace.astro     # Student commons & book exchange (Phase 3 placeholder)
│   │   ├── courses/              # Course directory & dynamic MAMC paper/topic routes
│   │   └── departments/          # 9 academic department profiles
│   └── styles/global.css         # Clean, accessible styling
└── README.md
```
