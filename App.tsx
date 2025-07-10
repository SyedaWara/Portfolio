import React from 'react';
import { useState, useEffect } from 'react';
import { Project, MatchResult, Skill } from './types';
import { findMatchingProjects } from './services/geminiService';
import * as apiService from './services/apiService';
import About from './components/About';
import Projects from './components/Projects';
import RecruiterForm from './components/RecruiterForm';
import MatchingResults from './components/MatchingResults';
import Loader from './components/Loader';
import Login from './components/Login';
import { IconLogout, IconUserShield } from './components/Icon';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [appIsLoading, setAppIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setAppIsLoading(true);
        setError(null);
        const [fetchedProjects, fetchedSkills] = await Promise.all([
          apiService.getProjects(),
          apiService.getSkills()
        ]);
        setProjects(fetchedProjects);
        setSkills(fetchedSkills);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load portfolio data. Is the backend server running?');
      } finally {
        setAppIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleAnalysis = async (jobDescription: string) => {
    setIsAiLoading(true);
    setError(null);
    setMatchResult(null);

    try {
      const result = await findMatchingProjects(jobDescription, projects);
      setMatchResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during AI analysis.');
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const getMatchedProjects = (): Project[] => {
    if (!matchResult) return [];
    // The AI returns string IDs, so we need to compare them to number IDs.
    const matchedIds = new Set(matchResult.matchedProjectIds.map(id => parseInt(id, 10)));
    return projects.filter(p => matchedIds.has(p.id));
  };
  
const handleLogin = async (password: string): Promise<boolean> => {
  try {
    const response = await fetch("http://localhost:5000/api/Auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success === true) {
        setIsAuthenticated(true);     // ✅ set user as authenticated
        setShowLogin(false);          // ✅ close the modal
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};



  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleAddProject = async (projectData: Omit<Project, 'id' >) => {
    try {
      const newProject = await apiService.addProject(projectData);
      setProjects(prevProjects => [newProject, ...prevProjects]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add project.');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await apiService.deleteProject(id);
      setProjects(prevProjects => prevProjects.filter(p => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project.');
    }
  };

  const handleAddSkill = async (skillName: string) => {
    if (skillName && !skills.some(s => s.name === skillName)) {
      try {
        const newSkill = await apiService.addSkill(skillName);
        setSkills(prevSkills => [...prevSkills, newSkill]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add skill.');
      }
    }
  };

  const handleDeleteSkill = async (id: number) => {
    try {
      await apiService.deleteSkill(id);
      setSkills(prevSkills => prevSkills.filter(s => s.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete skill.');
    }
  };

  if (appIsLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
         {error && !isAiLoading && <div className="mb-4 text-center text-red-600 bg-red-100 p-4 rounded-lg border border-red-200">{error}</div>}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            <About 
              isAuthenticated={isAuthenticated}
              skills={skills}
              onAddSkill={handleAddSkill}
              onDeleteSkill={handleDeleteSkill}
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-md border border-slate-200">
              <div className="p-6">
                 <h2 className="text-xl font-bold text-slate-800 mb-1">Recruiter AI Matcher</h2>
                 <p className="text-slate-600 mb-6">
                    Paste a job description below. My AI assistant will analyze it against my projects and tell you why I'm a great fit.
                 </p>
                <RecruiterForm onAnalyze={handleAnalysis} isLoading={isAiLoading} />
              </div>
            </div>

            <div className="min-h-[10rem]">
                {isAiLoading && <Loader />}
                {error && isAiLoading && <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg border border-red-200">{error}</div>}
                {matchResult && (
                  <MatchingResults 
                    summary={matchResult.suitabilitySummary}
                    matchedProjects={getMatchedProjects()}
                  />
                )}
            </div>

             <Projects 
                projects={projects} 
                isAuthenticated={isAuthenticated}
                onAddProject={handleAddProject}
                onDeleteProject={handleDeleteProject}
             />
          </div>
        </div>
      </main>

       {showLogin && <Login onLogin={handleLogin} onClose={() => setShowLogin(false)} />}

       <footer className="text-center py-6 text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} WB. All rights reserved.</p>
        <div className="mt-2">
            {isAuthenticated ? (
                 <button onClick={handleLogout} className="inline-flex items-center gap-2 text-slate-500 hover:text-linkedin-blue font-semibold">
                    <IconLogout className="h-4 w-4" />
                    Admin Logout
                </button>
            ) : (
                <button onClick={() => setShowLogin(true)} className="inline-flex items-center gap-2 text-slate-500 hover:text-linkedin-blue font-semibold">
                    <IconUserShield className="h-4 w-4" />
                    Admin Login
                </button>
            )}
        </div>
      </footer>
    </div>
  );
};

export default App;
