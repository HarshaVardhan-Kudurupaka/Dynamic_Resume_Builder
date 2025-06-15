
import React from 'react';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Download, FileText } from 'lucide-react';

interface PDFExporterProps {
  resumeRef: React.RefObject<HTMLDivElement>;
}

const PDFExporter: React.FC<PDFExporterProps> = ({ resumeRef }) => {
  const [isExporting, setIsExporting] = React.useState(false);

  const exportToPDF = async () => {
    if (!resumeRef.current) return;

    setIsExporting(true);
    try {
      // Collect all links with more precise positioning
      const links = Array.from(resumeRef.current.querySelectorAll('a')).map(link => {
        const rect = link.getBoundingClientRect();
        const containerRect = resumeRef.current!.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(link);
        
        return {
          href: link.href,
          x: rect.left - containerRect.left,
          y: rect.top - containerRect.top,
          width: rect.width,
          height: rect.height,
          fontSize: parseFloat(computedStyle.fontSize) || 12,
          text: link.textContent || ''
        };
      });

      console.log('Found links:', links);

      // Create canvas with optimized settings for better quality
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2, // Reduced scale for better performance while maintaining quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: resumeRef.current.scrollWidth,
        height: resumeRef.current.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        logging: false,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-resume-preview]');
          if (clonedElement) {
            (clonedElement as HTMLElement).style.fontFamily = 'Times New Roman, serif';
            (clonedElement as HTMLElement).style.transform = 'scale(1)';
            (clonedElement as HTMLElement).style.transformOrigin = 'top left';
          }
        }
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // A4 dimensions in mm
      const pdfWidth = 210;
      const pdfHeight = 297;
      
      // Calculate scaling to fit content properly
      const canvasAspectRatio = canvas.width / canvas.height;
      const pdfAspectRatio = pdfWidth / pdfHeight;
      
      let finalWidth = pdfWidth;
      let finalHeight = pdfWidth / canvasAspectRatio;
      
      // If the content is taller than one page, scale it down
      if (finalHeight > pdfHeight) {
        finalHeight = pdfHeight;
        finalWidth = pdfHeight * canvasAspectRatio;
      }
      
      // Center the content on the page
      const xOffset = (pdfWidth - finalWidth) / 2;
      const yOffset = (pdfHeight - finalHeight) / 2;
      
      // Add the image to PDF
      pdf.addImage(imgData, 'PNG', Math.max(0, xOffset), Math.max(0, yOffset), finalWidth, finalHeight);
      
      // Calculate scaling factors for link positions
      const scaleX = finalWidth / resumeRef.current.scrollWidth;
      const scaleY = finalHeight / resumeRef.current.scrollHeight;
      
      console.log('PDF dimensions:', { finalWidth, finalHeight, scaleX, scaleY });
      
      // Add clickable links with improved positioning
      links.forEach((link, index) => {
        const linkX = Math.max(0, xOffset) + (link.x * scaleX);
        const linkY = Math.max(0, yOffset) + (link.y * scaleY);
        const linkWidth = Math.max(link.width * scaleX, 10); // Minimum width
        const linkHeight = Math.max(link.height * scaleY, 4); // Minimum height
        
        console.log(`Link ${index + 1} (${link.text}):`, {
          original: { x: link.x, y: link.y, width: link.width, height: link.height },
          scaled: { x: linkX, y: linkY, width: linkWidth, height: linkHeight },
          href: link.href
        });
        
        // Add invisible link annotation to PDF with proper positioning
        try {
          pdf.link(linkX, linkY, linkWidth, linkHeight, { url: link.href });
        } catch (error) {
          console.warn(`Failed to add link ${index + 1}:`, error);
        }
      });
      
      pdf.save('resume.pdf');
      console.log('PDF generated successfully with', links.length, 'clickable links');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      onClick={exportToPDF} 
      disabled={isExporting}
      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
      <div className="relative flex items-center justify-center gap-3">
        {isExporting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Generating PDF...</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5" />
            <span>Download PDF</span>
            <FileText className="w-4 h-4 opacity-70" />
          </>
        )}
      </div>
    </Button>
  );
};

export default PDFExporter;
