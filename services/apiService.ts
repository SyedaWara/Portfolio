import { Project, Skill } from "../types";

const API_BASE_URL = 'http://localhost:5000/api';

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }
    // Handle cases where the response body might be empty (e.g., 204 No Content)
    const text = await response.text();
    if (!text) {
        throw new Error('Response body is empty');
    }
    return JSON.parse(text) as T;
}

// Auth
export async function login(password: string): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/Auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
    });
    return response.ok;
}

// Projects
export async function getProjects(): Promise<Project[]> {
    const response = await fetch(`${API_BASE_URL}/Projects`);
    return handleResponse<Project[]>(response);
}

export async function addProject(projectData: Omit<Project, 'id'> ): Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/Projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...projectData,
           // tags: projectData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        }),
    });
    return handleResponse<Project>(response);
}

export async function deleteProject(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/Projects/${id}`, {
        method: 'DELETE',
    });
    await handleResponse<void>(response);
}

// Skills
export async function getSkills(): Promise<Skill[]> {
    const response = await fetch(`${API_BASE_URL}/Skills`);
    return handleResponse<Skill[]>(response);
}

export async function addSkill(name: string): Promise<Skill> {
    const response = await fetch(`${API_BASE_URL}/Skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    });
    return handleResponse<Skill>(response);
}

export async function deleteSkill(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/Skills/${id}`, {
        method: 'DELETE',
    });
    await handleResponse<void>(response);
}
