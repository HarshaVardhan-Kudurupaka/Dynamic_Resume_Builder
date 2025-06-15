import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResumeData, Education, Experience, WorkExperience, Certificate, Achievement } from '../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface ResumeFormProps {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ data, onUpdate }) => {
  const updateField = (field: keyof ResumeData, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      coursework: '',
      transcriptLink: ''
    };
    updateField('education', [...data.education, newEducation]);
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    const updatedEducation = data.education.map(edu => 
      edu.id === id ? { ...edu, ...updates } : edu
    );
    updateField('education', updatedEducation);
  };

  const removeEducation = (id: string) => {
    updateField('education', data.education.filter(edu => edu.id !== id));
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      projectLink: ''
    };
    updateField('experience', [...data.experience, newExperience]);
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    const updatedExperience = data.experience.map(exp => 
      exp.id === id ? { ...exp, ...updates } : exp
    );
    updateField('experience', updatedExperience);
  };

  const removeExperience = (id: string) => {
    updateField('experience', data.experience.filter(exp => exp.id !== id));
  };

  const addWorkExperience = () => {
    const newWorkExperience: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    updateField('workExperience', [...(data.workExperience || []), newWorkExperience]);
  };

  const updateWorkExperience = (id: string, updates: Partial<WorkExperience>) => {
    const updatedWorkExperience = (data.workExperience || []).map(exp => 
      exp.id === id ? { ...exp, ...updates } : exp
    );
    updateField('workExperience', updatedWorkExperience);
  };

  const removeWorkExperience = (id: string) => {
    updateField('workExperience', (data.workExperience || []).filter(exp => exp.id !== id));
  };

  const addCertificate = () => {
    const newCertificate: Certificate = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      issueDate: '',
      verifyLink: ''
    };
    updateField('certificates', [...(data.certificates || []), newCertificate]);
  };

  const updateCertificate = (id: string, updates: Partial<Certificate>) => {
    const updatedCertificates = (data.certificates || []).map(cert => 
      cert.id === id ? { ...cert, ...updates } : cert
    );
    updateField('certificates', updatedCertificates);
  };

  const removeCertificate = (id: string) => {
    updateField('certificates', (data.certificates || []).filter(cert => cert.id !== id));
  };

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: '',
      description: '',
      date: '',
      verifyLink: ''
    };
    updateField('achievements', [...(data.achievements || []), newAchievement]);
  };

  const updateAchievement = (id: string, updates: Partial<Achievement>) => {
    const updatedAchievements = (data.achievements || []).map(achievement => 
      achievement.id === id ? { ...achievement, ...updates } : achievement
    );
    updateField('achievements', updatedAchievements);
  };

  const removeAchievement = (id: string) => {
    updateField('achievements', (data.achievements || []).filter(achievement => achievement.id !== id));
  };

  const updateTechnicalSkills = (category: keyof typeof data.technicalSkills, skillsString: string) => {
    // Ensure technicalSkills object exists and has all required properties
    const currentTechnicalSkills = data.technicalSkills || {
      languages: '',
      toolsFrameworks: '',
      webProgramming: '',
      databases: '',
      domainKnowledge: ''
    };
    
    const updatedTechnicalSkills = {
      ...currentTechnicalSkills,
      [category]: skillsString
    };
    
    updateField('technicalSkills', updatedTechnicalSkills);
  };

  // Ensure technicalSkills is properly initialized
  const technicalSkills = data.technicalSkills || {
    languages: '',
    toolsFrameworks: '',
    webProgramming: '',
    databases: '',
    domainKnowledge: ''
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Full Name"
            value={data.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={data.email}
            onChange={(e) => updateField('email', e.target.value)}
          />
          <Input
            placeholder="Phone"
            value={data.phone}
            onChange={(e) => updateField('phone', e.target.value)}
          />
          <Input
            placeholder="LinkedIn URL"
            value={data.linkedin}
            onChange={(e) => updateField('linkedin', e.target.value)}
          />
          <Input
            placeholder="GitHub URL"
            value={data.github}
            onChange={(e) => updateField('github', e.target.value)}
          />
          <Input
            placeholder="LeetCode URL"
            value={data.leetcode}
            onChange={(e) => updateField('leetcode', e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Write a brief professional summary..."
            value={data.summary}
            onChange={(e) => updateField('summary', e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Education</CardTitle>
          <Button onClick={addEducation} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                    />
                    <Input
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    />
                  </div>
                  <Input
                    placeholder="Field of Study"
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <Input
                      placeholder="Start Year"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                    />
                    <Input
                      placeholder="End Year"
                      value={edu.endDate}
                      disabled={edu.current}
                      onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                    />
                    <Input
                      placeholder="GPA (e.g., 9.45/10.0)"
                      value={edu.gpa || ''}
                      onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                    />
                  </div>
                  <Textarea
                    placeholder="Relevant Coursework (e.g., Computer Architecture, Data Structures, Design and Analysis of Algorithms...)"
                    value={edu.coursework || ''}
                    onChange={(e) => updateEducation(edu.id, { coursework: e.target.value })}
                    rows={2}
                  />
                  <Input
                    placeholder="Transcript Link (optional)"
                    value={edu.transcriptLink || ''}
                    onChange={(e) => updateEducation(edu.id, { transcriptLink: e.target.value })}
                  />
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={edu.current}
                      onChange={(e) => updateEducation(edu.id, { current: e.target.checked, endDate: e.target.checked ? 'Present' : '' })}
                    />
                    <span className="text-sm">Currently enrolled</span>
                  </label>
                </div>
                <Button
                  onClick={() => removeEducation(edu.id)}
                  size="sm"
                  variant="outline"
                  className="ml-3"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Work Experience</CardTitle>
          <Button onClick={addWorkExperience} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Work Experience
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {(data.workExperience || []).map((exp) => (
            <div key={exp.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => updateWorkExperience(exp.id, { company: e.target.value })}
                    />
                    <Input
                      placeholder="Position"
                      value={exp.position}
                      onChange={(e) => updateWorkExperience(exp.id, { position: e.target.value })}
                    />
                  </div>
                  <Input
                    placeholder="Location"
                    value={exp.location}
                    onChange={(e) => updateWorkExperience(exp.id, { location: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Start Date"
                      value={exp.startDate}
                      onChange={(e) => updateWorkExperience(exp.id, { startDate: e.target.value })}
                    />
                    <Input
                      placeholder="End Date"
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => updateWorkExperience(exp.id, { endDate: e.target.value })}
                    />
                  </div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateWorkExperience(exp.id, { current: e.target.checked, endDate: e.target.checked ? 'Present' : '' })}
                    />
                    <span className="text-sm">Currently working here</span>
                  </label>
                  <Textarea
                    placeholder="Job description and achievements..."
                    value={exp.description}
                    onChange={(e) => updateWorkExperience(exp.id, { description: e.target.value })}
                    rows={3}
                  />
                </div>
                <Button
                  onClick={() => removeWorkExperience(exp.id)}
                  size="sm"
                  variant="outline"
                  className="ml-3"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Projects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Projects</CardTitle>
          <Button onClick={addExperience} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.experience.map((exp) => (
            <div key={exp.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Technology Stack"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    />
                    <Input
                      placeholder="Project Title"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                    />
                  </div>
                  <Input
                    placeholder="Location/Platform"
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Start Date"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                    />
                    <Input
                      placeholder="End Date"
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    />
                  </div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, { current: e.target.checked, endDate: e.target.checked ? 'Present' : '' })}
                    />
                    <span className="text-sm">Currently working on this project</span>
                  </label>
                  <Input
                    placeholder="Project Link (optional)"
                    value={exp.projectLink || ''}
                    onChange={(e) => updateExperience(exp.id, { projectLink: e.target.value })}
                  />
                  <Textarea
                    placeholder="Project description and achievements..."
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                    rows={3}
                  />
                </div>
                <Button
                  onClick={() => removeExperience(exp.id)}
                  size="sm"
                  variant="outline"
                  className="ml-3"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Technical Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Languages</label>
            <Textarea
              placeholder="Enter programming languages separated by commas (e.g., C, Python, C++, Java)"
              value={technicalSkills.languages}
              onChange={(e) => updateTechnicalSkills('languages', e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tools & Frameworks</label>
            <Textarea
              placeholder="Enter tools and frameworks separated by commas (e.g., Git, Visual Studio, React, Node.js)"
              value={technicalSkills.toolsFrameworks}
              onChange={(e) => updateTechnicalSkills('toolsFrameworks', e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Web Programming</label>
            <Textarea
              placeholder="Enter web technologies separated by commas (e.g., HTML, CSS, JavaScript, TypeScript)"
              value={technicalSkills.webProgramming}
              onChange={(e) => updateTechnicalSkills('webProgramming', e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Databases</label>
            <Textarea
              placeholder="Enter database technologies separated by commas (e.g., MySQL, PostgreSQL, MongoDB)"
              value={technicalSkills.databases}
              onChange={(e) => updateTechnicalSkills('databases', e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Domain Knowledge</label>
            <Textarea
              placeholder="Enter domain knowledge areas separated by commas (e.g., Web Development, Machine Learning)"
              value={technicalSkills.domainKnowledge}
              onChange={(e) => updateTechnicalSkills('domainKnowledge', e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Certificates */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Certifications</CardTitle>
          <Button onClick={addCertificate} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Certificate
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {(data.certificates || []).map((cert) => (
            <div key={cert.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-3">
                  <Input
                    placeholder="Certificate Name"
                    value={cert.name}
                    onChange={(e) => updateCertificate(cert.id, { name: e.target.value })}
                  />
                  <Input
                    placeholder="Issuing Organization"
                    value={cert.issuer}
                    onChange={(e) => updateCertificate(cert.id, { issuer: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Issue Date"
                      value={cert.issueDate}
                      onChange={(e) => updateCertificate(cert.id, { issueDate: e.target.value })}
                    />
                    <Input
                      placeholder="Verify Link"
                      value={cert.verifyLink || ''}
                      onChange={(e) => updateCertificate(cert.id, { verifyLink: e.target.value })}
                    />
                  </div>
                </div>
                <Button
                  onClick={() => removeCertificate(cert.id)}
                  size="sm"
                  variant="outline"
                  className="ml-3"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Achievements</CardTitle>
          <Button onClick={addAchievement} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Achievement
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {(data.achievements || []).map((achievement) => (
            <div key={achievement.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-3">
                  <Input
                    placeholder="Achievement Title"
                    value={achievement.title}
                    onChange={(e) => updateAchievement(achievement.id, { title: e.target.value })}
                  />
                  <Textarea
                    placeholder="Achievement Description"
                    value={achievement.description}
                    onChange={(e) => updateAchievement(achievement.id, { description: e.target.value })}
                    rows={3}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Date (optional)"
                      value={achievement.date || ''}
                      onChange={(e) => updateAchievement(achievement.id, { date: e.target.value })}
                    />
                    <Input
                      placeholder="Verify Link (optional)"
                      value={achievement.verifyLink || ''}
                      onChange={(e) => updateAchievement(achievement.id, { verifyLink: e.target.value })}
                    />
                  </div>
                </div>
                <Button
                  onClick={() => removeAchievement(achievement.id)}
                  size="sm"
                  variant="outline"
                  className="ml-3"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeForm;
