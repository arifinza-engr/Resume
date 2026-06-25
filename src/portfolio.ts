/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation.json"; // Rename to your file name for custom animation
import udinusLogo from "./assets/images/udinusLogo.png";
import bpppLogo from "./assets/images/bpppLogo.png";
import pemalangLogo from "./assets/images/pemalangLogo.png";
import smpLogo from "./assets/images/smpLogo.png";
import mtcnaLogo from "./assets/images/MTCNA.png";
import linuxLogo from "./assets/images/linux.png";

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 1000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Arifinza Eska Nugraha",
  title: "Hi all, I'm Finza",
  subTitle: emoji(
    "A passionate IT Support Specialist ⚙️ with experience in server maintenance, network setup, hardware/software troubleshooting, automation, and web development. Dedicated to delivering efficient tech solutions."
  ),
  resumeLink: "true", // truthy = show the "Download my resume" button (serves src/containers/greeting/resume.pdf)
  displayGreeting: true
};

// Social Media Links

const socialMediaLinks = {
  whatsapp: "https://wa.me/62895377897675",
  instagram: "https://www.instagram.com/finzaengr/",
  linkedin: "https://www.linkedin.com/in/arifinza-eska-nugraha-5276b1208/",
  github: "https://github.com/arifinza-engr",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "DEDICATED IT SUPPORT SPECIALIST WHO ENSURES SYSTEMS RUN SMOOTHLY",
  skills: [
    emoji(
      "🛠️ Troubleshooting hardware and software issues across user devices"
    ),
    emoji(
      "🖥️ Installing, configuring, and maintaining computer systems and networks"
    ),
    emoji(
      "🔒 Ensuring system security through firewalls, updates, and access control"
    ),
    emoji("📞 Providing technical support and training to end users"),
    emoji("📋 Performing routine backups and system health checks")
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "Windows",
      fontAwesomeClassname: "fab fa-windows"
    },
    {
      skillName: "Linux",
      fontAwesomeClassname: "fab fa-linux"
    },
    {
      skillName: "Networking",
      fontAwesomeClassname: "fas fa-network-wired"
    },
    {
      skillName: "Mikrotik",
      fontAwesomeClassname: "fas fa-server"
    },
    {skillName: "Web Development", fontAwesomeClassname: "fas fa-code"},
    {skillName: "Excel Automation", fontAwesomeClassname: "fas fa-file-excel"},
    {skillName: "RDBMS", fontAwesomeClassname: "fas fa-database"},
    {
      skillName: "Hardware Troubleshooting",
      fontAwesomeClassname: "fas fa-tools"
    },
    {
      skillName: "Remote Desktop",
      fontAwesomeClassname: "fas fa-desktop"
    },
    {
      skillName: "Office 365",
      fontAwesomeClassname: "fas fa-envelope"
    },
    {
      skillName: "Backup & Recovery",
      fontAwesomeClassname: "fas fa-hdd"
    },
    {
      skillName: "Firewall & Security",
      fontAwesomeClassname: "fas fa-shield-alt"
    },
    {
      skillName: "Virtualization",
      fontAwesomeClassname: "fas fa-cloud"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true,
  schools: [
    {
      schoolName: "Universitas Dian Nuswantoro",
      logo: udinusLogo,
      subHeader: "Bachelor of Informatics Engineering",
      duration: "Sep 2018 - Feb 2024",
      desc: "Final project focused on public service optimization via real-time WhatsApp bot notification system for street light complaints.",
      descBullets: [
        "Freelance web developer during study",
        "Involved in applied automation and public service systems"
      ]
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true,
  experience: [
    {
      Stack: "Web Development",
      progressPercentage: "90%"
    },
    {
      Stack: "Linux & Server Management",
      progressPercentage: "85%"
    },
    {
      Stack: "Scripting & Automation (Python, Excel)",
      progressPercentage: "80%"
    },
    {
      Stack: "Database (MySQL)",
      progressPercentage: "75%"
    },
    {
      Stack: "Network Setup & Maintenance",
      progressPercentage: "90%"
    }
  ],
  displayCodersrank: false
};

// Work experience section

const workExperiences = {
  display: true,
  experience: [
    {
      role: "IT Support",
      company: "BPPP Tegal (Resvara)",
      companylogo: bpppLogo,
      date: "Jul 2024 – Jul 2025",
      desc: "Maintained VPS servers, developed automation tools using Excel, and supported digital services for public outreach.",
      descBullets: [
        "Built and maintained institutional website",
        "Automated work processes using custom Excel programs",
        "Handled hardware/software troubleshooting and presentation materials",
        "Backup and recovery of data and system configurations",
        "Managed network and server security"
      ]
    },
    {
      role: "Web Developer / IT Support Intern",
      company: "DISPERKIM Kab. Pemalang",
      companylogo: pemalangLogo,
      date: "Aug 2023 – Oct 2023",
      desc: "Developed complaint app with GIS and real-time WhatsApp notification, improving public service response time by 50%",
      descBullets: [
        "Performed hardware and software maintenance for staff devices",
        "Built a web-based public streetlight complaint system with real-time WhatsApp alerts",
        "Designed intuitive and responsive user interface to ensure ease of use for the public",
        "Integrated interactive maps (GIS) to visualize complaint locations for efficient prioritization"
      ]
    },
    {
      role: "Freelance Web Developer",
      company: "SMP Negeri 1 Pemalang",
      companylogo: smpLogo,
      date: "Feb 2022 – Apr 2022",
      desc: "Created responsive school website with full student/teacher database, downloadable modules, announcements, and events.",
      descBullets: [
        "Developed a complete school website with student, teacher, and profile management",
        "Implemented features for downloadable learning modules, announcements, and schedules",
        "Designed a modern and responsive UI for all device types",
        "Optimized backend systems for efficient data handling and content updates"
      ]
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "false", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Big Projects",
  subtitle: "SOME STARTUPS AND COMPANIES THAT I HELPED TO CREATE THEIR TECH",
  projects: [] as Array<{
    image: string;
    projectName: string;
    projectDesc: string;
    footerLink: Array<{name: string; url: string}>;
  }>, // TODO: tambahkan proyek besar kamu, lalu set display: true
  display: false // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Certifications 🏆"),
  subtitle: "Relevant certifications that support my IT expertise.",

  achievementsCards: [
    {
      title: "MikroTik Certified Network Associate (MTCNA)",
      subtitle:
        "Official certification from MikroTik, obtained through ID-Networkers. Valid until June 2027.",
      image: mtcnaLogo,
      imageAlt: "MTCNA Logo",
      footerLink: [
        {
          name: "View Details",
          url: "https://mikrotik.com/training/certificates" // atau link bukti jika ada
        }
      ]
    },
    {
      title: "Linux Fundamentals",
      subtitle:
        "Basic Linux system administration training covering file system management, user permissions, and package management.",
      image: linuxLogo,
      imageAlt: "Linux Logo",
      footerLink: [
        {
          name: "View Details",
          url: "https://linux.org" // Ganti jika kamu punya link sertifikat pribadi
        }
      ]
    }
  ],
  display: true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "false", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [] as Array<{url: string; title: string; description: string}>, // TODO: tambahkan blog kamu, lalu set display: true
  display: false // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [] as Array<{
    title: string;
    subtitle: string;
    slides_url: string;
    event_url: string;
  }>, // TODO: tambahkan talk kamu, lalu set display: true
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [], // TODO: tambahkan podcast kamu, lalu set display: true
  display: false // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: true // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "+62-895-377-897-675",
  email_address: "arifinzaeskanugraha09.9b@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "", //Replace with your twitter username without @
  display: false // Set true to display this section, defaults to false
};

const isHireable = true; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
