import { API_BASE_URL } from '@/config';

async function fetchTasks(workspaceId) {
    const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/tasks`);
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }
    return response.json();
  }
  
async function fetchMembers(workspaceId) {
    const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/members`);
    if (!response.ok) {
      throw new Error(`Failed to fetch members: ${response.statusText}`);
    }
    return response.json();
  }

async function fetchSubtasks(workspaceId) {
    const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/subtasks`);
    if (!response.ok) {
      throw new Error(`Failed to fetch subtasks: ${response.statusText}`);
    }
    return response.json();
  }

async function fetchCategories(workspaceId) {
    const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/categories`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    return response.json();
  }

export { fetchTasks, fetchMembers, fetchSubtasks, fetchCategories };