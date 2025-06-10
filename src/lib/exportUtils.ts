import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow, WidthType, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from './resumeData';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: {
      head?: string[][];
      body?: string[][];
      startY?: number;
      theme?: string;
      headStyles?: { fillColor?: number[]; textColor?: number };
      styles?: { fontSize?: number };
      margin?: { left?: number; right?: number };
    }) => jsPDF;
  }
}

export const exportToPDF = (resumeData: ResumeData) => {
  const doc = new jsPDF();
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const rightMargin = pageWidth - margin;
  const contentWidth = rightMargin - margin;
  let y = margin;

  // Simple black and white color scheme
  const colors = {
    primary: [0, 0, 0] as [number, number, number], // Black
    secondary: [100, 100, 100] as [number, number, number], // Gray
    accent: [150, 150, 150] as [number, number, number], // Light gray
    light: [245, 245, 245] as [number, number, number], // Very light gray
    text: [0, 0, 0] as [number, number, number] // Black
  };

  const checkPageBreak = (currentY: number, additionalSpace: number = 15): number => {
    if (currentY + additionalSpace > pageHeight - margin - 20) {
      doc.addPage();
      return margin;
    }
    return currentY;
  };

  const addSectionHeader = (title: string, currentY: number): number => {
    const newY = checkPageBreak(currentY, 20);
    
    // Simple section title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...colors.primary);
    doc.text(title, margin, newY);
    
    // Simple underline
    doc.setDrawColor(...colors.secondary);
    doc.setLineWidth(0.5);
    doc.line(margin, newY + 2, margin + doc.getTextWidth(title), newY + 2);
    
    return newY + 10;
  };

  // Simple Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...colors.primary);
  doc.text(resumeData.name, margin, y);
  y += 10;

  // Contact Information - Simple Layout
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...colors.secondary);
  
  const contactInfo = `${resumeData.contact.location} | ${resumeData.contact.email} | ${resumeData.contact.linkedin}`;
  doc.text(contactInfo, margin, y);
  y += 8;

  // Simple line separator
  doc.setDrawColor(...colors.secondary);
  doc.setLineWidth(0.5);
  doc.line(margin, y, rightMargin, y);
  y += 12;

  // Professional Summary
  y = addSectionHeader("Professional Summary", y);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...colors.text);
  const summaryLines = doc.splitTextToSize(resumeData.summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 5 + 8;

  // Professional Experience
  y = addSectionHeader("Professional Experience", y);

  resumeData.experience.forEach((job, index) => {
    y = checkPageBreak(y, 30);
    
    // Job title and company - Two column layout
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...colors.primary);
    doc.text(job.role, margin, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...colors.secondary);
    doc.text(`${job.company} | ${job.type}`, rightMargin, y, { align: 'right' });
    y += 5;

    // Date and location
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(...colors.secondary);
    doc.text(`${job.date} | ${job.location}`, margin, y);
    y += 6;

    // Job details with better formatting
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...colors.text);
    job.details.forEach(detail => {
      y = checkPageBreak(y);
      const detailLines = doc.splitTextToSize(`• ${detail}`, contentWidth - 10);
      doc.text(detailLines, margin + 5, y);
      y += detailLines.length * 4;
    });

    // Simple technology list
    y += 2;
    y = checkPageBreak(y);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(...colors.secondary);
    const techText = `Technologies: ${job.tech.join(', ')}`;
    const techLines = doc.splitTextToSize(techText, contentWidth);
    doc.text(techLines, margin, y);
    y += techLines.length * 4 + 6;
    
    // Add separator line between jobs (except last)
    if (index < resumeData.experience.length - 1) {
      doc.setDrawColor(...colors.accent);
      doc.setLineWidth(0.3);
      doc.line(margin, y, rightMargin, y);
      y += 6;
    }
  });

  // Education & Certifications
  y = addSectionHeader("Education & Certifications", y);

  // Education
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...colors.text);
  resumeData.education.forEach(edu => {
    y = checkPageBreak(y);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...colors.primary);
    doc.text(edu.degree, margin, y);
    y += 4;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...colors.secondary);
    doc.text(`${edu.school} (${edu.date})`, margin, y);
    y += 8;
  });
  y += 3;

  // Certifications with simple formatting
  if (resumeData.certifications.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...colors.primary);
    doc.text("Certifications:", margin, y);
    y += 5;
    
    resumeData.certifications.forEach(cert => {
      y = checkPageBreak(y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...colors.text);
      doc.text(`• ${cert}`, margin, y);
      y += 4;
    });
  }

  // Core Technical Skills with simple styling
  y = addSectionHeader("Core Technical Skills", y + 5);

  const skillsBody = Object.entries(resumeData.skills).map(([category, skills]) => [
    category,
    skills.join(', ')
  ]);

  doc.autoTable({
    head: [['Category', 'Technologies']],
    body: skillsBody,
    startY: y,
    theme: 'grid',
    headStyles: { 
      fillColor: [0, 0, 0],
      textColor: 255
    },
    styles: { 
      fontSize: 9
    },
    margin: { left: margin, right: margin }
  });

  // Simple footer
  doc.setDrawColor(...colors.secondary);
  doc.setLineWidth(0.5);
  doc.line(margin, pageHeight - 15, rightMargin, pageHeight - 15);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...colors.secondary);
  doc.text(`${resumeData.name} - Resume`, margin, pageHeight - 8);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, rightMargin, pageHeight - 8, { align: 'right' });

  doc.save('Tony_Wang_Resume.pdf');
};

