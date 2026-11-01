// Saara content yahin se edit karo. Resume ke hisaab se bhara hua hai.

export const profile = {
  name: "Milind Singh Chauhan",
  role: "Backend Software Engineer",
  headline: "I build APIs that stay correct under load.",
  summary:
    "Software Engineer Associate at Xyncely. I work in Python, FastAPI and PostgreSQL, and I care about secure access, clean data flows and code a team can maintain.",
  email: "singhmilind0803@gmail.com",
  phone: "+91-9580807108",
  linkedin: "https://www.linkedin.com/in/milind-singh-chauhan-03a877239/",
  github: "https://github.com/", // <- apna GitHub profile link yahan daalo
};

export const stats = [
  { value: "80+", label: "REST APIs built and maintained" },
  { value: "40+", label: "backend modules shipped" },
  { value: "3", label: "user portals with role-based access" },
];

export const experience = {
  title: "Software Engineer Associate",
  company: "Xyncely",
  period: "Jan 2026 – Present",
  items: [
    {
      tag: "/campaigns /orders /payouts",
      text: "Developed and maintained 80+ REST APIs with Python, FastAPI, PostgreSQL and SQLAlchemy; validated request/response contracts, HTTP status codes and JSON payloads with Postman before release.",
    },
    {
      tag: "/modules",
      text: "Built and enhanced 40+ backend modules covering campaigns, deliverables, vendor workflows, order tracking, payouts, analytics and third-party integrations, handling edge cases like invalid inputs and failed integrations.",
    },
    {
      tag: "/auth",
      text: "Implemented JWT authentication and Role-Based Access Control across Brand, Vendor and Admin portals, and verified role-specific permissions and access restrictions.",
    },
    {
      tag: "/db",
      text: "Used SQL and SQLAlchemy to validate and optimize GST distribution, payout and campaign-cost calculations; compared application outputs with database records to improve data accuracy.",
    },
    {
      tag: "/security",
      text: "Implemented Redis-based login-attempt tracking and rate limiting to control repeated authentication requests and protect user accounts across portals.",
    },
    {
      tag: "/process",
      text: "Worked across SDLC/STLC in an Agile team: reviewing requirements, investigating defects, root-cause analysis, verifying fixes and communicating issue impact and release risks.",
    },
  ],
};

export const projects = [
  {
    name: "Spread-Wealth",
    subtitle: "Personalized Investment & Stock Recommendation Platform",
    period: "Nov 2025 – May 2026",
    points: [
      "Full-stack investment platform where users manage investment profiles and get personalized stock and sector recommendations based on risk tolerance.",
      "Multi-step questionnaire built with React Hook Form and Zod to collect risk level, duration, amount, monthly contribution and preferred sectors.",
      "REST APIs for user registration, preference management and profile retrieval, with input validation, duplicate email checks and MongoDB storage via Mongoose.",
      "Frontend and backend integrated using the Fetch API to show sector-based recommendations per risk profile.",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "Zod"],
    link: "", // <- project ka GitHub/live link yahan daalo
  },
  {
    name: "Virtual Assistant",
    subtitle: "Voice and text assistant (MERN)",
    period: "Aug 2025 – Sep 2025",
    points: [
      "Full-stack MERN app that takes voice and text commands, with speech recognition and text-to-speech via the Web Speech API.",
      "Integrated weather, Wikipedia search and task automation APIs.",
    ],
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Web Speech API"],
    link: "", // <- project ka GitHub/live link yahan daalo
  },
];

export const skills = [
  { group: "Languages", items: ["Python", "Java", "JavaScript", "SQL"] },
  { group: "Backend", items: ["FastAPI", "Node.js", "Express.js", "REST APIs", "Webhooks"] },
  { group: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "SQLAlchemy", "Mongoose"] },
  { group: "Security & Cache", items: ["JWT", "RBAC", "Redis"] },
  { group: "Frontend", items: ["React.js", "HTML", "CSS", "Tailwind CSS"] },
  { group: "Tools & QA", items: ["Git", "GitHub", "GitHub Actions", "Postman", "pytest", "Playwright"] },
];

export const education = [
  {
    title: "MCA in Computer Applications, CDAC Noida",
    period: "Aug 2024 – Jun 2026",
    note: "CGPA 81.5. Also completed CDAC's Big Data and Data Science bootcamp.",
  },
  {
    title: "B.Sc. Instrumentation, Bhaskaracharya College of Applied Sciences, Delhi",
    period: "Nov 2021 – Jul 2024",
    note: "72.36. President of the B.Sc. Instrumentation Department (final year).",
  },
  {
    title: "Certification: Full Stack Developer with MERN",
    period: "Udemy",
    note: "Basic to advanced course.",
  },
];

export const achievements = [
  "Second place in both badminton and basketball at college inter-department sports events.",
  "President of the B.Sc. Instrumentation Department (final year).",
];
