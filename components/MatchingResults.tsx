import React from 'react';
import { Project } from '../types';
import ProjectCard from './ProjectCard';

interface MatchingResultsProps {
  summary: string;
  matchedProjects: Project[];
}

const MatchingResults: React.FC<MatchingResultsProps> = ({ summary, matchedProjects }) => {
  // Empty function for matched projects since they shouldn't be editable in this context
  const handleUpdateProject = () => {
    // No-op: Projects in matching results are read-only
  };

  const handleDeleteProject = () => {
    // No-op: Projects in matching results are read-only
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200">
      <div className="p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">AI Analysis Results</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Why You're a Great Fit</h3>
          <p className="text-slate-600 leading-relaxed">{summary}</p>
        </div>

        {matchedProjects.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              Relevant Projects ({matchedProjects.length})
            </h3>
            <div className="space-y-4">
              {matchedProjects.map(project => (
                <div key={project.id} className="border border-slate-200 rounded-lg">
                  <ProjectCard 
                    project={project}
                    isAuthenticated={false} // Always false in matching results
                    onUpdateProject={handleUpdateProject}
                    onDeleteProject={handleDeleteProject}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {matchedProjects.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-500">No specific projects matched this job description.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchingResults;