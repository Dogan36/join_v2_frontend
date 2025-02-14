import { API_BASE_URL } from '@/config';

const getToken = () => localStorage.getItem('join_token');

/**
 * Fetches the list of tasks for a specific workspace.
 * 
 * @async
 * @param {number} workspaceId - The ID of the workspace to fetch tasks from.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of task objects.
 * @throws {Error} If the request fails.
 */
async function fetchTasks(workspaceId) {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/${workspaceId}/tasks/`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetches the list of categories for a specific workspace.
 * 
 * @async
 * @param {number} workspaceId - The ID of the workspace to fetch categories from.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of category objects.
 */
async function fetchCategories(workspaceId) {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/${workspaceId}/categories/`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export { fetchTasks, fetchCategories };
