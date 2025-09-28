export const mockOpportunities = [
  { id: "1", title: "Frontend Intern", company: "Acme Corp", stipend: "₹15k", mode: "remote" as const, match: 86 },
  { id: "2", title: "Backend Intern", company: "Globex", stipend: "₹18k", mode: "hybrid" as const, match: 72 },
  { id: "3", title: "Data Intern", company: "Initech", stipend: "₹12k", mode: "onsite" as const, match: 65 },
];

// Enhanced opportunities data for recommendation engine
export const opportunitiesData = [
  {
    id: "1",
    title: "Software Developer Intern",
    company: "TechCorp Solutions",
    companyLogo: "https://via.placeholder.com/100x100/3b82f6/ffffff?text=TC",
    description: "We are looking for a passionate software developer intern to join our team. You will work on cutting-edge web applications using modern technologies.",
    requirements: [
      "Strong knowledge of React and Node.js",
      "Experience with JavaScript/TypeScript",
      "Understanding of REST APIs",
      "Basic knowledge of databases (SQL/NoSQL)",
      "Good problem-solving skills"
    ],
    responsibilities: [
      "Develop responsive web applications",
      "Collaborate with cross-functional teams",
      "Write clean, maintainable code",
      "Participate in code reviews",
      "Learn and apply new technologies"
    ],
    skills: ["React", "Node.js", "JavaScript", "TypeScript", "MongoDB", "Git"],
    department: "Computer Science",
    stipend: "₹20,000/month",
    duration: "6 months",
    location: "Bangalore",
    workMode: "Hybrid",
    postedDate: "2024-01-15",
    deadline: "2024-02-15",
    applications: 45,
    status: "active",
    recruiterId: "rec_001",
    matchScore: 92,
    benefits: [
      "Certificate of completion",
      "Mentorship program",
      "Potential full-time offer",
      "Flexible working hours"
    ]
  },
  {
    id: "2",
    title: "Data Analyst Intern",
    company: "DataViz Inc",
    companyLogo: "https://via.placeholder.com/100x100/10b981/ffffff?text=DV",
    description: "Join our data analytics team to work on exciting projects involving big data analysis, visualization, and machine learning applications.",
    requirements: [
      "Strong analytical and statistical skills",
      "Experience with Python and SQL",
      "Knowledge of data visualization tools",
      "Understanding of machine learning concepts",
      "Good communication skills"
    ],
    responsibilities: [
      "Analyze large datasets",
      "Create data visualizations",
      "Build predictive models",
      "Generate insights and reports",
      "Collaborate with business teams"
    ],
    skills: ["Python", "SQL", "Tableau", "Pandas", "NumPy", "Statistics", "Machine Learning"],
    department: "Information Technology",
    stipend: "₹18,000/month",
    duration: "4 months",
    location: "Mumbai",
    workMode: "Remote",
    postedDate: "2024-01-12",
    deadline: "2024-02-12",
    applications: 32,
    status: "active",
    recruiterId: "rec_002",
    matchScore: 85,
    benefits: [
      "Hands-on experience with real projects",
      "Industry mentorship",
      "Networking opportunities",
      "Performance-based bonus"
    ]
  },
  {
    id: "3",
    title: "UX Design Intern",
    company: "DesignStudio",
    companyLogo: "https://via.placeholder.com/100x100/f59e0b/ffffff?text=DS",
    description: "We're seeking a creative UX design intern to help us create amazing user experiences for our digital products.",
    requirements: [
      "Portfolio showcasing design skills",
      "Proficiency in Figma and Adobe XD",
      "Understanding of user-centered design",
      "Knowledge of design principles",
      "Creative thinking abilities"
    ],
    responsibilities: [
      "Design user interfaces and experiences",
      "Conduct user research",
      "Create wireframes and prototypes",
      "Collaborate with development team",
      "Present design concepts to stakeholders"
    ],
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "UI/UX Design", "Wireframing"],
    department: "Computer Science",
    stipend: "₹16,000/month",
    duration: "3 months",
    location: "Delhi",
    workMode: "On-site",
    postedDate: "2024-01-10",
    deadline: "2024-02-10",
    applications: 28,
    status: "active",
    recruiterId: "rec_003",
    matchScore: 78,
    benefits: [
      "Design mentorship",
      "Portfolio development",
      "Access to design tools",
      "Creative freedom"
    ]
  },
  {
    id: "4",
    title: "DevOps Engineer Intern",
    company: "CloudTech Solutions",
    companyLogo: "https://via.placeholder.com/100x100/8b5cf6/ffffff?text=CT",
    description: "Learn cloud infrastructure and DevOps practices while working on real-world deployment and automation projects.",
    requirements: [
      "Basic knowledge of Linux/Unix",
      "Understanding of cloud platforms",
      "Experience with version control (Git)",
      "Interest in automation and CI/CD",
      "Problem-solving mindset"
    ],
    responsibilities: [
      "Assist in cloud infrastructure setup",
      "Automate deployment processes",
      "Monitor system performance",
      "Learn containerization technologies",
      "Support development teams"
    ],
    skills: ["AWS", "Docker", "Kubernetes", "Git", "Linux", "CI/CD", "Jenkins"],
    department: "Computer Science",
    stipend: "₹22,000/month",
    duration: "6 months",
    location: "Bangalore",
    workMode: "Hybrid",
    postedDate: "2024-01-08",
    deadline: "2024-02-08",
    applications: 19,
    status: "active",
    recruiterId: "rec_004",
    matchScore: 88,
    benefits: [
      "Cloud certification support",
      "Hands-on AWS experience",
      "Industry-standard tools",
      "Career growth opportunities"
    ]
  },
  {
    id: "5",
    title: "Mobile App Developer Intern",
    company: "AppCraft Studios",
    companyLogo: "https://via.placeholder.com/100x100/ef4444/ffffff?text=AC",
    description: "Build amazing mobile applications for iOS and Android platforms using modern development frameworks.",
    requirements: [
      "Knowledge of mobile development",
      "Experience with React Native or Flutter",
      "Understanding of mobile UI/UX",
      "Basic knowledge of APIs",
      "Passion for mobile technology"
    ],
    responsibilities: [
      "Develop mobile applications",
      "Implement responsive designs",
      "Integrate with backend APIs",
      "Test applications on devices",
      "Optimize app performance"
    ],
    skills: ["React Native", "Flutter", "JavaScript", "Mobile UI/UX", "API Integration", "Firebase"],
    department: "Computer Science",
    stipend: "₹19,000/month",
    duration: "5 months",
    location: "Pune",
    workMode: "Remote",
    postedDate: "2024-01-05",
    deadline: "2024-02-05",
    applications: 36,
    status: "active",
    recruiterId: "rec_005",
    matchScore: 81,
    benefits: [
      "App store publishing experience",
      "Cross-platform development",
      "Modern development tools",
      "Portfolio projects"
    ]
  }
];

