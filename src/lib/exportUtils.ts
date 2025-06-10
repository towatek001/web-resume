import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableCell, TableRow, WidthType } from 'docx';
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
  const margin = 15;
  const pageHeight = doc.internal.pageSize.getHeight();
  const rightMargin = doc.internal.pageSize.getWidth() - margin;
  let y = margin;

  const checkPageBreak = (currentY: number): number => {
    if (currentY > pageHeight - margin) {
      doc.addPage();
      return margin;
    }
    return currentY;
  };

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(resumeData.name, margin, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const contactInfo = `${resumeData.contact.location} | ${resumeData.contact.email} | ${resumeData.contact.linkedin}`;
  doc.text(contactInfo, margin, y);
  y += 10;

  doc.setLineWidth(0.5);
  doc.line(margin, y, rightMargin, y);
  y += 10;

  // Professional Summary
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Professional Summary", margin, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const summaryLines = doc.splitTextToSize(resumeData.summary, rightMargin - margin);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 5 + 5;

  // Professional Experience
  y = checkPageBreak(y);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Professional Experience", margin, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  resumeData.experience.forEach(job => {
    y = checkPageBreak(y);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`${job.role}`, margin, y);

    doc.setFont("helvetica", "normal");
    doc.text(`${job.company} | ${job.type}`, rightMargin, y, { align: 'right' });
    y += 5;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text(`${job.date} | ${job.location}`, margin, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    job.details.forEach(detail => {
      y = checkPageBreak(y);
      const detailLines = doc.splitTextToSize(`• ${detail}`, rightMargin - margin - 5);
      doc.text(detailLines, margin + 5, y);
      y += detailLines.length * 4;
    });
    y += 2;
    const techLines = doc.splitTextToSize(`Technologies: ${job.tech.join(', ')}`, rightMargin - margin);
    doc.setFont("helvetica", "italic");
    doc.text(techLines, margin, y);
    y += techLines.length * 4 + 6;
  });

  // Education & Certifications
  y = checkPageBreak(y);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Education & Certifications", margin, y);
  y += 8;

  doc.setFontSize(10);
  resumeData.education.forEach(edu => {
    y = checkPageBreak(y);
    doc.setFont("helvetica", "bold");
    doc.text(edu.degree, margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${edu.school} (${edu.date})`, margin, y + 5);
    y += 12;
  });
  y += 2;

  resumeData.certifications.forEach(cert => {
    y = checkPageBreak(y);
    doc.text(`• ${cert}`, margin, y);
    y += 5;
  });

  // Core Technical Skills
  y = checkPageBreak(y);
  y += 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Core Technical Skills", margin, y);
  y += 6;
  y = checkPageBreak(y);

  const skillsBody = Object.entries(resumeData.skills).map(([category, skills]) => [
    category,
    skills.join(', ')
  ]);

  doc.autoTable({
    head: [['Category', 'Technologies']],
    body: skillsBody,
    startY: y,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    styles: { fontSize: 9 },
    margin: { left: margin, right: margin }
  });

  doc.save('Tony_Wang_Resume.pdf');
};

export const exportToDocx = async (resumeData: ResumeData) => {
  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({
          children: [new TextRun({ text: resumeData.name, bold: true, size: 44 })],
        }),
        new Paragraph({
          children: [new TextRun({ 
            text: `${resumeData.contact.location} | ${resumeData.contact.email} | ${resumeData.contact.linkedin}`, 
            size: 20 
          })],
        }),
        new Paragraph({ text: "", spacing: { after: 100 } }),
        new Paragraph({ 
          text: "Professional Summary", 
          heading: HeadingLevel.HEADING_1
        }),
        new Paragraph({ 
          children: [new TextRun({ text: resumeData.summary, size: 20 })], 
          spacing: { after: 200 } 
        }),

        new Paragraph({ 
          text: "Professional Experience", 
          heading: HeadingLevel.HEADING_1, 
          spacing: { after: 100 } 
        }),
        ...resumeData.experience.flatMap(job => [
          new Paragraph({
            children: [
              new TextRun({ text: job.role, bold: true, size: 22 }),
              new TextRun({ text: `\t${job.company} | ${job.type}`, size: 22 }),
            ],
          }),
          new Paragraph({
            children: [new TextRun({ text: `${job.date} | ${job.location}`, italics: true, size: 18 })]
          }),
          ...job.details.map(detail => new Paragraph({ text: `• ${detail}`, bullet: { level: 0 } })),
          new Paragraph({ 
            children: [new TextRun({ text: `Technologies: ${job.tech.join(', ')}`, italics: true, size: 18 })], 
            spacing: { after: 200 } 
          }),
        ]),

        new Paragraph({ 
          text: "Education & Certifications", 
          heading: HeadingLevel.HEADING_1, 
          spacing: { after: 100 } 
        }),
        ...resumeData.education.map(edu => new Paragraph({
          children: [
            new TextRun({ text: edu.degree, bold: true }),
            new TextRun({ text: `\n${edu.school} (${edu.date})` })
          ],
          spacing: { after: 200 }
        })),
        ...resumeData.certifications.map(cert => new Paragraph({ text: `• ${cert}`, bullet: { level: 0 } })),

        new Paragraph({ text: "", spacing: { after: 200 } }),
        new Paragraph({ 
          text: "Core Technical Skills", 
          heading: HeadingLevel.HEADING_1, 
          border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } }, 
          spacing: { after: 100 } 
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Category", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Technologies", bold: true })] })] }),
              ],
            }),
            ...Object.entries(resumeData.skills).map(([cat, skills]) => 
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph(cat)] }),
                  new TableCell({ children: [new Paragraph(skills.join(', '))] }),
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