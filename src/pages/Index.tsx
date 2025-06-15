import React, { useState, useRef } from 'react';
import { ResumeData } from '../types/resume';
import { sampleResumeData } from '../utils/sampleData';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import PDFExporter from '../components/PDFExporter';
import AISuggestions from '../components/AISuggestions';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, Download, Star, Zap } from 'lucide-react';

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(sampleResumeData);
  const resumeRef = useRef<HTMLDivElement>(null);

  const clearData = () => {
    setResumeData({
      fullName: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      leetcode: '',
      summary: '',
      education: [],
      experience: [],
      workExperience: [],
      skills: [],
      technicalSkills: {
        languages: '',
        toolsFrameworks: '',
        webProgramming: '',
        databases: '',
        domainKnowledge: ''
      },
      certificates: [],
      achievements: []
    });
  };

  const loadSampleData = () => {
    setResumeData(sampleResumeData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-100/60">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 shadow-xl border-b border-white/20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-6 gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Dynamic Resume Builder
                </h1>
                <p className="text-blue-100 text-sm font-medium flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-300" />
                  Create ATS-optimized resumes with AI suggestions
                  <Zap className="w-4 h-4 text-yellow-300" />
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={loadSampleData} 
                variant="outline" 
                size="sm"
                className="bg-white/15 border-white/30 text-white hover:bg-white/25 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Load Sample
              </Button>
              <Button 
                onClick={clearData} 
                variant="outline" 
                size="sm"
                className="bg-white/15 border-white/30 text-white hover:bg-white/25 backdrop-blur-sm"
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Panel - Form and Controls */}
          <div className="space-y-6">
            {/* Export Section */}
            <div className="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg border border-white/40 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Export Resume</h3>
              </div>
              <PDFExporter resumeRef={resumeRef} />
            </div>

            {/* AI Suggestions */}
            <AISuggestions 
              resumeData={resumeData} 
              onApplySuggestion={(field, value) => {
                setResumeData(prev => ({ ...prev, [field]: value }));
              }}
            />
            
            {/* Resume Form */}
            <div className="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg border border-white/40 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <FileText className="w-6 h-6" />
                  Resume Information
                </h2>
                <p className="text-gray-200 text-sm mt-1">Fill in your details below</p>
              </div>
              <div className="max-h-[900px] overflow-y-auto custom-scrollbar">
                <div className="p-6">
                  <ResumeForm data={resumeData} onUpdate={setResumeData} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Resume Preview */}
          <div className="xl:sticky xl:top-8 xl:self-start">
            <div className="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg border border-white/40 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Resume Preview</h2>
                    <p className="text-gray-200 text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      ATS-optimized professional format
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/60">
                <div className="max-h-[1000px] overflow-y-auto custom-scrollbar">
                  <div className="p-6 flex justify-center">
                    <div className="w-full max-w-5xl">
                      <ResumePreview ref={resumeRef} data={resumeData} theme="modern" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
