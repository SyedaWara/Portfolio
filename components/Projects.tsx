import React, { useState } from 'react';
import { Project } from '../types';
import ProjectCard from './ProjectCard';
import AddProjectForm from './AddProjectForm';
import { IconPlus } from './Icon';

interface ProjectsProps {
  projects: Project[];
  isAuthenticated: boolean;
  onAddProject: (projectData: Omit<Project, 'id' >) => void;
  onUpdateProject: (id: number, updates: Partial<Project>) => void;
  onDeleteProject: (id: number) => void;
}

const Projects: React.FC<ProjectsProps> = ({ 
  projects, 
  isAuthenticated, 
  onAddProject, 
  onUpdateProject, 
  onDeleteProject 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProjectSubmit = (projectData: Omit<Project, 'id'> ) => {
    onAddProject(projectData);
    setShowAddForm(false); // Hide form on successful submission
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200">
        <div className="p-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Projects</h2>
            {isAuthenticated && !showAddForm && (
                <button 
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center justify-center gap-x-2 rounded-full bg-linkedin-blue px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700"
                >
                    <IconPlus className="h-4 w-4" />
                    Add Project
                </button>
            )}
        </div>
        
        {isAuthenticated && showAddForm && (
            <AddProjectForm 
                onAddProject={handleAddProjectSubmit}
                onCancel={() => setShowAddForm(false)}
            />
        )}

        <div className="divide-y divide-slate-200">
            {projects.map(project => (
                <ProjectCard 
                    key={project.id} 
                    project={project}
                    isAuthenticated={isAuthenticated}
                    onUpdateProject={onUpdateProject}
                    onDeleteProject={onDeleteProject}
                />
            ))}
             {projects.length === 0 && !isAuthenticated && (
                <p className="p-6 text-slate-500">No projects to show yet.</p>
            )}
             {projects.length === 0 && isAuthenticated && (
                <p className="p-6 text-slate-500">No projects yet. Click "Add Project" to get started.</p>
            )}
        </div>
    </div>
  );
};

export default Projects;