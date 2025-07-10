import React from 'react';
import { Project } from '../types';
import ProjectCard from './ProjectCard';

interface MatchingResultsProps {
  summary: string;
  matchedProjects: Project[];
}

const MatchingResults: React.FC<MatchingResultsProps> = ({ summary, matchedProjects }) => {
  
  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 animate-fade-in">
      <div className="p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            AI Match Analysis
          </h3>
          <div className="bg-blue-50 border-l-4 border-linkedin-blue p-4 rounded-r-md">
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{summary}</p>
          </div>
      </div>
      

      {matchedProjects.length > 0 && (
        <div>
          <div className="px-6 pb-4">
            <h3 className="text-lg font-bold text-slate-800">
                Relevant Projects
            </h3>
          </div>
          <div className="divide-y divide-slate-200">
            {matchedProjects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project}
                // These props are not needed for the read-only view
                isAuthenticated={false}
                onDeleteProject={() => {}}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchingResults;
