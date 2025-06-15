
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  coursework?: string;
  transcriptLink?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  projectLink?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  verifyLink?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
  verifyLink?: string;
}

export interface TechnicalSkills {
  languages: string;
  toolsFrameworks: string;
  webProgramming: string;
  databases: string;
  domainKnowledge: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  leetcode: string;
  summary: string;
  education: Education[];
  experience: Experience[];
  workExperience: WorkExperience[];
  skills: string[];
  technicalSkills: TechnicalSkills;
  certificates: Certificate[];
  achievements: Achievement[];
}

export type Theme = 'light' | 'modern' | 'dark';
