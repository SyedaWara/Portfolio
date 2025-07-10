import React, { useState } from 'react';
import { Project } from '../types';

type ProjectFormData = Omit<Project, 'id'>;

interface AddProjectFormProps {
    onAddProject: (projectData: ProjectFormData) => void;
    onCancel: () => void;
}

const initialFormState: ProjectFormData = {
    title: '',
    description: ''
};

const AddProjectForm: React.FC<AddProjectFormProps> = ({ onAddProject, onCancel }) => {
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState<Partial<Record<keyof ProjectFormData, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = (): boolean => {
        const newErrors: typeof errors = {};
        if (!formData.title.trim()) newErrors.title = "Title is required.";
        if (!formData.description.trim()) newErrors.description = "Description is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        onAddProject({
            ...formData
        });
        setFormData(initialFormState); // Clear form on submit
    };

    const renderInput = (name: 'title', label: string) => (
         <div>
            <label htmlFor={name} className="block text-sm font-medium leading-6 text-slate-900">
                {label}
            </label>
            <div className="mt-2">
                <input
                    type="text"
                    name={name}
                    id={name}
                    value={formData[name] || ''}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-linkedin-blue sm:text-sm sm:leading-6"
                />
                {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
            </div>
        </div>
    );
    const renderTextarea = (name: 'description', label: string) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium leading-6 text-slate-900">
                {label}
            </label>
            <div className="mt-2">
                <textarea
                    name={name}
                    id={name}
                    rows={4}
                    value={formData[name]}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-linkedin-blue sm:text-sm sm:leading-6"
                />
                {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
            </div>
        </div>
    );

    return (
        <div className="bg-slate-50 p-6 border-t border-b border-slate-200 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-lg font-bold text-slate-800">Add New Project</h3>
                {renderInput('title', 'Project Title')}
                {renderTextarea('description', 'Description')}
                <div className="flex justify-end gap-4">
                    <button type="button" onClick={onCancel} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
                        Cancel
                    </button>
                    <button type="submit" className="rounded-full bg-linkedin-blue px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
                        Save Project
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProjectForm;