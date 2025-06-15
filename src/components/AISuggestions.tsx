
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResumeData } from '../types/resume';
import { Brain, CheckCircle, AlertCircle, Lightbulb, Zap, Plus } from 'lucide-react';

interface AISuggestionsProps {
  resumeData: ResumeData;
  onApplySuggestion: (field: string, value: any) => void;
}

interface Suggestion {
  id: string;
  type: 'improvement' | 'ats' | 'content';
  field: string;
  title: string;
  description: string;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
  actionValue?: any;
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ resumeData, onApplySuggestion }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [atsScore, setAtsScore] = useState(0);

  const sampleSuggestions = [
    {
      id: 'summary-improve',
      type: 'improvement' as const,
      field: 'summary',
      title: 'Enhance Professional Summary',
      description: 'Make your summary more impactful with action words',
      suggestion: 'Add a compelling professional summary highlighting your key achievements',
      priority: 'high' as const,
      actionValue: 'Experienced software developer with 3+ years of expertise in full-stack development. Proven track record of building scalable web applications using React, Node.js, and modern technologies. Strong problem-solving skills with experience in agile development environments.'
    },
    {
      id: 'skills-technical',
      type: 'ats' as const,
      field: 'skills',
      title: 'Add Technical Skills',
      description: 'Include more relevant technical skills for better ATS matching',
      suggestion: 'Add programming languages and frameworks',
      priority: 'high' as const,
      actionValue: ['JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Git', 'MongoDB', 'Express.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'REST APIs']
    },
    {
      id: 'experience-projects',
      type: 'content' as const,
      field: 'experience',
      title: 'Add Sample Projects',
      description: 'Include relevant projects to showcase your skills',
      suggestion: 'Add project examples with technologies used',
      priority: 'medium' as const,
      actionValue: [
        {
          id: '1',
          company: 'React, Node.js, MongoDB',
          position: 'E-commerce Platform',
          location: 'Full-Stack Development',
          startDate: 'Jan 2024',
          endDate: 'Mar 2024',
          current: false,
          description: 'Developed a complete e-commerce platform with user authentication, product catalog, shopping cart, and payment integration. Implemented responsive design using React and Tailwind CSS. Built RESTful APIs using Node.js and Express.js with MongoDB database.'
        },
        {
          id: '2',
          company: 'Python, Django, PostgreSQL',
          position: 'Task Management System',
          location: 'Web Development',
          startDate: 'Oct 2023',
          endDate: 'Dec 2023',
          current: false,
          description: 'Created a comprehensive task management application with team collaboration features. Implemented user roles, project management, and real-time notifications. Used Django framework with PostgreSQL database and deployed on Heroku.'
        }
      ]
    },
    {
      id: 'education-enhance',
      type: 'improvement' as const,
      field: 'education',
      title: 'Add Education Details',
      description: 'Include your educational background',
      suggestion: 'Add your degree and institution information',
      priority: 'medium' as const,
      actionValue: [
        {
          id: '1',
          institution: 'University Name',
          degree: 'Bachelor of Technology',
          field: 'Computer Science',
          startDate: 'Aug 2020',
          endDate: 'May 2024',
          current: false
        }
      ]
    }
  ];

  const calculateATSScore = (data: ResumeData): number => {
    let score = 0;
    console.log('Calculating ATS Score for:', data);

    // Contact information (20 points total)
    if (data.fullName && data.fullName.trim()) {
      score += 5;
      console.log('Full name found, +5 points');
    }
    if (data.email && data.email.trim()) {
      score += 5;
      console.log('Email found, +5 points');
    }
    if (data.phone && data.phone.trim()) {
      score += 5;
      console.log('Phone found, +5 points');
    }
    if (data.linkedin && data.linkedin.trim()) {
      score += 5;
      console.log('LinkedIn found, +5 points');
    }

    // Summary (25 points)
    if (data.summary && data.summary.trim()) {
      if (data.summary.length >= 100) {
        score += 25;
        console.log('Comprehensive summary found, +25 points');
      } else if (data.summary.length >= 50) {
        score += 15;
        console.log('Good summary found, +15 points');
      } else {
        score += 8;
        console.log('Basic summary found, +8 points');
      }
    }

    // Experience/Projects (30 points)
    if (data.experience && data.experience.length > 0) {
      if (data.experience.length >= 3) {
        score += 30;
        console.log('3+ experiences found, +30 points');
      } else if (data.experience.length >= 2) {
        score += 20;
        console.log('2 experiences found, +20 points');
      } else {
        score += 10;
        console.log('1 experience found, +10 points');
      }
    }

    // Education (10 points)
    if (data.education && data.education.length > 0) {
      score += 10;
      console.log('Education found, +10 points');
    }

    // Skills (15 points)
    if (data.skills && data.skills.length > 0) {
      if (data.skills.length >= 10) {
        score += 15;
        console.log('10+ skills found, +15 points');
      } else if (data.skills.length >= 6) {
        score += 12;
        console.log('6+ skills found, +12 points');
      } else if (data.skills.length >= 3) {
        score += 8;
        console.log('3+ skills found, +8 points');
      } else {
        score += 4;
        console.log('Some skills found, +4 points');
      }
    }

    const finalScore = Math.min(score, 100);
    console.log('Final ATS Score:', finalScore);
    return finalScore;
  };

  const getRelevantSuggestions = (data: ResumeData) => {
    const relevantSuggestions = [];
    console.log('Getting relevant suggestions for:', data);

    // Check summary
    if (!data.summary || data.summary.trim().length < 50) {
      relevantSuggestions.push(sampleSuggestions[0]);
      console.log('Adding summary suggestion');
    }

    // Check skills
    if (!data.skills || data.skills.length < 6) {
      relevantSuggestions.push(sampleSuggestions[1]);
      console.log('Adding skills suggestion');
    }

    // Check experience/projects
    if (!data.experience || data.experience.length < 2) {
      relevantSuggestions.push(sampleSuggestions[2]);
      console.log('Adding experience suggestion');
    }

    // Check education
    if (!data.education || data.education.length === 0) {
      relevantSuggestions.push(sampleSuggestions[3]);
      console.log('Adding education suggestion');
    }

    console.log('Total suggestions:', relevantSuggestions.length);
    return relevantSuggestions;
  };

  useEffect(() => {
    console.log('Resume data changed:', resumeData);
    const relevantSuggestions = getRelevantSuggestions(resumeData);
    setSuggestions(relevantSuggestions);
    const score = calculateATSScore(resumeData);
    setAtsScore(score);
  }, [resumeData]);

  const applySuggestion = (suggestion: Suggestion) => {
    console.log('Applying suggestion:', suggestion);
    if (suggestion.actionValue) {
      onApplySuggestion(suggestion.field, suggestion.actionValue);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      default: return <CheckCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* ATS Score */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 gradient-primary rounded-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">ATS Score</CardTitle>
              <p className="text-sm text-gray-600">Resume optimization score</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className={`${getScoreBackground(atsScore)} rounded-lg p-4 mb-4`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Current Score</span>
              <span className={`text-2xl font-bold ${getScoreColor(atsScore)}`}>
                {atsScore}/100
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  atsScore >= 80 ? 'bg-green-500' : 
                  atsScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${atsScore}%` }}
              ></div>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {atsScore >= 80 ? '🎉 Excellent! Your resume is well-optimized.' :
             atsScore >= 60 ? '✨ Good! Apply suggestions below to improve.' :
             '🚀 Apply the AI suggestions to boost your score.'}
          </p>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 gradient-primary rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">AI Suggestions</CardTitle>
                <p className="text-sm text-gray-600">Click to apply improvements</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getPriorityIcon(suggestion.priority)}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{suggestion.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                      <p className="text-sm text-blue-700 bg-blue-50 p-2 rounded italic">
                        💡 {suggestion.suggestion}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          suggestion.type === 'ats' ? 'bg-purple-100 text-purple-700' :
                          suggestion.type === 'improvement' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {suggestion.type === 'ats' ? 'ATS Boost' :
                           suggestion.type === 'improvement' ? 'Enhancement' : 'Content'}
                        </span>
                        <span className={`text-xs font-medium ${
                          suggestion.priority === 'high' ? 'text-red-600' :
                          suggestion.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                        }`}>
                          {suggestion.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => applySuggestion(suggestion)}
                    size="sm"
                    className="ml-3 bg-primary hover:bg-primary/90"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {suggestions.length === 0 && atsScore >= 80 && (
        <Card className="glass-effect border-green-200 bg-green-50/50">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">Perfect!</h3>
            <p className="text-green-700">Your resume is well-optimized and ready to impress employers!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AISuggestions;
