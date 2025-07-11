import React, { useState } from 'react';
import { Skill } from '../types';
import { IconDownload, IconEnvelope, IconPhone, IconPlus, IconX,IconGitHub  } from './Icon';

interface AboutProps {
  skills: Skill[];
  isAuthenticated: boolean;
  onAddSkill: (skillName: string) => void;
  onDeleteSkill: (skillId: number) => void;
}

const About: React.FC<AboutProps> = ({ skills, isAuthenticated, onAddSkill, onDeleteSkill }) => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showAddSkillForm, setShowAddSkillForm] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');

  const handleAddSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillName.trim()) {
      onAddSkill(newSkillName.trim());
      setNewSkillName('');
      setShowAddSkillForm(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
      {/* Banner */}
      <div className="h-24 bg-slate-200">
         <img 
            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop"
            alt="Profile banner"
            className="w-full h-full object-cover"
        />
      </div>
      
      {/* Profile Pic & Name */}
      <div className="px-6 pb-6 relative">
         <img 
            src="/wara1.jpg"
            alt="Profile Avatar" 
            className="w-28 h-28 rounded-full mx-auto -mt-14 border-4 border-white bg-white shadow-md"
        />
        <div className="text-center mt-4">
          <h1 className="text-2xl font-bold text-slate-800">
            Syeda Wara Batool
          </h1>
          <p className="mt-1 text-md text-slate-600">National University of Computers And Emerging Sciences (FAST) BS in Computer Science (Sept 2021 – June 2025)</p>
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-slate-200">
        <h3 className="font-bold text-slate-800 mb-2">About</h3>
        <p className="text-sm leading-6 text-slate-600">
          Motivated and detail-oriented software developer with hands-on experience in mobile app development, deep learning, and data science. Passionate about artificial intelligence and committed to leveraging technology to build innovative and impactful solutions. I have a strong foundation in software development and a growing interest in Software Quality Assurance (SQA), aiming to contribute to reliable, user-friendly applications through rigorous testing and continuous improvement. Eager to join a dynamic team where I can grow, collaborate, and make meaningful contributions across AI, data-driven projects, and development workflows.
          </p>
      </div>
      
      <div className="px-6 py-4 border-t border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800">Core Skills</h3>
          {isAuthenticated && (
            <button 
              onClick={() => setShowAddSkillForm(prev => !prev)} 
              className="p-1 rounded-full hover:bg-slate-200 transition-colors"
              aria-label="Add new skill"
            >
              <IconPlus className="h-5 w-5 text-linkedin-blue" />
            </button>
          )}
        </div>

        {isAuthenticated && showAddSkillForm && (
          <form onSubmit={handleAddSkillSubmit} className="mb-4 flex gap-2 animate-fade-in">
            <input 
              type="text" 
              value={newSkillName} 
              onChange={(e) => setNewSkillName(e.target.value)} 
              placeholder="Add a new skill"
              className="block w-full rounded-md border-0 py-1.5 px-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-linkedin-blue sm:text-sm"
              autoFocus
            />
            <button type="submit" className="rounded-full bg-linkedin-blue px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
              Save
            </button>
          </form>
        )}

        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <span key={skill.id} className="group relative bg-sky-100 text-sky-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              {skill.name}
              {isAuthenticated && (
                <button
                  onClick={() => onDeleteSkill(skill.id)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Delete ${skill.name}`}
                >
                   <IconX className="h-3 w-3" />
                </button>
              )}
            </span>
          ))}
        </div>
      </div>
      
      {showContactInfo && (
        <div className="px-6 py-4 border-t border-slate-200 animate-fade-in">
          <h3 className="font-bold text-slate-800 mb-4">Contact Information</h3>
          <div className="space-y-3">
            <a href="mailto:syedawarab@gmail.com" className="flex items-center gap-3 text-slate-600 hover:text-linkedin-blue group transition-colors duration-200">
              <IconEnvelope className="h-5 w-5 text-slate-400 group-hover:text-linkedin-blue transition-colors duration-200" />
              <span className="text-sm font-medium">syedawarab@gmail.com</span>
            </a>
            <div className="flex items-center gap-3 text-slate-600">
              <IconPhone className="h-5 w-5 text-slate-400" />
              <span className="text-sm font-medium">+923343466075</span>
            </div>
            <a
        href="https://www.linkedin.com/in/syedawarabatool/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-slate-600 hover:text-linkedin-blue group transition-colors duration-200"
      >
        {/* You can use an SVG or your Icon component for LinkedIn */}
        <svg className="h-5 w-5 text-slate-400 group-hover:text-linkedin-blue transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v4.74z"/>
        </svg>
        <span className="text-sm font-medium">https://www.linkedin.com/in/wara-batool-83047023a/</span>
      </a>
      <a
  href="https://github.com/SyedaWara"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-3 text-slate-600 hover:text-linkedin-blue group transition-colors duration-200"
>
  <IconGitHub className="h-5 w-5 text-slate-400 group-hover:text-linkedin-blue transition-colors duration-200" />
  <span className="text-sm font-medium">github.com/SyedaWara</span>
</a>
          </div>
        </div>
      )}


      <div className="p-6 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
        <a 
          href="https://drive.google.com/file/d/14atlBSCikMp-Co_ll1bAWKcf6PG61OsS/view?usp=drive_link" 
          download
          className="w-full text-center inline-flex items-center justify-center gap-x-2 rounded-full bg-linkedin-blue px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700"
        >
          <IconDownload className="h-4 w-4" />
          Download Resume
        </a>
         <button
          type="button"
          onClick={() => setShowContactInfo(prev => !prev)}
          className="w-full text-center inline-flex items-center justify-center gap-x-2 rounded-full border border-linkedin-blue px-4 py-2 text-sm font-semibold text-linkedin-blue shadow-sm transition-colors duration-200 hover:bg-blue-50"
        >
          {showContactInfo ? 'Hide Info' : 'Contact Info'}
        </button>
      </div>
    </div>
  );
};

export default About;
