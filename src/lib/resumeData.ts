export interface Experience {
  role: string;
  company: string;
  type: string;
  date: string;
  location: string;
  details: string[];
  tech: string[];
}

export interface Education {
  degree: string;
  school: string;
  date: string;
}

export interface Contact {
  location: string;
  email: string;
  linkedin: string;
}

export interface Skills {
  [category: string]: string[];
}

export interface ResumeData {
  name: string;
  summary: string;
  contact: Contact;
  skills: Skills;
  experience: Experience[];
  education: Education[];
  certifications: string[];
}

export const resumeData: ResumeData = {
  name: "Tony T. Wang",
  summary: "Senior Full-Stack Developer with 14+ years of experience architecting and deploying high-performance, scalable web applications. Proven expert in the Node.js and React ecosystems with a track record of leading development teams, driving DevOps transformations, and delivering robust solutions on Azure and AWS. Passionate about clean code and mentorship.",
  contact: {
    location: "Langley, BC",
    email: "tony@towatek.com",
    linkedin: "https://www.linkedin.com/in/tony-wang-51651427"
  },
  skills: {
    "Frontend": ["React", "Vue.js", "Angular", "Next.js", "Gatsby", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "SASS", "Responsive Design", "Web Accessibility"],
    "Backend": ["Node.js", "NestJS", "Express.js", "Koa.js", "Java (Spring Boot)", "Microservices", "GraphQL", "REST APIs", "WebSockets"],
    "Databases & Caching": ["MongoDB", "PostgreSQL", "DynamoDB", "Redis", "Hazelcast"],
    "Cloud & DevOps": ["AWS", "Azure", "Kubernetes", "Serverless (Lambda)", "Kafka", "RabbitMQ", "CI/CD (Jenkins)", "Git", "APM (Dynatrace, Splunk)"],
    "Testing": ["Jest", "Cypress", "Puppeteer", "Storybook"]
  },
  experience: [
    {
      role: "Lead Software Developer",
      company: "Moneris",
      type: "Contract",
      date: "Oct 2024 - Present",
      location: "Remote",
      details: [
        "Architected and launched Moneris's inaugural unified customer portal, leveraging a micro-frontend architecture with Module Federation to streamline transaction reporting, user, and store management.",
        "Spearheaded the backend development of resilient microservices using Node.js and NestJS, ensuring scalable deployment on Azure."
      ],
      tech: ["React", "Vite", "Node.js", "NestJS", "Module Federation", "Microservices", "Azure"]
    },
    {
      role: "Fullstack Software Developer",
      company: "Scotiabank",
      type: "Contract",
      date: "Jul 2023 - Oct 2024",
      location: "Remote",
      details: [
        "Engineered a critical web application that streamlined the lending application process for branch and call center employees, significantly reducing customer processing time.",
        "Established a scalable and maintainable codebase using a Monorepo architecture to enhance development velocity and code consistency."
      ],
      tech: ["React", "Node.js", "Express.js", "TypeScript", "JavaScript", "Jest", "Storybook", "Monorepo"]
    },
    {
      role: "Sr. IoT Software Developer",
      company: "Bell",
      type: "Contract",
      date: "May 2022 - Jun 2023",
      location: "Remote",
      details: [
        "Developed end-to-end IoT solutions for supply chain and retail clients, delivering actionable, real-time data on logistics, driver behavior, and route optimization.",
        "Built robust backend microservices to process high-volume, real-time data streams from a network of IoT devices."
      ],
      tech: ["Node.js", "React", "Java (Spring Boot)", "Kubernetes", "MongoDB", "Redis", "Kafka", "Azure Event Hub", "Microservices"]
    },
    {
      role: "Sr. Manager, Software Development",
      company: "Symcor Inc.",
      type: "Permanent",
      date: "Oct 2021 - May 2022",
      location: "Mississauga, ON",
      details: [
        "Managed a team of 10 developers in the successful delivery of the MVP for Canada's new open banking platform, enabling secure, user-permissioned financial data sharing.",
        "Instituted team-wide best practices, including the implementation of CI/CD pipelines and a comprehensive automated testing strategy to boost code quality."
      ],
      tech: ["Node.js", "React", "TypeScript", "GraphQL", "OAuth2.0", "MongoDB", "Azure", "Cypress", "Tailwind CSS"]
    },
    {
      role: "Sr. Software Engineer",
      company: "MCAP",
      type: "Contract",
      date: "May 2021 - Nov 2021",
      location: "Waterloo, ON",
      details: [
        "Architected and implemented a secure, centralized authentication and authorization library using OAuth 2.0 and OpenID Connect for a new microservices-based underwriting system.",
        "Designed and built a responsive Vue.js dashboard powered by an event-driven backend architecture."
      ],
      tech: ["Node.js", "Vue.js", "TypeScript", "RabbitMQ", "MongoDB", "OAuth 2.0", "Microservices"]
    },
    {
      role: "Sr. IoT Software Developer",
      company: "Bell",
      type: "Contract",
      date: "Nov 2020 - Mar 2021",
      location: "Mississauga, ON",
      details: [
        "Delivered a real-time data dashboard in Vue.js, empowering retail managers to optimize staffing and monitor key store metrics through live data visualization."
      ],
      tech: ["Vue.js", "Node.js", "WebSockets", "MongoDB", "Kafka", "Kubernetes", "Redis"]
    },
    {
      role: "Application Architect",
      company: "RBC Ventures",
      type: "Contract",
      date: "Nov 2019 - Nov 2020",
      location: "Toronto, ON",
      details: [
        "Spearheaded the successful migration of a legacy monolithic application to a scalable microservices architecture, resulting in significant improvements in performance and maintainability."
      ],
      tech: ["React", "Node.js", "GraphQL", "AWS (Lambda, DynamoDB)", "Gatsby", "Cypress"]
    },
    {
      role: "Tech Lead / Sr. Software Developer",
      company: "TD",
      type: "Permanent",
      date: "Jan 2018 - Nov 2019",
      location: "Toronto, ON",
      details: [
        "Led a team of 6 developers to deliver a new web servicing platform for TD Business Banking, successfully serving thousands of commercial clients.",
        "Championed the team's DevOps adoption by building and implementing automated CI/CD pipelines with Jenkins."
      ],
      tech: ["Angular", "NgRX", "Java (Spring Boot)", "Node.js", "Microservices", "Jenkins"]
    },
    {
      role: "Senior Program Analyst",
      company: "Scotiabank",
      type: "Permanent",
      date: "Apr 2017 - Jan 2018",
      location: "Toronto, ON",
      details: [
        "Architected and executed the transformation of a critical middle office accounting application from monolithic to microservice-oriented architecture, improving system modularity and maintainability.",
        "Designed and implemented modern frontend components using Angular and TypeScript, enhancing user experience and application performance.",
        "Developed scalable backend services using Java Spring Boot, establishing robust API layers for improved system integration."
      ],
      tech: ["Angular", "TypeScript", "JavaScript", "Java (Spring Boot)", "Microservices"]
    },
    {
      role: "Software Developer",
      company: "IBM Canada",
      type: "Permanent",
      date: "Apr 2014 - Apr 2017",
      location: "Markham, ON",
      details: [
        "Designed and implemented a comprehensive web console for IBM's managed DB2 cloud service (dashDB), delivering an intuitive interface for database management and monitoring.",
        "Pioneered containerization initiatives and established CI/CD pipelines for managed DB2 services using Concourse CI and UCD, significantly improving deployment efficiency.",
        "Enhanced DB2 optimizer performance by implementing advanced costing models for Hashjoin and Tablescan operators in the DB2 columnar database engine.",
        "Developed an innovative internal code coverage analysis tool providing statement-level coverage metrics for DB2 development teams, improving code quality assurance."
      ],
      tech: ["Angular", "JavaScript", "TypeScript", "Java", "Dojo", "Node.js", "Python", "C/C++", "Perl", "Concourse CI", "UCD"]
    },
    {
      role: "Intern Software Developer",
      company: "IBM Canada",
      type: "Internship",
      date: "May 2009 - Aug 2010, May 2012 - Jul 2013",
      location: "Markham, ON",
      details: [
        "Developed and refactored critical DB2 support and diagnostic tools including DB2Support, DB2Diag parser, and DB2PD, improving system troubleshooting capabilities.",
        "Contributed to software development and comprehensive system testing for IBM WebSphere Commerce shopping platform, ensuring robust e-commerce functionality.",
        "Collaborated with senior developers to implement performance optimizations and bug fixes across multiple DB2 components."
      ],
      tech: ["C/C++", "Java", "Perl", "DB2", "WebSphere Commerce"]
    }
  ],
  education: [
    {
      degree: "Master of Science, Applied Computing",
      school: "University of Toronto",
      date: "2011 - 2013"
    },
    {
      degree: "Bachelor of Applied Science and Engineering, Computer Engineering",
      school: "University of Toronto",
      date: "2006 - 2011"
    }
  ],
  certifications: [
    "Microsoft Certified: Azure Administrator Associate",
    "AWS Certified Solutions Architect – Associate",
    "AWS Certified Developer – Associate",
    "AWS Certified SysOps Administrator – Associate",
    "Udacity Front-End Web Developer Nanodegree"
  ]
}; 