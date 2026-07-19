/**
 * data.js — Portfolio Data Layer
 * George Raafat | Back-end Software Engineer
 *
 * This file is the single source of truth for all portfolio content.
 * To update the website content, edit ONLY this file.
 */

export const portfolioData = {
  personal: {
    name: "George Raafat",
    initials: "GR",
    title: "Back-end Software Engineer",
    location: "Cairo, Egypt",
    phone: "+20 1271601014",
    email: "georgexraafat@gmail.com",
    linkedin: "https://www.linkedin.com/in/georgeraafat/",
    github: "https://github.com/George-Raafat",
  },

  summary:
    "Software Engineer with experience developing production ERP systems and scalable backend applications. Skilled in REST APIs, database design, Docker, and collaborative development. Top student with a 3.8/4.0 GPA, known for exceptional attention to detail, writing clean code, and designing coherent, scalable systems.",

  education: [
    {
      institution: "Cairo University",
      faculty: "Faculty of Computers & Artificial Intelligence",
      degree: "B.Sc. in Computer Science",
      gpa: "3.8 / 4.0",
      startDate: "10/2022",
      endDate: "06/2026",
    },
  ],

  experience: [
    {
      company: "AppyInnovate",
      role: "Software Engineer",
      roleSubtitle: "ERPNext Developer & DevOps",
      type: "Remote",
      startDate: "04/2026",
      endDate: "Present",
      highlights: [
        "Owned the development, maintenance, and deployment of ERPNext/Frappe-based ERP systems.",
        "Extended and stabilized an existing ERPNext codebase by implementing business features, custom modules, and Phase 2 ZATCA e-invoicing improvements.",
        "Designed a centralized authentication portal and configurable white-labeling system, improving maintainability across ERP deployments.",
        "Automated VPS deployments with Docker, Nginx, GitHub Actions, and SSH while managing deployment environments.",
      ],
    },
    {
      company: "Banque Misr",
      role: "Back-end Development Intern",
      roleSubtitle: null,
      type: "Hybrid",
      startDate: "07/2025",
      endDate: "08/2025",
      highlights: [
        "Developed secure backend applications using Spring Boot, JWT, MySQL, and MongoDB.",
        "Implemented automated testing and containerized applications with Docker.",
      ],
    },
    {
      company: "NCI (via ALX Ventures)",
      role: "Back-end Developer",
      roleSubtitle: null,
      type: "Remote",
      startDate: "09/2024",
      endDate: "11/2024",
      highlights: [
        "Built and deployed a scalable API for an inventory management SaaS (Nest.js, MongoDB).",
        "Implemented multi-tenant database architecture to streamline client data management.",
      ],
    },
    {
      company: "ALX Africa",
      role: "Software Engineering Intern",
      roleSubtitle: null,
      type: "Remote",
      startDate: "02/2023",
      endDate: "04/2024",
      highlights: [
        "Completed a 12-month software engineering program specializing in back-end development.",
        "Developed full-stack web applications while designing relational and NoSQL databases using modern backend frameworks.",
        "Applied Linux, Git, agile workflows, and test-driven development in collaborative software projects.",
      ],
    },
  ],

  projects: [
    {
      name: "SmartGallery",
      subtitle: "Graduation Project",
      startDate: "10/2025",
      endDate: "06/2026",
      repository: "https://github.com/y0riii/Smart-gallery",
      repoLabel: "GET /repos/Smart-gallery",
      role: "Team Lead & System Architect",
      techStack: ["Android (Kotlin)", "MVVM", "ONNX Runtime", "MobileCLIP2-S0", "Jetpack Compose"],
      features: [
        "leadTeam(size: 5): void",
        "designMVVMArchitecture(): SystemBlueprint",
        "convertModelToONNX(from: 224MB, to: 61MB): CompressedModel",
        "implementOfflineSearch(modes: [Semantic, Face, OCR]): SearchEngine",
        "indexImages(count: 1000, duration: '~15min'): IndexResult",
      ],
      summary: "Smart Gallery is a modern, production-ready Android photo gallery application built with Kotlin and Jetpack Compose. It features a highly customizable design system, fluid animations, and OCR-based image search capabilities.",
    },
    {
      name: "LearningManagementSystem",
      subtitle: null,
      startDate: "12/2024",
      endDate: "12/2024",
      repository: "https://github.com/Ahmed99125/LMS",
      repoLabel: "GET /repos/LMS",
      role: "Backend Developer",
      techStack: ["Spring Boot", "PostgreSQL", "Cloudinary"],
      features: [
        "manageCourses(): CourseList",
        "manageAssessments(): AssessmentList",
        "designNormalizedSchema(): ERDiagram",
        "integrateCloudinary(media: MediaFile): URL",
      ],
      summary: "LMS is a backend Learning Management System built entirely in Java using Maven. It provides an educational platform architecture designed to handle core components such as lessons and assignments.",
    },
    {
      name: "Doodles",
      subtitle: null,
      startDate: "03/2024",
      endDate: "04/2024",
      repository: "https://github.com/Mennatalla-Khougha/doodles",
      repoLabel: "GET /repos/doodles",
      role: "Full-Stack Developer",
      techStack: ["Next.js", "React", "Prisma", "MongoDB", "NextAuth"],
      features: [
        "shareDrawing(drawing: Canvas): Post",
        "authenticateUser(provider: NextAuth): Session",
        "optimizeDatabase(strategy: Indexing): QueryPlan",
        "storeImage(source: Canvas): CloudinaryURL",
      ],
      summary: "Doodles is a drawings-sharing web application developed using Next.js. It provides a modern React-based frontend setup for users to share and interact with doodles.",
    },
    {
      name: "SportsClubCenter",
      subtitle: null,
      startDate: "11/2023",
      endDate: "12/2023",
      repository: "https://github.com/Mennatalla-Khougha/Sports_Club_Center",
      repoLabel: "GET /repos/Sports_Club_Center",
      role: "Backend Developer",
      techStack: ["Flask", "MySQL", "SQLAlchemy", "HTML", "CSS", "JavaScript"],
      features: [
        "buildRESTfulAPI(framework: Flask): APIRouter",
        "manageClubActivities(): ActivityRecord[]",
        "trackPlayerRecords(player: Player): Stats",
        "optimizeDBSchema(orm: SQLAlchemy): QueryOptimizer",
        "adminConsoleInterface(): CLI",
      ],
      summary: "Sports Club Center is a management platform that allows administrators to organize club data and schedules via a backend console. It also features a web interface for fans to easily search and access information about their favorite sports, players, and upcoming events.",
    },
  ],

  skills: {
    "Programming Languages": [
      { name: "Java", icon: "devicon-java-plain colored" },
      { name: "Kotlin", icon: "devicon-kotlin-plain colored" },
      { name: "Python", icon: "devicon-python-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "TypeScript", icon: "devicon-typescript-plain colored" },
      { name: "C++", icon: "devicon-cplusplus-plain colored" },
      { name: "C", icon: "devicon-c-plain colored" },
    ],
    Frameworks: [
      { name: "Spring Boot", icon: "devicon-spring-plain colored" },
      { name: "Frappe", icon: "devicon-python-plain" },
      { name: "Flask", icon: "devicon-flask-original" },
      { name: "Django", icon: "devicon-django-plain colored" },
      { name: "Nest.js", icon: "devicon-nestjs-plain colored" },
      { name: "Next.js", icon: "devicon-nextjs-original" },
      { name: "Jetpack Compose", icon: "devicon-android-plain colored" },
    ],
    Databases: [
      { name: "MySQL", icon: "devicon-mysql-plain colored" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
      { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
      { name: "SQLite", icon: "devicon-sqlite-plain colored" },
      { name: "SQL Server", icon: "devicon-microsoftsqlserver-plain colored" },
    ],
    "Tools & Technologies": [
      { name: "Git", icon: "devicon-git-plain colored" },
      { name: "Docker", icon: "devicon-docker-plain colored" },
      { name: "Linux", icon: "devicon-linux-plain" },
      { name: "Nginx", icon: "devicon-nginx-original colored" },
      { name: "Prisma", icon: "devicon-prisma-original" },
      { name: "ONNX Runtime", icon: "devicon-python-plain" },
      { name: "SQLAlchemy", icon: "devicon-sqlalchemy-original colored" },
    ],
  },
};
