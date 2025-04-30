/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
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
  resumeLink: "",
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
    emoji("🛠️ Troubleshooting hardware and software issues across user devices"),
    emoji("🖥️ Installing, configuring, and maintaining computer systems and networks"),
    emoji("🔒 Ensuring system security through firewalls, updates, and access control"),
    emoji("📞 Providing technical support and training to end users"),
    emoji("📋 Performing routine backups and system health checks"),
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
  { skillName: "Web Development", fontAwesomeClassname: "fas fa-code" },
  { skillName: "Excel Automation", fontAwesomeClassname: "fas fa-file-excel" },
  { skillName: "RDBMS", fontAwesomeClassname: "fas fa-database" },
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
      logo: require("./assets/images/udinusLogo.png"), // Tambahkan logo jika ada
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
      companylogo: require("./assets/images/bpppLogo.png"), // Tambahkan logo jika ada
      date: "Jul 2024 – Dec 2024",
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
      companylogo: require("./assets/images/pemalangLogo.png"), // Ganti jika ada logo DISPERKIM
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
      companylogo: require("./assets/images/smpLogo.png"), // Ganti jika ada logo SMPN 1
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
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Big Projects",
  subtitle: "SOME STARTUPS AND COMPANIES THAT I HELPED TO CREATE THEIR TECH",
  projects: [
    {
      image: require("./assets/images/saayaHealthLogo.webp"),
      projectName: "Saayahealth",
      projectDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      footerLink: [
        {
          name: "Visit Website",
          url: "http://saayahealth.com/"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/nextuLogo.webp"),
      projectName: "Nextu",
      projectDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      footerLink: [
        {
          name: "Visit Website",
          url: "http://nextu.se/"
        }
      ]
    }
  ],
  display: false // Set false to hide this section, defaults to tru
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Certifications 🏆"),
  subtitle: "Relevant certifications that support my IT expertise.",

  achievementsCards: [
    {
      title: "MikroTik Certified Network Associate (MTCNA)",
      subtitle: "Official certification from MikroTik, obtained through ID-Networkers. Valid until June 2027.",
      image: require("./assets/images/MTCNA.png"), // Ganti dengan logo sertifikat jika ada
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
      subtitle: "Basic Linux system administration training covering file system management, user permissions, and package management.",
      image: require("./assets/images/linux.png"), // Ganti dengan logo sertifikat jika ada
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
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://blog.usejournal.com/create-a-google-assistant-action-and-win-a-google-t-shirt-and-cloud-credits-4a8d86d76eae",
      title: "Win a Google Assistant Tshirt and $200 in Google Cloud Credits",
      description:
        "Do you want to win $200 and Google Assistant Tshirt by creating a Google Assistant Action in less then 30 min?"
    },
    {
      url: "https://medium.com/@saadpasta/why-react-is-the-best-5a97563f423e",
      title: "Why REACT is The Best?",
      description:
        "React is a JavaScript library for building User Interface. It is maintained by Facebook and a community of individual developers and companies."
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "Build Actions For Google Assistant",
      subtitle: "Codelab at GDG DevFest Karachi 2019",
      slides_url: "https://bit.ly/saadpasta-slides",
      event_url: "https://www.facebook.com/events/2339906106275053/"
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  ],
  display: false // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: false // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "+92-0000000000",
  email_address: "saadpasta70@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: true // Set true to display this section, defaults to false
};

const isHireable = false; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

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
