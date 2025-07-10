import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="w-10 h-10 rounded-full animate-spin border-4 border-dashed border-linkedin-blue border-t-transparent"></div>
      <p className="text-slate-600 font-medium">AI is analyzing...</p>
    </div>
  );
};

export default Loader;