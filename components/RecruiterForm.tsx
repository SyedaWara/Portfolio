import React, { useState } from 'react';

interface RecruiterFormProps {
  onAnalyze: (jobDescription: string) => void;
  isLoading: boolean;
}

const RecruiterForm: React.FC<RecruiterFormProps> = ({ onAnalyze, isLoading }) => {
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;
    onAnalyze(jobDescription);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="job-description" className="sr-only">
            Job Description
          </label>
          <textarea
            id="job-description"
            name="job-description"
            rows={8}
            className="block w-full rounded-md border-slate-300 shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-linkedin-blue sm:text-sm sm:leading-6 p-3 transition duration-200"
            placeholder="Paste the full job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !jobDescription.trim()}
            className="inline-flex items-center justify-center gap-x-2 rounded-full bg-linkedin-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Analyzing...' : 'Analyze & Match'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default RecruiterForm;