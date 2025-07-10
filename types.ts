export interface Project {
  id: number;
  title: string;
  description: string;
  //tags: string[];
  //githubUrl?: string;
 // demoUrl?: string;
  //aiSummary: string;
}

export interface Skill {
  id: number;
  name: string;
}

export interface MatchResult {
  matchedProjectIds: string[];
  suitabilitySummary: string;
}
