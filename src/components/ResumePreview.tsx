
import React from 'react';
import { ResumeData, Theme } from '../types/resume';

interface ResumePreviewProps {
  data: ResumeData;
  theme: Theme;
}

const ResumePreview = React.forwardRef<HTMLDivElement, ResumePreviewProps>(({ data, theme }, ref) => {
  // Function to format URLs
  const formatLinkedInUrl = (linkedin: string) => {
    if (!linkedin) return '';
    if (linkedin.startsWith('http')) return linkedin;
    if (linkedin.startsWith('linkedin.com/in/')) return `https://${linkedin}`;
    if (linkedin.startsWith('/in/')) return `https://linkedin.com${linkedin}`;
    return `https://linkedin.com/in/${linkedin}`;
  };

  const formatGitHubUrl = (github: string) => {
    if (!github) return '';
    if (github.startsWith('http')) return github;
    if (github.startsWith('github.com/')) return `https://${github}`;
    if (github.startsWith('/')) return `https://github.com${github}`;
    return `https://github.com/${github}`;
  };

  const formatLeetCodeUrl = (leetcode: string) => {
    if (!leetcode) return '';
    if (leetcode.startsWith('http')) return leetcode;
    if (leetcode.startsWith('leetcode.com/')) return `https://${leetcode}`;
    if (leetcode.startsWith('/')) return `https://leetcode.com${leetcode}`;
    return `https://leetcode.com/u/${leetcode}`;
  };

  // Helper function to check if any section has content
  const hasContent = (section: any[]) => section && section.length > 0;
  const hasPersonalInfo = data.fullName || data.email || data.phone || data.linkedin || data.github || data.leetcode;

  return (
    <div 
      ref={ref} 
      data-resume-preview
      style={{
        width: '794px',
        minHeight: '1123px',
        margin: '0 auto',
        padding: '40px 50px',
        backgroundColor: '#ffffff',
        color: '#000000',
        fontFamily: 'Times New Roman, serif',
        fontSize: '12px',
        lineHeight: '1.3',
        boxSizing: 'border-box',
        printColorAdjust: 'exact',
        WebkitPrintColorAdjust: 'exact'
      }}
    >
      {/* Header Section */}
      {hasPersonalInfo && (
        <div style={{ textAlign: 'center', marginBottom: '18px', pageBreakInside: 'avoid' }}>
          <h1 style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            margin: '0 0 6px 0', 
            color: '#000000',
            letterSpacing: '0.3px',
            fontFamily: 'Times New Roman, serif'
          }}>
            {data.fullName || 'Your Name'}
          </h1>
          {(data.email || data.phone) && (
            <div style={{ 
              fontSize: '12px',
              lineHeight: '1.3',
              marginBottom: '4px',
              color: '#0066cc'
            }}>
              {data.email && <span>{data.email}</span>}
              {data.phone && data.email && <span style={{ margin: '0 4px' }}> | </span>}
              {data.phone && <span>{data.phone}</span>}
            </div>
          )}
          {(data.linkedin || data.github || data.leetcode) && (
            <div style={{ 
              fontSize: '12px',
              lineHeight: '1.3'
            }}>
              {data.linkedin && (
                <a href={formatLinkedInUrl(data.linkedin)} style={{ color: '#0066cc', textDecoration: 'none' }}>
                  LinkedIn
                </a>
              )}
              {data.github && data.linkedin && <span style={{ margin: '0 4px' }}> | </span>}
              {data.github && (
                <a href={formatGitHubUrl(data.github)} style={{ color: '#0066cc', textDecoration: 'none' }}>
                  GitHub
                </a>
              )}
              {data.leetcode && (data.github || data.linkedin) && <span style={{ margin: '0 4px' }}> | </span>}
              {data.leetcode && (
                <a href={formatLeetCodeUrl(data.leetcode)} style={{ color: '#0066cc', textDecoration: 'none' }}>
                  LeetCode
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {/* Professional Summary */}
      {data.summary && data.summary.trim() && (
        <div style={{ marginBottom: '15px', pageBreakInside: 'avoid' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            margin: '0 0 10px 0', 
            color: '#000000',
            fontFamily: 'Times New Roman, serif'
          }}>
            Professional Summary
          </h2>
          <div style={{ borderBottom: '1px solid #000000', marginBottom: '8px', width: '100%' }}></div>
          <div style={{ fontSize: '12px', lineHeight: '1.4', textAlign: 'justify' }}>
            {data.summary}
          </div>
        </div>
      )}

      {/* Education Section */}
      {hasContent(data.education) && (
        <div style={{ marginBottom: '15px', pageBreakInside: 'avoid' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            margin: '0 0 10px 0', 
            color: '#000000',
            fontFamily: 'Times New Roman, serif'
          }}>
            Education
          </h2>
          <div style={{ borderBottom: '1px solid #000000', marginBottom: '8px', width: '100%' }}></div>
          {data.education.map((edu, index) => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '0' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                    {edu.institution || 'Institution Name'}
                  </span>
                  {edu.degree && (
                    <span style={{ fontSize: '12px', marginLeft: '6px' }}>
                      , {edu.degree} {edu.field && `in ${edu.field}`}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '12px', fontWeight: 'normal', whiteSpace: 'nowrap', marginLeft: '10px' }}>
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </span>
              </div>
              <div style={{ fontSize: '12px', lineHeight: '1.3', paddingLeft: '12px' }}>
                {edu.gpa && (
                  <div style={{ marginBottom: '1px' }}>
                    • GPA: {edu.gpa}
                    {edu.transcriptLink && (
                      <span> (<a href={edu.transcriptLink} style={{ color: '#0066cc', textDecoration: 'none' }}>Transcript</a>)</span>
                    )}
                  </div>
                )}
                {edu.coursework && (
                  <div>
                    • Coursework: {edu.coursework}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Technical Skills */}
      {(data.technicalSkills && (
        data.technicalSkills.languages ||
        data.technicalSkills.toolsFrameworks ||
        data.technicalSkills.webProgramming ||
        data.technicalSkills.databases ||
        data.technicalSkills.domainKnowledge
      )) && (
        <div style={{ marginBottom: '15px', pageBreakInside: 'avoid' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            margin: '0 0 10px 0', 
            color: '#000000',
            fontFamily: 'Times New Roman, serif'
          }}>
            Technical Skills
          </h2>
          <div style={{ borderBottom: '1px solid #000000', marginBottom: '8px', width: '100%' }}></div>
          <div style={{ fontSize: '12px', lineHeight: '1.3' }}>
            {data.technicalSkills.languages && (
              <div style={{ marginBottom: '1px' }}>
                <span style={{ fontWeight: 'bold' }}>Languages: </span>
                <span>{data.technicalSkills.languages}</span>
              </div>
            )}
            {data.technicalSkills.toolsFrameworks && (
              <div style={{ marginBottom: '1px' }}>
                <span style={{ fontWeight: 'bold' }}>Tools & Frameworks: </span>
                <span>{data.technicalSkills.toolsFrameworks}</span>
              </div>
            )}
            {data.technicalSkills.webProgramming && (
              <div style={{ marginBottom: '1px' }}>
                <span style={{ fontWeight: 'bold' }}>Web Programming: </span>
                <span>{data.technicalSkills.webProgramming}</span>
              </div>
            )}
            {data.technicalSkills.databases && (
              <div style={{ marginBottom: '1px' }}>
                <span style={{ fontWeight: 'bold' }}>Databases: </span>
                <span>{data.technicalSkills.databases}</span>
              </div>
            )}
            {data.technicalSkills.domainKnowledge && (
              <div style={{ marginBottom: '1px' }}>
                <span style={{ fontWeight: 'bold' }}>Domain Knowledge: </span>
                <span>{data.technicalSkills.domainKnowledge}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {hasContent(data.workExperience) && (
        <div style={{ marginBottom: '15px', pageBreakInside: 'avoid' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            margin: '0 0 10px 0', 
            color: '#000000',
            fontFamily: 'Times New Roman, serif'
          }}>
            Work Experience
          </h2>
          <div style={{ borderBottom: '1px solid #000000', marginBottom: '8px', width: '100%' }}></div>
          {data.workExperience.map((exp, index) => (
            <div key={exp.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '0' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                    {exp.position || 'Position'}
                  </span>
                  <span style={{ fontSize: '12px', margin: '0 4px' }}> | </span> 
                  <span style={{ fontSize: '12px' }}>
                    {exp.company || 'Company'}
                  </span>
                  {exp.location && (
                    <>
                      <span style={{ fontSize: '12px', margin: '0 4px' }}> | </span>
                      <span style={{ fontSize: '12px' }}>
                        {exp.location}
                      </span>
                    </>
                  )}
                </div>
                <span style={{ fontSize: '12px', whiteSpace: 'nowrap', marginLeft: '10px' }}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              {exp.description && (
                <div style={{ fontSize: '12px', lineHeight: '1.3', paddingLeft: '12px' }}>
                  {exp.description.split('.').filter(item => item.trim()).map((item, idx) => (
                    <div key={idx} style={{ marginBottom: '1px' }}>
                      • {item.trim()}.
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {hasContent(data.experience) && (
        <div style={{ marginBottom: '15px', pageBreakInside: 'avoid' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            margin: '0 0 10px 0', 
            color: '#000000',
            fontFamily: 'Times New Roman, serif'
          }}>
            Projects
          </h2>
          <div style={{ borderBottom: '1px solid #000000', marginBottom: '8px', width: '100%' }}></div>
          {data.experience.map((exp, index) => (
            <div key={exp.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '0' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                    {exp.position || 'Project Title'}
                  </span>
                  <span style={{ fontSize: '12px', margin: '0 4px' }}> | </span> 
                  <span style={{ fontSize: '12px' }}>
                    {exp.company || 'Technology Stack'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '10px' }}>
                  {exp.projectLink && (
                    <a href={exp.projectLink} style={{ color: '#0066cc', fontSize: '12px', textDecoration: 'none' }}>
                      (GitHub)
                    </a>
                  )}
                  <span style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
                    {exp.startDate} {exp.endDate && exp.endDate !== 'Present' ? ` - ${exp.endDate}` : ''}
                  </span>
                </div>
              </div>
              {exp.description && (
                <div style={{ fontSize: '12px', lineHeight: '1.3', paddingLeft: '12px' }}>
                  {exp.description.split('.').filter(item => item.trim()).map((item, idx) => (
                    <div key={idx} style={{ marginBottom: '1px' }}>
                      • {item.trim()}.
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {hasContent(data.achievements) && (
        <div style={{ marginBottom: '15px', pageBreakInside: 'avoid' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            margin: '0 0 10px 0', 
            color: '#000000',
            fontFamily: 'Times New Roman, serif'
          }}>
            Achievements
          </h2>
          <div style={{ borderBottom: '1px solid #000000', marginBottom: '8px', width: '100%' }}></div>
          {data.achievements.map((achievement, index) => (
            <div key={achievement.id} style={{ marginBottom: '4px' }}>
              <div style={{ fontSize: '12px', lineHeight: '1.3' }}>
                • {achievement.description}
                {achievement.verifyLink && (
                  <span> (<a href={achievement.verifyLink} style={{ color: '#0066cc', textDecoration: 'none' }}>Certificate</a>)</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {hasContent(data.certificates) && (
        <div style={{ pageBreakInside: 'avoid' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            margin: '0 0 10px 0', 
            color: '#000000',
            fontFamily: 'Times New Roman, serif'
          }}>
            Certifications
          </h2>
          <div style={{ borderBottom: '1px solid #000000', marginBottom: '8px', width: '100%' }}></div>
          {data.certificates.map((cert, index) => (
            <div key={cert.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: '4px',
              fontSize: '12px',
              lineHeight: '1.3',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: '1', minWidth: '0' }}>
                <span style={{ fontWeight: 'bold' }}>{cert.issuer}: </span>
                <span>{cert.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '10px' }}>
                {cert.verifyLink && (
                  <a href={cert.verifyLink} style={{ color: '#0066cc', textDecoration: 'none' }}>
                    (Verify)
                  </a>
                )}
                <span style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
                  {cert.issueDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
