import React, { useState } from 'react';
import { Project } from '../types';
import { IconTrash, IconEdit, IconCheck, IconX } from './Icon';

interface ProjectCardProps {
  project: Project;
  isAuthenticated: boolean;
  onDeleteProject: (id: number) => void;
  onUpdateProject: (id: number, updates: Partial<Project>) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  isAuthenticated, 
  onDeleteProject, 
  onUpdateProject 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(project.title);
  const [editDescription, setEditDescription] = useState(project.description);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(project.title);
    setEditDescription(project.description);
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(project.title);
    setEditDescription(project.description);
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: { title?: string; description?: string } = {};
    
    if (!editTitle.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!editDescription.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const updates: Partial<Project> = {};
    
    if (editTitle !== project.title) {
      updates.title = editTitle;
    }
    
    if (editDescription !== project.description) {
      updates.description = editDescription;
    }
    
    if (Object.keys(updates).length > 0) {
      onUpdateProject(project.id, updates);
    }
    
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="p-6 relative group">
      {isAuthenticated && !isEditing && (
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={handleEdit}
            className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-600 transition-all"
            aria-label="Edit project"
          >
            <IconEdit className="h-5 w-5" />
          </button>
          <button 
            onClick={() => onDeleteProject(project.id)}
            className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-600 transition-all"
            aria-label="Delete project"
          >
            <IconTrash className="h-5 w-5" />
          </button>
        </div>
      )}

      {isAuthenticated && isEditing && (
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={handleSave}
            className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-all"
            aria-label="Save changes"
          >
            <IconCheck className="h-5 w-5" />
          </button>
          <button 
            onClick={handleCancel}
            className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-600 transition-all"
            aria-label="Cancel editing"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="flex-1">
        {isEditing ? (
          <div className="space-y-4" onKeyDown={handleKeyDown}>
            <div>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className={`w-full text-lg font-bold bg-white border rounded-md px-3 py-2 focus:ring-2 focus:ring-linkedin-blue focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="Project title"
                autoFocus
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            
            <div>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className={`w-full text-sm bg-white border rounded-md px-3 py-2 focus:ring-2 focus:ring-linkedin-blue focus:border-transparent resize-none ${
                  errors.description ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="Project description"
                rows={4}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold text-slate-800">{project.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">{project.description}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;