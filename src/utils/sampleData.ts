
import { ResumeData } from '../types/resume';

export const sampleResumeData: ResumeData = {
  fullName: "Harsha Vardhan Kudurupaka",
  email: "harshavardhan.kudurupaka625@gmail.com",
  phone: "+91-9030496895",
  linkedin: "linkedin.com/in/harshavardhan",
  github: "github.com/harshavardhan",
  leetcode: "leetcode.com/u/harshavardhan",
  summary: "Passionate Computer Science student with expertise in full-stack development and strong foundation in programming languages including C, Python, and C++. Experienced in web technologies, database management, and modern development frameworks with proven track record in building real-world applications.",
  education: [
    {
      id: "1",
      institution: "SR University",
      degree: "Bachelor of Technology",
      field: "Computer Science",
      startDate: "Nov 2022",
      endDate: "Jun 2026",
      current: true,
      gpa: "9.45/10.0",
      coursework: "Computer Architecture, Data Structures, Design and Analysis of Algorithms, Database Management System, Object Oriented Programming, Operating System, Computer Networks, C, Python, Java"
    },
    {
      id: "2",
      institution: "SR Junior College",
      degree: "Class 12",
      field: "Science",
      startDate: "2020",
      endDate: "2022",
      current: false,
      gpa: "95%",
      coursework: "Mathematics, Physics, Chemistry, Biology"
    }
  ],
  experience: [
    {
      id: "1",
      company: "C Programming",
      position: "Bank Management System",
      location: "GitHub",
      startDate: "Jun 2023",
      endDate: "Jun 2023",
      current: false,
      description: "Designed and implemented a robust banking system within four weeks using the C programming language. Demonstrated expertise in memory management and data structure optimization, which helped improve system performance by 30 percent.",
      projectLink: "https://github.com/harshavardhan/bank-management"
    },
    {
      id: "2",
      company: "HTML, JavaScript, CSS",
      position: "Sudoku Solver",
      location: "GitHub",
      startDate: "Jan 2024",
      endDate: "Jan 2024",
      current: false,
      description: "Designed an interactive web-based Sudoku Solver using HTML, JavaScript, and CSS. Delivered a user-focused interface that ensures real-time problem-solving efficiency and usability.",
      projectLink: "https://github.com/harshavardhan/sudoku-solver"
    },
    {
      id: "3",
      company: "HTML, CSS, JS, React, NodeJS, MongoDB",
      position: "Razorpay Clone",
      location: "GitHub",
      startDate: "May 2025",
      endDate: "May 2025",
      current: false,
      description: "Developed a Razorpay clone using HTML, CSS, and Tailwind CSS with responsive UI components. Designed a responsive UI with modern layout and styling components.",
      projectLink: "https://github.com/harshavardhan/razorpay-clone"
    },
    {
      id: "4",
      company: "HTML, CSS, JS, React, NodeJS, MongoDB",
      position: "Chatting App",
      location: "GitHub",
      startDate: "May 2025",
      endDate: "May 2025",
      current: false,
      description: "Developed a real-time chat application with user authentication and persistent messaging using MongoDB. Deployed full-stack application using Vercel (frontend) and Render(backend) with live chat functionality.",
      projectLink: "https://github.com/harshavardhan/chat-app"
    }
  ],
  workExperience: [],
  skills: ["C", "Python", "C++", "Git", "Visual Studio", "Tailwind CSS", "Figma", "HTML", "CSS", "JavaScript", "Angular.js", "React", "NodeJS", "SQL", "PLSQL", "MongoDB"],
  technicalSkills: {
    languages: "C, Python, C++",
    toolsFrameworks: "Git, Visual Studio, Tailwind CSS, Figma",
    webProgramming: "HTML, CSS, JavaScript, AngularJS, React, NodeJS",
    databases: "SQL, PLSQL, MongoDB",
    domainKnowledge: "Front-end Development"
  },
  certificates: [
    {
      id: "1",
      name: "HTML and CSS",
      issuer: "Infosys certified",
      issueDate: "Oct 2023",
      verifyLink: "https://verify.infosys.com/cert/html-css"
    },
    {
      id: "2",
      name: "Data Structure and Algorithms",
      issuer: "UcSan Diego certified",
      issueDate: "Oct 2023",
      verifyLink: "https://coursera.org/verify/ucsd-dsa"
    },
    {
      id: "3",
      name: "Introduction to Database",
      issuer: "Meta Certified",
      issueDate: "Mar 2024",
      verifyLink: "https://coursera.org/verify/meta-database"
    },
    {
      id: "4",
      name: "Operating Systems",
      issuer: "Coursera certified",
      issueDate: "Mar 2024",
      verifyLink: "https://coursera.org/verify/os-cert"
    }
  ],
  achievements: [
    {
      id: "1",
      title: "Academic Excellence",
      description: "Ranked in the top 10 percent in my class, which is proof of great devotion and interest in learning.",
      date: "",
      verifyLink: "https://sruniversity.edu.in/academic-records"
    },
    {
      id: "2",
      title: "Coding Challenge Champion",
      description: "Completed the 45-day coding challenge, starting from 11th March and ending on 16th April 2024, as provided by Coding Club,SR University.",
      date: "Apr 2024",
      verifyLink: "https://codingclub.sruniversity.edu.in/challenges/2024"
    }
  ]
};
