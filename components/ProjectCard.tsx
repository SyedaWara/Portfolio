import React from 'react';
import { Project } from '../types';
import { IconTrash } from './Icon';

interface ProjectCardProps {
  project: Project;
  isAuthenticated: boolean;
  onDeleteProject: (id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isAuthenticated, onDeleteProject }) => {
    console.log(project);
  return (
    <div className="p-6 relative group">
      {isAuthenticated && (
          <button 
              onClick={() => onDeleteProject(project.id)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Delete project"
          >
              <IconTrash className="h-5 w-5" />
          </button>
      )}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-slate-800">{project.title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;