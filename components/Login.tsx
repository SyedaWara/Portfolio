import React, { useState } from 'react';

interface LoginProps {
  onLogin: (password: string) => Promise<boolean>;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const success = await onLogin(password);
      if (!success) {
        setError('Invalid password. Please try again.');
        setPassword('');
      }
    } catch (err) {
       setError('Login failed. Could not connect to the server.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm m-4 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 text-2xl" aria-label="Close">&times;</button>
        <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">Admin Login</h2>
        <p className="text-slate-600 text-center mb-6">Enter the password to manage portfolio content.</p>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="password-admin" className="sr-only">
                Password
              </label>
              <input
                id="password-admin"
                name="password"
                type="password"
                className="block w-full rounded-md border-slate-300 shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-linkedin-blue sm:text-sm sm:leading-6 p-3 transition duration-200"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoFocus
              />
            </div>
             {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-x-2 rounded-full bg-linkedin-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
