import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";

const person: Person = {
  firstName: "Mamadou",
  lastName: "Barry",
  name: "Mamadou Barry",
  role: "Software Developer | Systems & Cloud",
  avatar: "/images/profile/mamadou-barry.jpg",
  email: "mb624064783@gmail.com",
  location: "Conakry, Guinea",
  timeZone: "Africa/Conakry",
  languages: ["Pular (native)", "French (fluent)", "English (intermediate)"],
  locale: "en",
};

const newsletter: Newsletter = {
  display: false,
  title: <>Mamadou Barry's Newsletter</>,
  description: <>Updates on software engineering, systems and cloud.</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/barrymamadou2026",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/mamadou-barry-6769bb2bb",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/api/og/generate",
  label: "Home",
  title: "Mamadou Barry — Software Developer | Software Engineering, Systems & Cloud",
  description:
    "Portfolio of Mamadou Barry, NTIC graduate and Full Stack Developer working with NestJS, Next.js, Spring Boot, PostgreSQL, software engineering, networking and cloud technologies.",
  headline: <>I build reliable software and explore the systems that make it scale.</>,
  featured: {
    display: true,
    title: "Featured project: Telecom SaaS Platform",
    href: "/work/telecom-saas-platform-full-stack-development",
  },
  subline: (
    <>
      Full Stack Developer and NTIC graduate with hands-on experience in backend development, web
      applications, telecommunications platforms, networking and cloud technologies.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About — ${person.name}`,
  description:
    "Full Stack Developer and NTIC graduate with practical experience in software development, backend systems, web applications, telecommunications platforms, databases and networking.",
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Short introduction",
    description: (
      <>
        NTIC graduate and Full Stack Developer with hands-on experience in software development,
        backend systems, web applications, telecommunications platforms, databases and networking.
        Through projects and professional experience at NG-TECH, I have worked with technologies
        including NestJS, Next.js, Spring Boot, PostgreSQL, RabbitMQ and modern software development
        practices. I am particularly interested in software engineering, distributed systems, cloud
        technologies and the relationship between software and infrastructure. I enjoy building
        reliable applications, understanding how systems work and continuously improving my
        technical skills.
      </>
    ),
  },
  work: {
    display: true,
    title: "Experience",
    experiences: [
      {
        company: "NG-TECH",
        timeframe: "July 2026 – Present; internship extended until December 2026",
        role: "Full Stack Developer Intern | Conakry, Guinea",
        achievements: [
          "Develop backend services with NestJS using a hexagonal architecture.",
          "Implement asynchronous RabbitMQ workflows for transaction reservation, debit and automated refunds in failure scenarios.",
          "Develop and maintain unit and end-to-end tests for business scenarios.",
          "Build client and administration interfaces with Next.js.",
          "Work on dynamic pricing and delivery workflows subject to operator constraints.",
          "Manage PostgreSQL data and migrations using Prisma.",
          "Implement asynchronous CSV reporting workflows and integrate external telecom APIs.",
        ],
        images: [],
      },
      {
        company: "MTN Guinea",
        timeframe: "December 2025",
        role: "Professional Immersion — Telecom Infrastructure",
        achievements: [
          "Observed 4G/5G telecommunications infrastructure.",
          "Explored network-security and infrastructure-supervision practices.",
          "Discussed networking, telecommunications and information-systems roles with technical teams.",
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Bachelor's Degree in New Information and Communication Technologies (NTIC)",
        description: (
          <>
            Université Gamal Abdel Nasser de Conakry (UGANC) | 2023–2026 | Completed
            <br />
            Algorithms and programming, object-oriented programming, web development, databases,
            computer architecture, network administration, software engineering, high-speed and
            mobile networks, Internet of Things, cloud computing, security and project management.
          </>
        ),
      },
      {
        name: "Full Stack Web Development & Project Management",
        description: <>Orange Digital Center Guinea | 2026</>,
      },
      {
        name: "CCNA Preparation — Cisco Networking",
        description: (
          <>
            In progress: routing, switching, TCP/IP, VLAN, Cisco Packet Tracer and GNS3. This is
            preparation training, not a CCNA certification.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Backend",
        tags: ["Java", "Spring Boot", "NestJS", "REST APIs", "JWT", "RabbitMQ"].map((name) => ({
          name,
        })),
      },
      {
        title: "Frontend",
        tags: ["Next.js", "React", "JavaScript", "TypeScript", "HTML", "CSS"].map((name) => ({
          name,
        })),
      },
      {
        title: "Databases",
        tags: ["PostgreSQL", "MySQL", "Prisma"].map((name) => ({ name })),
      },
      {
        title: "Software Engineering",
        tags: [
          "Hexagonal Architecture",
          "Automated Testing",
          "E2E Testing",
          "Regression Testing",
          "Git",
          "GitHub",
        ].map((name) => ({ name })),
      },
      {
        title: "Cloud & DevOps",
        tags: ["Docker", "Render", "Vercel", "Cloudinary"].map((name) => ({ name })),
      },
      {
        title: "Networking & Systems",
        tags: [
          "TCP/IP",
          "VLAN",
          "Cisco Packet Tracer",
          "Routing fundamentals",
          "Switching fundamentals",
          "Linux",
          "Windows",
        ].map((name) => ({ name })),
      },
      {
        title: "Programming Languages",
        tags: ["Java", "Python", "C"].map((name) => ({ name })),
      },
      {
        title: "Currently exploring",
        description: <>Areas of continued learning and professional development.</>,
        tags: [
          "Cloud architecture",
          "Distributed systems",
          "DevOps",
          "Linux administration",
          "Software architecture",
          "Network security",
        ].map((name) => ({ name })),
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Blog",
  description: `Articles by ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: `Projects — ${person.name}`,
  description: `Software engineering, telecommunications and networking projects by ${person.name}.`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Professional & Technical Gallery — ${person.name}`,
  description: `Personal moments, events and activities from ${person.name}'s journey.`,
  images: [
    {
      src: "/images/gallery/gallerie1.jpeg",
      alt: "Group photo at a technology and entrepreneurship event",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/gallerie2.jpeg",
      alt: "Students presenting a technical model together",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/gallerie3.jpeg",
      alt: "Team presenting a project at an event",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/gallerie4.jpeg",
      alt: "Group photo at the UGANC campus entrance",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/gallerie5.jpeg",
      alt: "Group photo with peers and a technical project model",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/gallerie6.jpeg",
      alt: "Group photo at an event with a recognition award",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/gallerie7.jpeg",
      alt: "Group photo during a campus visit",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/gallerie8.jpeg",
      alt: "Personal outdoor portrait",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
