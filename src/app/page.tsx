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
          <div className="text-xl font-bold text-slate-800">Portfolio</div>
                      <div className="hidden md:flex items-center space-x-8">
              <a href="#experience" className="font-medium text-slate-600 hover:text-cyan-600 transition-colors cursor-pointer">
                Experience
              </a>
              <a href="#education" className="font-medium text-slate-600 hover:text-cyan-600 transition-colors cursor-pointer">
                Education
              </a>
              <a href="#skills" className="font-medium text-slate-600 hover:text-cyan-600 transition-colors cursor-pointer">
                Skills
              </a>
              <a href="#contact" className="font-medium text-slate-600 hover:text-cyan-600 transition-colors cursor-pointer">
                Contact
              </a>
            <div className="relative group">
              <button className="bg-cyan-600 text-white px-4 py-2 rounded-full font-medium hover:bg-cyan-700 transition-colors cursor-pointer">
                Export ↓
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={() => exportToPDF(resumeData)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md cursor-pointer"
                >
                  Export as PDF
                </button>
                <button
                  onClick={() => exportToDocx(resumeData)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-md cursor-pointer"
                >
                  Export as DOCX
                </button>
              </div>
            </div>
          </div>
          <button 
            className="md:hidden p-2 rounded-md cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </nav>
                  {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <a href="#experience" className="block py-2 px-6 text-sm text-slate-600 hover:bg-slate-100 cursor-pointer">Experience</a>
              <a href="#education" className="block py-2 px-6 text-sm text-slate-600 hover:bg-slate-100 cursor-pointer">Education</a>
              <a href="#skills" className="block py-2 px-6 text-sm text-slate-600 hover:bg-slate-100 cursor-pointer">Skills</a>
              <a href="#contact" className="block py-2 px-6 text-sm text-slate-600 hover:bg-slate-100 cursor-pointer">Contact</a>
            <div className="p-4 space-y-2">
              <button
                onClick={() => exportToPDF(resumeData)}
                className="bg-cyan-600 text-white w-full text-sm py-2 rounded-md hover:bg-cyan-700 transition-colors cursor-pointer"
              >
                Export as PDF
              </button>
              <button
                onClick={() => exportToDocx(resumeData)}
                className="bg-blue-600 text-white w-full text-sm py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Export as DOCX
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              
              {/* Left Column - Name & Title */}
              <div className="lg:col-span-2 text-center lg:text-left">
                <div className="mb-6">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-2 tracking-tight">
                    {resumeData.name}
                  </h1>
                  <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto lg:mx-0 mb-4"></div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-cyan-700 mb-6">
                    Builder, Software Architect & Tech Leader
                  </h2>
                </div>
                
                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900">15+</div>
                    <div className="text-sm text-slate-600 font-medium">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900">50+</div>
                    <div className="text-sm text-slate-600 font-medium">Projects Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900">5</div>
                    <div className="text-sm text-slate-600 font-medium">AWS Certifications</div>
                  </div>
                </div>

                                 {/* Summary Highlights */}
                 <div className="space-y-4 text-left">
                   <div className="flex items-start">
                     <div className="flex-shrink-0 w-2 h-2 bg-cyan-500 rounded-full mt-3 mr-4"></div>
                     <p className="text-slate-700 leading-relaxed">
                       <span className="font-semibold text-slate-900">Solution Architecture:</span> Specialized in designing and building enterprise-grade, distributed software solutions that leverage cloud-native technologies to address complex challenges across finance and IoT sectors, with a focus on scalability and performance optimization.
                     </p>
                   </div>
                   <div className="flex items-start">
                     <div className="flex-shrink-0 w-2 h-2 bg-cyan-500 rounded-full mt-3 mr-4"></div>
                     <p className="text-slate-700 leading-relaxed">
                       <span className="font-semibold text-slate-900">Technical Leadership:</span> Proven experience directing cross-functional development teams across multiple high-impact initiatives, orchestrating comprehensive digital transformations including DevOps modernization, cloud migration strategies, and the evolution from monolithic to distributed system architectures.
                     </p>
                   </div>
                 </div>
              </div>

              {/* Right Column - Contact & Skills Preview */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Connect</h3>
                  
                  {/* Contact Info */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="text-slate-700">{resumeData.contact.location}</span>
                    </div>
                    
                    <a href={`mailto:${resumeData.contact.email}`} className="flex items-center group cursor-pointer">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-emerald-200 transition-colors">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-slate-700 group-hover:text-emerald-700 transition-colors">{resumeData.contact.email}</span>
                    </a>
                  </div>

                  {/* Top Skills */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-3">Core Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Node.js', 'TypeScript', 'AWS', 'Microservices'].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <a 
                      href="#contact" 
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-cyan-700 hover:to-blue-700 transition-colors cursor-pointer text-center block"
                    >
                                             Let&apos;s Connect
                    </a>
                  </div>
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
          
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-0.5 bg-cyan-200"></div>
            
            {resumeData.experience.map((job, index) => (
              <div key={index} className="relative flex items-center mb-16">
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                
                {/* Left Side - Date/Location */}
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <div className="text-lg font-semibold text-cyan-700 mb-1">
                      {job.date}
                    </div>
                    <div className="text-sm text-slate-600">
                      📍 {job.location || 'Remote'}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {job.type}
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Job Details */}
                <div className="w-1/2 pl-8">
                  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-slate-200 hover:border-cyan-400">
                    <button
                      onClick={() => toggleTimelineItem(index)}
                      className="w-full text-left focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 rounded-lg cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                          {job.role}
                        </h4>
                        <div className="flex items-center">
                          <span className="text-slate-600 font-medium mr-3">{job.company}</span>
                          <div className={`transform transition-transform duration-200 ${
                            expandedItems.includes(index) ? 'rotate-180' : ''
                          }`}>
                            <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-slate-500 mb-2">
                        <span className={`px-2 py-1 bg-cyan-100 text-cyan-700 rounded-md text-xs mr-2 ${
                          expandedItems.includes(index) ? 'opacity-100' : 'opacity-70'
                        }`}>
                          {expandedItems.includes(index) ? 'Click to collapse' : 'Click to expand'}
                        </span>
                      </div>
                    </button>
                    
                    {/* Expandable Content */}
                    <div className={`transition-all duration-300 overflow-hidden ${
                      expandedItems.includes(index) 
                        ? 'max-h-screen opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}>
                      <div className="pt-4 border-t border-slate-200 mt-4">
                        {/* Key Achievements */}
                        <div className="mb-6">
                          <h5 className="text-sm font-semibold text-slate-800 mb-3 flex items-center">
                            <svg className="w-4 h-4 text-cyan-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Key Achievements & Responsibilities
                          </h5>
                          <ul className="space-y-3">
                            {job.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start">
                                <div className="flex-shrink-0 w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3"></div>
                                <span className="text-slate-700 leading-relaxed">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Technologies */}
                        <div className="bg-gradient-to-r from-slate-50 to-cyan-50 p-4 rounded-lg border border-slate-200">
                          <h5 className="text-sm font-semibold text-slate-800 mb-3 flex items-center">
                            <svg className="w-4 h-4 text-cyan-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            Technologies & Tools
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {job.tech.map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="px-3 py-1.5 bg-white text-slate-700 text-sm rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-shadow font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
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
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                    className={`px-4 py-2 rounded-full font-medium transition-all cursor-pointer ${
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

        {/* Contact Section */}
        <section id="contact" className="mb-24 scroll-mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900">Let&apos;s Connect</h3>
            <p className="text-slate-600 mt-4">Ready to collaborate? Get in touch through any of these channels</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Location Card */}
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(resumeData.contact.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-slate-200 hover:border-cyan-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-cyan-700 transition-colors">Location</h4>
                  <p className="text-slate-600 group-hover:text-slate-700 transition-colors">{resumeData.contact.location}</p>
                  <p className="text-sm text-slate-500 mt-2 group-hover:text-cyan-600 transition-colors">View on Google Maps</p>
                </div>
              </a>

              {/* Email Card */}
              <a 
                href={`mailto:${resumeData.contact.email}`}
                className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-slate-200 hover:border-cyan-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">Email</h4>
                  <p className="text-slate-600 group-hover:text-slate-700 transition-colors">{resumeData.contact.email}</p>
                  <p className="text-sm text-slate-500 mt-2 group-hover:text-emerald-600 transition-colors">Send me a message</p>
                </div>
              </a>

              {/* LinkedIn Card */}
              <a 
                href={resumeData.contact.linkedin.startsWith('http') ? resumeData.contact.linkedin : `https://linkedin.com/in/${resumeData.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-slate-200 hover:border-blue-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">LinkedIn</h4>
                  <p className="text-slate-600 group-hover:text-slate-700 transition-colors">Professional Profile</p>
                  <p className="text-sm text-slate-500 mt-2 group-hover:text-blue-600 transition-colors">Connect with me</p>
                </div>
              </a>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
