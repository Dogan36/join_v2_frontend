import { API_BASE_URL } from '@/config';

const getToken = () => localStorage.getItem('join_token');

async function fetchTasks(workspaceId) {
  const token = getToken();
  // Füge die workspaceId in die URL ein, um die Aufgaben dieses spezifischen Workspaces abzurufen
  const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/${workspaceId}/tasks/`, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }
  return response.json();
}


async function fetchCategories(workspaceId) {
    console.log("fetchCategories");
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/${workspaceId}/categories/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

export { fetchTasks, fetchCategories };