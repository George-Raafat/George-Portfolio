/**
 * app.js — Portfolio Application Logic
 * George Raafat | Back-end Software Engineer
 *
 * Responsibilities:
 *   1. Imports all content from data.js (data layer)
 *   2. Dynamically renders every section into the DOM
 *   3. Handles: dark/light mode toggle, hamburger menu,
 *      smooth scrolling, active nav highlight, scroll reveal,
 *      contact form validation, and micro-interactions
 */

import { portfolioData as D } from './data.js';

/* ═══════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════ */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/**
 * Safely set innerHTML; elements not found are silently skipped.
 */
function inject(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

/** Escape HTML entities for safe text rendering */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ═══════════════════════════════════════
   1. THEME TOGGLE
   ═══════════════════════════════════════ */

function initTheme() {
  const root    = document.documentElement;
  const btn     = document.getElementById('theme-toggle');
  const saved   = localStorage.getItem('gr-theme') || 'dark';

  root.setAttribute('data-theme', saved);

  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('gr-theme', next);
  });
}

/* ═══════════════════════════════════════
   2. HAMBURGER MOBILE MENU
   ═══════════════════════════════════════ */

function initMobileMenu() {
  const burger  = document.getElementById('hamburger');
  const navList = document.getElementById('nav-links');

  burger.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close when a nav link is clicked
  navList.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
      navList.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !navList.contains(e.target)) {
      navList.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ═══════════════════════════════════════
   3. STICKY HEADER + ACTIVE NAV
   ═══════════════════════════════════════ */

function initNavBehaviour() {
  const header   = document.getElementById('site-header');
  const links    = $$('.nav-link');
  const sections = $$('section[id]');

  // Sticky shadow on scroll
  const handleScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);

    // Active link highlighting via IntersectionObserver
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Intersection Observer for active section highlighting
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((a) => {
            a.classList.toggle('active', a.dataset.section === id);
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: `-${64}px 0px -40% 0px` }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ═══════════════════════════════════════
   4. SCROLL REVEAL
   ═══════════════════════════════════════ */

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  $$('.reveal').forEach((el) => observer.observe(el));
}

/* ═══════════════════════════════════════
   5. CONTACT FORM
   ═══════════════════════════════════════ */

function initContactForm() {
  const form     = document.getElementById('contact-form');
  const response = document.getElementById('form-response');

  if (!form) return;

  const rules = {
    name:    { id: 'contact-name',    errId: 'name-error',    msg: 'Please enter your name.' },
    email:   { id: 'contact-email',   errId: 'email-error',   msg: 'Please enter a valid email address.' },
    subject: { id: 'contact-subject', errId: 'subject-error', msg: 'Please enter a subject.' },
    message: { id: 'contact-message', errId: 'message-error', msg: 'Please enter your message.' },
  };

  // Live validation on blur
  Object.values(rules).forEach(({ id, errId, msg }) => {
    const input = document.getElementById(id);
    const err   = document.getElementById(errId);
    if (!input || !err) return;

    input.addEventListener('blur', () => {
      const isEmail = input.type === 'email';
      const valid   = isEmail
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())
        : input.value.trim().length > 0;
      err.textContent = valid ? '' : msg;
      input.style.borderColor = valid ? '' : 'var(--accent-error)';
    });

    input.addEventListener('input', () => {
      err.textContent = '';
      input.style.borderColor = '';
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    Object.values(rules).forEach(({ id, errId, msg }) => {
      const input = document.getElementById(id);
      const err   = document.getElementById(errId);
      if (!input || !err) return;

      const isEmail = input.type === 'email';
      const ok      = isEmail
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())
        : input.value.trim().length > 0;

      if (!ok) {
        err.textContent = msg;
        input.style.borderColor = 'var(--accent-error)';
        valid = false;
      }
    });

    if (!valid) return;

    const btn = document.getElementById('form-submit');
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Sending...';

    // Build mailto as fallback (no server-side backend needed for static hosting)
    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    const mailto = `mailto:${esc(D.personal.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${message}`)}`;

    setTimeout(() => {
      window.location.href = mailto;
      response.textContent = '// Response: 200 OK — Email client opened.';
      response.className = 'form-response success';
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Send Request';
    }, 600);
  });
}

/* ═══════════════════════════════════════
   6. RENDER — HEADER / LOGO
   ═══════════════════════════════════════ */

function renderNav() {
  const logo = document.getElementById('nav-logo');
  if (logo) {
    logo.innerHTML = `<span class="mono">&lt;</span>${esc(D.personal.initials)}<span class="mono">/&gt;</span>`;
  }
}

/* ═══════════════════════════════════════
   7. RENDER — HERO
   ═══════════════════════════════════════ */

function renderHero() {
  // Tag
  inject('hero-tag', `// ${esc(D.personal.location)}`);

  // Name & Title
  inject('hero-name', esc(D.personal.name));
  inject('hero-title', esc(D.personal.title));

  // Summary
  inject('hero-summary', esc(D.personal.title === D.summary ? '' : D.summary));
  const summaryEl = document.getElementById('hero-summary');
  if (summaryEl) summaryEl.textContent = D.summary;

  // Social Links
  const links = [
    { href: D.personal.github,   icon: 'ph ph-github-logo', label: 'GitHub',   text: '@George-Raafat' },
    { href: D.personal.linkedin, icon: 'ph ph-linkedin-logo', label: 'LinkedIn', text: 'in/georgeraafat' },
    { href: `mailto:${D.personal.email}`, icon: 'ph ph-envelope', label: 'Email', text: D.personal.email },
  ];

  inject('hero-links', links.map(l => `
    <a href="${esc(l.href)}" class="hero-link" target="_blank" rel="noopener noreferrer" aria-label="${esc(l.label)}">
      <i class="${esc(l.icon)}" aria-hidden="true"></i>
      <span>${esc(l.text)}</span>
    </a>`).join(''));

  // UML Diagram (decorative system node)
  renderHeroUML();
}

function renderHeroUML() {
  const attrs = [
    { vis: '+', name: 'name',     type: 'String',  val: `"${D.personal.name}"` },
    { vis: '+', name: 'role',     type: 'String',  val: `"${D.personal.title}"` },
    { vis: '+', name: 'gpa',      type: 'float',   val: D.education[0].gpa.replace(' / ', '/') },
    { vis: '+', name: 'location', type: 'String',  val: `"${D.personal.location}"` },
    { vis: '#', name: 'focus',    type: 'Domain',  val: '"Backend & Systems"' },
  ];

  const methods = [
    { name: 'buildSystem', params: 'spec: Requirements', ret: 'Architecture' },
    { name: 'deployToCloud', params: 'env: Docker', ret: 'ServiceURL' },
    { name: 'designSchema', params: 'domain: ERD', ret: 'Database' },
    { name: 'optimizeQuery', params: 'sql: Query', ret: 'QueryPlan' },
  ];

  const attrsHTML = attrs.map(a => `
    <div class="uml-attr">
      <span class="uml-attr-vis">${esc(a.vis)}</span>
      <span class="uml-attr-name">${esc(a.name)}</span>
      <span class="uml-attr-type">: ${esc(a.type)}</span>
      <span style="color:var(--text-muted); margin-left:4px;">= ${esc(a.val)}</span>
    </div>`).join('');

  const methodsHTML = methods.map(m => `
    <div class="uml-attr">
      <span class="uml-attr-vis">+</span>
      <span class="uml-attr-name" style="color:var(--accent)">${esc(m.name)}</span>
      <span class="uml-attr-type">(${esc(m.params)}): ${esc(m.ret)}</span>
    </div>`).join('');

  const html = `
    <div class="uml-node reveal">
      <div class="uml-node-header">
        <span class="uml-node-title">&lt;&lt;Engineer&gt;&gt;<br>George Raafat</span>
        <span class="uml-node-type">class</span>
      </div>
      <div class="uml-node-body">
        <div style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);letter-spacing:.08em;margin-bottom:6px;">— attributes —</div>
        ${attrsHTML}
        <div style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);letter-spacing:.08em;margin:10px 0 6px;border-top:1px solid var(--border-dim);padding-top:10px;">— methods —</div>
        ${methodsHTML}
      </div>
    </div>
    <div class="uml-connector">
      <div class="uml-connector-line"></div>
      <span style="font-family:var(--font-mono);font-size:0.65rem;">implements</span>
      <div class="uml-connector-line"></div>
    </div>
    <div class="uml-node reveal reveal-delay-2">
      <div class="uml-node-header">
        <span class="uml-node-title">&lt;&lt;interface&gt;&gt;<br>SoftwareEngineer</span>
        <span class="uml-node-type">interface</span>
      </div>
      <div class="uml-node-body">
        <div class="uml-attr"><span class="uml-attr-vis">+</span><span class="uml-attr-name">solveProblems</span><span class="uml-attr-type">(): Solution</span></div>
        <div class="uml-attr"><span class="uml-attr-vis">+</span><span class="uml-attr-name">writeCleanCode</span><span class="uml-attr-type">(): Codebase</span></div>
        <div class="uml-attr"><span class="uml-attr-vis">+</span><span class="uml-attr-name">collaborateWithTeam</span><span class="uml-attr-type">(): Product</span></div>
      </div>
    </div>`;

  inject('hero-uml-diagram', html);
}

/* ═══════════════════════════════════════
   8. RENDER — ABOUT
   ═══════════════════════════════════════ */

function renderAbout() {
  const edu = D.education[0];

  // Comment block — present summary as a JSDoc/comment block
  const lines = [
    { key: null,     val: null,  raw: '/**' },
    { key: ' * @class',   val: null, raw: null, keyword: D.personal.name },
    { key: ' * @extends', val: null, raw: null, keyword: 'SoftwareEngineer' },
    { key: null,     val: null,  raw: ' *' },
    { key: ' * @description', val: null, raw: null },
    ...D.summary.match(/.{1,60}(\s|$)/g).map((chunk, i) => ({
      key: null, val: null, raw: ` *   ${chunk.trim()}`
    })),
    { key: null,     val: null,  raw: ' *' },
    { key: ' * @param', val: 'location', raw: null, str: `"${D.personal.location}"` },
    { key: ' * @param', val: 'gpa',      raw: null, str: `${edu.gpa}` },
    { key: ' * @param', val: 'degree',   raw: null, str: `"${edu.degree}"` },
    { key: null,     val: null,  raw: ' */' },
  ];

  let lineNum = 1;
  const bodyHTML = lines.map(l => {
    const num = `<span class="comment-line-num">${String(lineNum++).padStart(2, ' ')}</span>`;
    if (l.raw) {
      return `<div>${num}<span class="comment-text" style="color:var(--text-muted)">${esc(l.raw)}</span></div>`;
    }
    if (l.keyword) {
      return `<div>${num}<span class="comment-keyword">${esc(l.key)}</span> <span class="comment-string">${esc(l.keyword)}</span></div>`;
    }
    if (l.str) {
      return `<div>${num}<span class="comment-keyword">${esc(l.key)}</span> <span class="comment-value">${esc(l.val)}</span> <span class="comment-string">${esc(l.str)}</span></div>`;
    }
    if (l.key === ' * @description') {
      return `<div>${num}<span class="comment-keyword">${esc(l.key)}</span></div>`;
    }
    return '';
  }).filter(Boolean).join('\n');

  inject('about-comment-block', `
    <div class="comment-header">
      <div class="comment-dot"></div>
      <div class="comment-dot"></div>
      <div class="comment-dot"></div>
      <span class="comment-file-label">George.java</span>
    </div>
    <div class="comment-body">${bodyHTML}</div>
  `);

  // Meta cards
  const metaCards = [
    { label: 'GPA', value: edu.gpa, accent: true },
    { label: 'Degree', value: edu.degree },
    { label: 'Institution', value: `${edu.institution} — ${edu.faculty}` },
    { label: 'Graduation', value: `${edu.startDate} → ${edu.endDate}` },
    { label: 'Specialization', value: 'Back-end Development & System Design' },
  ];

  inject('about-meta', metaCards.map((c, i) => `
    <div class="meta-card reveal ${i > 0 ? `reveal-delay-${Math.min(i, 4)}` : ''}">
      <div class="meta-card-label">${esc(c.label)}</div>
      <div class="meta-card-value ${c.accent ? 'accent' : ''}">${esc(c.value)}</div>
    </div>`).join(''));
}

/* ═══════════════════════════════════════
   9. RENDER — SKILLS
   ═══════════════════════════════════════ */

function renderSkills() {
  const packageIcons = {
    'Programming Languages': 'ph ph-code',
    'Frameworks':            'ph ph-stack',
    'Databases':             'ph ph-database',
    'Tools & Technologies':  'ph ph-wrench',
  };

  const html = Object.entries(D.skills).map(([category, items], ci) => `
    <div class="skill-package reveal ${ci > 0 ? `reveal-delay-${Math.min(ci, 4)}` : ''}">
      <div class="skill-package-header">
        <i class="${esc(packageIcons[category] || 'ph ph-cube')}" aria-hidden="true"></i>
        <span class="skill-package-name">${esc(category)}</span>
        <span class="skill-package-count">${items.length} items</span>
      </div>
      <ul class="skill-list" role="list">
        ${items.map(skill => `
          <li class="skill-item">
            <i class="${esc(skill.icon)}" title="${esc(skill.name)}" aria-hidden="true"></i>
            <span class="skill-item-name">${esc(skill.name)}</span>
          </li>`).join('')}
      </ul>
    </div>`).join('');

  inject('skills-grid', html);
}

/* ═══════════════════════════════════════
   10. RENDER — EXPERIENCE
   ═══════════════════════════════════════ */

function renderExperience() {
  // Timeline
  const timelineHTML = D.experience.map((job, i) => `
    <div class="timeline-item reveal ${i > 0 ? `reveal-delay-${Math.min(i, 4)}` : ''}">
      <div class="timeline-dot ${job.endDate.toLowerCase() === 'present' ? 'timeline-dot--present' : ''}" aria-hidden="true"></div>
      <article class="timeline-card">
        <header class="timeline-card-header">
          <h3 class="timeline-company">${esc(job.company)}</h3>
          <p class="timeline-role mono">${esc(job.role)}${job.roleSubtitle ? ` <span style="color:var(--text-muted)">(${esc(job.roleSubtitle)})</span>` : ''}</p>
          <div class="timeline-meta">
            <span class="timeline-date mono">${esc(job.startDate)} – ${esc(job.endDate)}</span>
            <span class="timeline-type mono">${esc(job.type)}</span>
          </div>
        </header>
        <div class="timeline-card-body">
          <ul class="timeline-highlights" role="list">
            ${job.highlights.map(h => `<li class="timeline-highlight">${esc(h)}</li>`).join('')}
          </ul>
        </div>
      </article>
    </div>`).join('');

  inject('experience-timeline', timelineHTML);

  // Education panel
  const edu = D.education[0];
  const fields = [
    { label: 'degree',      value: edu.degree },
    { label: 'gpa',         value: edu.gpa, className: 'gpa' },
    { label: 'duration',    value: `${edu.startDate} → ${edu.endDate}` },
  ];

  inject('education-panel', `
    <div class="education-panel-header">
      <i class="ph ph-graduation-cap" aria-hidden="true"></i>
      <span class="education-panel-title">// Education</span>
    </div>
    <div class="education-body reveal">
      <p class="education-institution">${esc(edu.institution)}</p>
      <p class="education-faculty secondary">${esc(edu.faculty)}</p>
      ${fields.map(f => `
        <div class="education-field">
          <span class="education-field-label">${esc(f.label)}</span>
          <span class="education-field-value ${f.className || ''}">${esc(f.value)}</span>
        </div>`).join('')}
    </div>`);
}

/* ═══════════════════════════════════════
   11. RENDER — PROJECTS (UML Class Boxes)
   ═══════════════════════════════════════ */

function renderProjects() {
  const html = D.projects.map((p, i) => {
    const techTagsHTML = p.techStack.map(t =>
      `<span class="tech-tag">${esc(t)}</span>`).join('');

    const methodsHTML = p.features.map(f => {
      // Parse "methodName(params): ReturnType" pattern
      const match = f.match(/^([^(]+)\(([^)]*)\)(?::\s*(.+))?$/);
      if (match) {
        return `<div class="project-method">
          <span class="method-name">${esc(match[1])}</span><span class="method-params">(${esc(match[2])})</span>${match[3] ? `<span style="color:var(--text-muted)">: </span><span class="method-return">${esc(match[3])}</span>` : ''}
        </div>`;
      }
      return `<div class="project-method">${esc(f)}</div>`;
    }).join('');

    return `
    <article class="project-class reveal ${i > 0 ? `reveal-delay-${Math.min(i % 3 + 1, 4)}` : ''}">
      <div class="project-class-inner">
        <!-- Front Side -->
        <div class="project-class-front">
          <header class="project-class-header">
            <div class="project-stereotype">&lt;&lt;class&gt;&gt;</div>
            <h3 class="project-class-name">${esc(p.name)}</h3>
            ${p.subtitle ? `<div class="project-class-subtitle">${esc(p.subtitle)}</div>` : ''}
          </header>

          <div class="project-attributes">
            <div class="compartment-label">// attributes</div>
            <div class="project-attr">
              <span class="attr-vis">#</span>
              <span class="attr-name">duration</span>
              <span class="attr-sep">:</span>
              <span class="attr-val">"${esc(p.startDate)} → ${esc(p.endDate)}"</span>
            </div>
            <div class="project-attr">
              <span class="attr-vis">+</span>
              <span class="attr-name">role</span>
              <span class="attr-sep">:</span>
              <span class="attr-val">"${esc(p.role)}"</span>
            </div>
            <div class="project-attr">
              <span class="attr-vis">+</span>
              <span class="attr-name">techStack</span>
              <span class="attr-sep">:</span>
              <div class="tech-tag-list">${techTagsHTML}</div>
            </div>
          </div>

          <div class="project-methods">
            <div class="compartment-label">// My Role</div>
            ${methodsHTML}
          </div>

          <footer class="project-footer">
            <span class="project-repo-label mono">: Repository</span>
            <a href="${esc(p.repository)}" class="project-repo-link" target="_blank" rel="noopener noreferrer" aria-label="View ${esc(p.name)} repository on GitHub">
              <i class="ph ph-github-logo" aria-hidden="true"></i>
              ${esc(p.repoLabel)}
            </a>
          </footer>
        </div>
        
        <!-- Back Side -->
        <div class="project-class-back">
          <div class="compartment-label">// Summary</div>
          <p class="project-summary-text">${esc(p.summary || "View repository for more details.")}</p>
          <a href="${esc(p.repository)}" class="btn btn--primary" target="_blank" rel="noopener noreferrer" style="margin-top: 20px;">
            <i class="ph ph-github-logo" aria-hidden="true"></i> Open Repo
          </a>
        </div>
      </div>
    </article>`;
  }).join('');

  inject('projects-grid', html);
}

/* ═══════════════════════════════════════
   12. RENDER — CONTACT
   ═══════════════════════════════════════ */

function renderContact() {
  const p = D.personal;

  const items = [
    { href: `mailto:${p.email}`,  icon: 'ph ph-envelope',      text: p.email,                                           label: 'Email' },
    { href: p.github,              icon: 'ph ph-github-logo',   text: 'github.com/George-Raafat',                        label: 'GitHub' },
    { href: p.linkedin,            icon: 'ph ph-linkedin-logo', text: 'linkedin.com/in/georgeraafat',                    label: 'LinkedIn' },
    { href: `tel:${p.phone.replace(/\s/g,'')}`, icon: 'ph ph-phone', text: p.phone,                                     label: 'Phone' },
    { href: null,                  icon: 'ph ph-map-pin',       text: p.location,                                        label: 'Location' },
  ];

  inject('contact-info', `
    <h3 class="contact-info-header">Let's Build Something</h3>
    <p class="contact-info-desc secondary">
      Open to backend engineering roles, ERP/system design projects, and collaborations.
      Drop a message or connect on any of the channels below.
    </p>
    <div style="display:flex;flex-direction:column;gap:10px;">
      ${items.map(item => item.href
        ? `<a href="${esc(item.href)}" class="contact-item" ${item.href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} aria-label="${esc(item.label)}">
             <i class="${esc(item.icon)}" aria-hidden="true"></i>
             <span class="contact-item-text">${esc(item.text)}</span>
           </a>`
        : `<div class="contact-item" role="listitem" aria-label="${esc(item.label)}">
             <i class="${esc(item.icon)}" aria-hidden="true"></i>
             <span class="contact-item-text">${esc(item.text)}</span>
           </div>`
      ).join('')}
    </div>`);
}

/* ═══════════════════════════════════════
   13. RENDER — FOOTER
   ═══════════════════════════════════════ */

function renderFooter() {
  const year = new Date().getFullYear();
  inject('footer-copy',
    `// © ${year} ${esc(D.personal.name)} — Built with HTML, CSS &amp; JS`);
}

/* ═══════════════════════════════════════
   14. INIT — ENTRY POINT
   ═══════════════════════════════════════ */

function init() {
  // Render all content sections
  renderNav();
  renderHero();
  renderAbout();
  renderSkills();
  renderExperience();
  renderProjects();
  renderContact();
  renderFooter();

  // Wire interactions (after DOM is populated)
  initTheme();
  initMobileMenu();
  initNavBehaviour();
  initScrollReveal();
  initContactForm();

  // Re-observe any dynamically added .reveal elements
  // (scroll reveal is called after render, so all elements are already present)
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