export const exportToDocx = async (resumeData: ResumeData) => {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Calibri",
          },
        },
      },
    },
    sections: [{
      children: [
        // Simple Header - matching PDF
        new Paragraph({
          children: [new TextRun({ text: resumeData.name, bold: true, size: 36, font: "Calibri" })],
        }),
        new Paragraph({ text: "" }), // Empty line for spacing
        new Paragraph({
          children: [new TextRun({ 
            text: `${resumeData.contact.location} | ${resumeData.contact.email} | ${resumeData.contact.linkedin}`, 
            size: 22,
            color: "666666",
            font: "Calibri"
          })],
        }),
        new Paragraph({ text: "" }), // Empty line for spacing
        
        // Line separator
        new Paragraph({
          children: [new TextRun({ text: "_______________________________________________________________________________", color: "666666", font: "Calibri" })],
        }),
        new Paragraph({ text: "" }), // Empty line for spacing

        // Professional Summary - matching PDF
        new Paragraph({ 
          children: [new TextRun({ text: "Professional Summary", bold: true, size: 26, underline: {}, font: "Calibri" })],
        }),
        new Paragraph({ text: "" }), // Empty line for spacing
        new Paragraph({ 
          children: [new TextRun({ text: resumeData.summary, size: 22, font: "Calibri" })], 
        }),
        new Paragraph({ text: "" }), // Empty line for spacing
        new Paragraph({ text: "" }), // Additional empty line

        // Professional Experience - matching PDF
        new Paragraph({ 
          children: [new TextRun({ text: "Professional Experience", bold: true, size: 26, underline: {}, font: "Calibri" })],
        }),
        new Paragraph({ text: "" }), // Empty line for spacing
        ...resumeData.experience.flatMap((job, index) => [
          new Paragraph({
            children: [
              new TextRun({ text: job.role, bold: true, size: 24, font: "Calibri" }),
            ],
          }),
          new Paragraph({
            children: [new TextRun({ text: `${job.company} | ${job.type}`, size: 22, color: "666666", font: "Calibri" })],
          }),
          new Paragraph({
            children: [new TextRun({ text: `${job.date} | ${job.location}`, italics: true, size: 20, color: "666666", font: "Calibri" })],
          }),
          new Paragraph({ text: "" }), // Empty line before details
          ...job.details.map(detail => new Paragraph({ 
            children: [new TextRun({ text: `• ${detail}`, size: 22, font: "Calibri" })],
            indent: { left: 720 },
          })),
          new Paragraph({ text: "" }), // Empty line after details
          new Paragraph({ 
            children: [new TextRun({ text: `Technologies: ${job.tech.join(', ')}`, italics: true, size: 20, color: "666666", font: "Calibri" })], 
          }),
          new Paragraph({ text: "" }), // Empty line after job
          // Add separator line between jobs (except last)
          ...(index < resumeData.experience.length - 1 ? [
            new Paragraph({
              children: [new TextRun({ text: "_______________________________________________________________________________", color: "CCCCCC", font: "Calibri" })],
            }),
            new Paragraph({ text: "" }), // Empty line after separator
          ] : [])
        ]),

        // Education & Certifications - matching PDF
        new Paragraph({ 
          children: [new TextRun({ text: "Education & Certifications", bold: true, size: 26, underline: {}, font: "Calibri" })],
        }),
        new Paragraph({ text: "" }), // Empty line for spacing
        ...resumeData.education.map(edu => [
          new Paragraph({
            children: [new TextRun({ text: edu.degree, bold: true, size: 22, font: "Calibri" })],
          }),
          new Paragraph({
            children: [new TextRun({ text: `${edu.school} (${edu.date})`, size: 22, color: "666666", font: "Calibri" })],
          }),
          new Paragraph({ text: "" }), // Empty line between education entries
        ]).flat(),

        // Certifications
        ...(resumeData.certifications.length > 0 ? [
          new Paragraph({
            children: [new TextRun({ text: "Certifications:", bold: true, size: 22, font: "Calibri" })],
          }),
          new Paragraph({ text: "" }), // Empty line after certifications header
          ...resumeData.certifications.map(cert => new Paragraph({ 
            children: [new TextRun({ text: `• ${cert}`, size: 22, font: "Calibri" })],
          }))
        ] : []),
        // Add spacing before Skills section
        new Paragraph({ text: "" }), // Empty line for spacing
        new Paragraph({ text: "" }), // Additional empty line

        // Core Technical Skills - matching PDF
        new Paragraph({ 
          children: [new TextRun({ text: "Core Technical Skills", bold: true, size: 26, underline: {}, font: "Calibri" })],
        }),
        new Paragraph({ text: "" }), // Empty line for spacing
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          columnWidths: [2000, 6000], // 25% for category, 75% for technologies
          rows: [
            new TableRow({
              children: [
                new TableCell({ 
                  children: [new Paragraph({ 
                    children: [new TextRun({ text: "Category", bold: true, color: "FFFFFF", size: 22, font: "Calibri" })],
                    alignment: AlignmentType.CENTER
                  })],
                  shading: { fill: "000000" },
                  margins: {
                    top: 480,
                    bottom: 480,
                    left: 360,
                    right: 360,
                  },
                  width: { size: 25, type: WidthType.PERCENTAGE }
                }),
                new TableCell({ 
                  children: [new Paragraph({ 
                    children: [new TextRun({ text: "Technologies", bold: true, color: "FFFFFF", size: 22, font: "Calibri" })],
                    alignment: AlignmentType.CENTER
                  })],
                  shading: { fill: "000000" },
                  margins: {
                    top: 480,
                    bottom: 480,
                    left: 360,
                    right: 360,
                  },
                  width: { size: 75, type: WidthType.PERCENTAGE }
                }),
              ],
            }),
            ...Object.entries(resumeData.skills).map(([cat, skills], index) => 
              new TableRow({
                children: [
                  new TableCell({ 
                    children: [new Paragraph({ 
                      children: [new TextRun({ text: cat, bold: true, size: 22, font: "Calibri" })],
                      alignment: AlignmentType.LEFT,
                      spacing: { line: 320 }
                    })],
                    shading: { fill: index % 2 === 0 ? "F5F5F5" : "FFFFFF" },
                    margins: {
                      top: 600,
                      bottom: 600,
                      left: 480,
                      right: 360,
                    },
                    width: { size: 25, type: WidthType.PERCENTAGE }
                  }),
                  new TableCell({ 
                    children: [new Paragraph({ 
                      children: [new TextRun({ text: skills.join(', '), size: 22, font: "Calibri" })],
                      alignment: AlignmentType.LEFT,
                      spacing: { line: 320 }
                    })],
                    shading: { fill: index % 2 === 0 ? "F5F5F5" : "FFFFFF" },
                    margins: {
                      top: 600,
                      bottom: 600,
                      left: 360,
                      right: 480,
                    },
                    width: { size: 75, type: WidthType.PERCENTAGE }
                  }),
                ],
              })
            )
          ],
        }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "Tony_Wang_Resume.docx");
}; 