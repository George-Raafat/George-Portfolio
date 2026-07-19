# Prompt Specification for UML-Themed Portfolio

**Use this document as a master prompt for an AI or a developer to build your portfolio website.**

---

## 1. Role & Objective
You are an expert web developer and UI/UX designer. Your objective is to build a responsive, single-page portfolio website for **George Raafat**, a Backend Software Engineer. 

## 2. Technical Stack
- **Core**: HTML5, Semantic HTML.
- **Styling**: Vanilla CSS (CSS Variables for theming, Flexbox/Grid for layout). No Tailwind or external frameworks.
- **Interactivity**: Vanilla JavaScript (for dark/light mode toggle, smooth scrolling, mobile menu).
- **Icons**: Devicons for tech stacks, Phosphor/Lucide for UI icons.

## 3. Global Design & Aesthetics (UML / System Design Theme)
The portfolio must look like a **UML Diagram or System Architecture Map** to emphasize the user's backend and system design expertise. 
- **Borders & Shapes**: Use thin, crisp borders (e.g., `1px solid var(--border-color)`) around sections, cards, and buttons. Elements should resemble UML class boxes, database cylinders, or system nodes.
- **Connections**: Add visual cues like connecting lines (drawn via CSS borders or SVG) or arrows between certain sections to make the flow look like a data pipeline or architecture diagram.
- **Dark/Light Mode**: 
  - *Dark Mode (Default)*: Deep charcoal/black background (`#0A0A0A`) with bright glowing accents (neon green or cyan, reminiscent of terminal or high-tech dashboards). Text in light grey/off-white.
  - *Light Mode*: Clean white background with stark black borders (like a printed architectural blueprint or white-boarded system design). Accents in dark blue or deep green.
  - Provide a toggle in the header (sun/moon icon).
- **Typography**: 
  - Headings: Use a clean geometric sans-serif (e.g., *Inter* or *Outfit*).
  - Body/Code blocks: Use a monospaced font (e.g., *Fira Code*, *JetBrains Mono*, or *Roboto Mono*) for tags, roles, and dates to enforce the software engineer vibe.

## 4. Layout & Section Ordering
The page must flow strictly in this order:
1. Header (Sticky)
2. Hero
3. About
4. Skills
5. Experience
6. Projects
7. Contact

### 4.1 Header (Navigation)
- **Style**: Glassmorphism or solid bordered bar at the top (inspired by Portfolio 1).
- **Content**: Logo/Name on the left ("George Raafat" or "GR"). Navigation links matching the sections. Dark/Light mode toggle. Mobile hamburger menu.
- **UML Touch**: The active link could have a bracket `[ ]` or an arrow `->` next to it.

### 4.2 Hero Section
- **Greeting**: "Hello, I'm" followed by the name **George Raafat**.
- **Tagline**: "Back-end Software Engineer" (or use a typing effect).
- **"Find Me" Block**: Incorporate a prominent "Find me on" area right in the hero (GitHub, LinkedIn, Email). Style these as terminal commands or clickable node endpoints.
- **UML Touch**: The hero could have a background pattern of faint grid lines (like blueprint paper).

### 4.3 About
- Keep the bio professional and concise. 
- Highlight the 3.8/4.0 GPA, attention to detail, and backend expertise.
- **UML Touch**: Present the "About" text as a JSON object, or a stylized text box resembling a comment block `/* ... */` in code.

### 4.4 Skills (Categorized)
- Group skills logically as seen in Portfolio 1:
  - *Programming Languages*: Java, Kotlin, Python, JS/TS, C++, C.
  - *Frameworks*: Spring Boot, Frappe, Flask, Django, Nest.js, Next.js.
  - *Databases*: MySQL, PostgreSQL, MongoDB, etc.
  - *Tools & Tech*: Docker, Git, Linux, Nginx, Prisma.
- **UML Touch**: Display each category as a "Package" or "Component" UML box. Inside the box, list the skills as attributes with their respective Devicons.

### 4.5 Experience
- Present the work history chronologically (AppyInnovate, Banque Misr, NCI, ALX Africa).
- **UML Touch**: Display as an "Activity Diagram" or a vertical timeline where each job is a "Process Node" connected by a vertical line. Use monospace fonts for dates and roles.

### 4.6 Projects (No-Thumbnail UX Solution)
Since there are no thumbnails, use a **Class Diagram or Database Schema** visual approach to make the projects look stunning without images.
- **Design Solution**: Each project is a "Class Box".
  - **Header**: Project Name (e.g., `SmartGallery`).
  - **Compartment 1 (Attributes)**: Duration, Role, Tech Stack (represented as a list of types: `+ tech: [Spring Boot, PostgreSQL]`).
  - **Compartment 2 (Methods/Features)**: The bullet points of what was achieved (e.g., `+ implementedOfflineSearch()`, `+ designedMVVM()`).
  - **Footer**: A link to the repository styled as an API endpoint or a UML return type.
- This approach completely eliminates the need for images while perfectly aligning with the system design theme.

### 4.7 Contact
- A clean form or a set of direct links to get in touch.
- **UML Touch**: Style the form like a "POST Request" payload builder, with input fields looking like key-value pairs awaiting user input.

## 5. Animation & Micro-interactions
- Add hover effects on the UML boxes (e.g., borders glow, or the box lifts slightly).
- Use subtle entry animations (fade in, slide up) as the user scrolls down the page.
- Keep animations snappy and mechanical, rather than bouncy, to fit the engineering theme.

---
**Final Instructions for Developer/AI**: 
Read the `portfolio_content.md` file for the exact text, links, and data. Use the specifications above to generate the HTML, CSS, and JS files. Ensure the final result feels premium, highly technical, and immediately communicates "Expert Backend Engineer".
