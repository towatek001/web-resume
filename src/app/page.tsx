'use client';

import { useState } from 'react';
import { resumeData } from '@/lib/resumeData';
import { exportToPDF, exportToDocx } from '@/lib/exportUtils';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const skillCategories = ['All', ...Object.keys(resumeData.skills)];
  
  const getFilteredSkills = () => {
    if (activeFilter === 'All') {
      return Object.entries(resumeData.skills).flatMap(([category, skills]) => 
        skills.map(skill => ({ skill, category }))
      );
    }
    return resumeData.skills[activeFilter]?.map(skill => ({ skill, category: activeFilter })) || [];
  };

  const toggleTimelineItem = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const chartData = {
    labels: Object.keys(resumeData.skills),
    datasets: [
      {
        data: Object.values(resumeData.skills).map(skills => skills.length),
        backgroundColor: [
          '#06b6d4', // cyan-500
          '#8b5cf6', // violet-500  
          '#f59e0b', // amber-500
          '#ef4444', // red-500
          '#10b981', // emerald-500
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
                 callbacks: {
           label: function(context: { label: string; parsed: number }) {
             const label = context.label || '';
             const value = context.parsed || 0;
             return `${label}: ${value} skills`;
           }
         }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-800">{resumeData.name}</h1>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#skills" className="font-medium text-slate-600 hover:text-cyan-600 transition-colors">
              Skills
            </a>
            <a href="#experience" className="font-medium text-slate-600 hover:text-cyan-600 transition-colors">
              Experience
            </a>
            <a href="#education" className="font-medium text-slate-600 hover:text-cyan-600 transition-colors">
              Education
            </a>
            <a href="#contact" className="font-medium text-slate-600 hover:text-cyan-600 transition-colors">
              Contact
            </a>
            <div className="relative group">
              <button className="bg-cyan-600 text-white px-4 py-2 rounded-full font-medium hover:bg-cyan-700 transition-colors">
                Export ↓
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={() => exportToPDF(resumeData)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md"
                >
                  Export as PDF
                </button>
                <button
                  onClick={() => exportToDocx(resumeData)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-md"
                >
                  Export as DOCX
                </button>
              </div>
            </div>
          </div>
          <button 
            className="md:hidden p-2 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </nav>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <a href="#skills" className="block py-2 px-6 text-sm text-slate-600 hover:bg-slate-100">Skills</a>
            <a href="#experience" className="block py-2 px-6 text-sm text-slate-600 hover:bg-slate-100">Experience</a>
            <a href="#education" className="block py-2 px-6 text-sm text-slate-600 hover:bg-slate-100">Education</a>
            <a href="#contact" className="block py-2 px-6 text-sm text-slate-600 hover:bg-slate-100">Contact</a>
            <div className="p-4 space-y-2">
              <button
                onClick={() => exportToPDF(resumeData)}
                className="bg-cyan-600 text-white w-full text-sm py-2 rounded-md hover:bg-cyan-700 transition-colors"
              >
                Export as PDF
              </button>
              <button
                onClick={() => exportToDocx(resumeData)}
                className="bg-blue-600 text-white w-full text-sm py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Export as DOCX
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Senior Full-Stack Developer
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-600">
            {resumeData.summary}
          </p>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-24 scroll-mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Technical Skills Dashboard</h3>
            <p className="text-slate-600">Explore my technical capabilities. Click a category to filter the technologies.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {skillCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      activeFilter === category
                        ? 'bg-cyan-600 text-white shadow-lg'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Skill Tags */}
              <div className="flex flex-wrap justify-center gap-4">
                {getFilteredSkills().map(({ skill, category }, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className={`px-3 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
                      activeFilter === 'All' || activeFilter === category
                        ? 'bg-white text-slate-800 shadow-md opacity-100'
                        : 'bg-gray-100 text-gray-400 opacity-30 scale-95'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Chart */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="text-xl font-semibold text-center mb-4 text-slate-800">
                  Core Skill Distribution
                </h4>
                <div className="relative h-80">
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-24 scroll-mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Experience Timeline</h3>
            <p className="text-slate-600">A journey through my career. Click on any role to see the details and my contributions.</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-cyan-200"></div>
            
            {resumeData.experience.map((job, index) => (
              <div key={index} className="relative flex items-start mb-12">
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-cyan-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                
                {/* Content */}
                <div className="ml-16 bg-white p-6 rounded-xl shadow-md w-full hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => toggleTimelineItem(index)}
                    className="w-full text-left focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 rounded-lg"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h4 className="text-xl font-bold text-slate-900">{job.role}</h4>
                      <span className="text-slate-600 font-medium">{job.company} | {job.type}</span>
                    </div>
                    <div className="text-sm text-slate-500 mb-4">
                      {job.date} | {job.location}
                    </div>
                  </button>
                  
                  {/* Expandable Content */}
                  <div className={`transition-all duration-300 overflow-hidden ${
                    expandedItems.includes(index) 
                      ? 'max-h-screen opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}>
                    <div className="pt-2 border-t border-slate-200">
                      <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
                        {job.details.map((detail, detailIndex) => (
                          <li key={detailIndex}>{detail}</li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sm font-medium text-slate-600">Technologies:</span>
                        {job.tech.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="mb-24 scroll-mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900">Education & Certifications</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h4 className="text-2xl font-semibold text-slate-800 mb-4">Education</h4>
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index}>
                    <p className="font-semibold text-lg text-cyan-700">{edu.degree}</p>
                    <p className="text-slate-600">{edu.school} ({edu.date})</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h4 className="text-2xl font-semibold text-slate-800 mb-4">Certifications</h4>
              <ul className="space-y-3">
                {resumeData.certifications.map((cert, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-cyan-600 mr-2">•</span>
                    <span className="text-slate-700">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-24 scroll-mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900">Let&apos;s Connect</h3>
          </div>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md text-center">
            <div className="space-y-4">
              <p className="text-lg text-slate-700">
                <span className="font-semibold">Location:</span> {resumeData.contact.location}
              </p>
              <p className="text-lg text-slate-700">
                <span className="font-semibold">Email:</span> {resumeData.contact.email}
              </p>
              <p className="text-lg text-slate-700">
                <span className="font-semibold">LinkedIn:</span> {resumeData.contact.linkedin}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