// Student profiles for recommendation matching
export const studentProfiles = [
  {
    id: "student_001",
    name: "Priya Sharma",
    skills: ["React", "Node.js", "JavaScript", "TypeScript", "MongoDB", "Git"],
    department: "Computer Science",
    cgpa: 8.5,
    preferences: {
      locations: ["Bangalore", "Mumbai", "Remote"],
      workMode: ["Hybrid", "Remote"],
      stipendRange: [15000, 25000]
    },
    experience: ["React", "Node.js", "JavaScript"],
    year: "Final Year"
  },
  {
    id: "student_002",
    name: "Raj Kumar",
    skills: ["Python", "SQL", "Tableau", "Statistics", "Machine Learning", "Pandas"],
    department: "Information Technology",
    cgpa: 9.2,
    preferences: {
      locations: ["Mumbai", "Delhi", "Remote"],
      workMode: ["Remote", "On-site"],
      stipendRange: [12000, 20000]
    },
    experience: ["Python", "SQL", "Data Analysis"],
    year: "Final Year"
  },
  {
    id: "student_003",
    name: "Anita Singh",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "UI/UX Design"],
    department: "Computer Science",
    cgpa: 8.8,
    preferences: {
      locations: ["Delhi", "Bangalore"],
      workMode: ["On-site", "Hybrid"],
      stipendRange: [14000, 22000]
    },
    experience: ["Figma", "Adobe XD", "UI/UX Design"],
    year: "Pre-Final Year"
  }
];


