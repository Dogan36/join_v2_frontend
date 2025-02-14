import { API_BASE_URL } from '@/config';

const getToken = () => localStorage.getItem('join_token');

/**
 * Fetches a workspace by its ID.
 * 
 * @async
 * @param {number} workspaceId - The ID of the workspace to fetch.
 * @returns {Promise<Object>} A promise that resolves to the workspace object.
 * @throws {Error} If the request fails.
 */
async function fetchWorkspaceById(workspaceId) {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/${workspaceId}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching workspace: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetches the first available workspace for the current user.
 * 
 * @async
 * @returns {Promise<Object|null>} A promise that resolves to the first workspace object or null if none exist.
 */
async function fetchFirstWorkspace() {
  const token = localStorage.getItem("join_token");
  const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/first_member_workspace/`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch the first workspace:", response.statusText);
    return null;
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  return JSON.parse(text);
}

/**
 * Fetches all workspaces available to the user.
 * 
 * @async
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of workspace objects.
 * @throws {Error} If the request fails.
 */
async function fetchWorkspaces() {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching workspaces: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Creates a new workspace.
 * 
 * @async
 * @param {string} name - The name of the new workspace.
 * @returns {Promise<Object>} A promise that resolves to the created workspace object.
 * @throws {Error} If the request fails.
 */
async function createWorkspace(name) {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error(`Error creating workspace: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Allows the user to leave a workspace.
 * 
 * @async
 * @param {string} token - The authentication token of the user.
 * @param {number} workspaceId - The ID of the workspace to leave.
 * @returns {Promise<Object>} A promise that resolves when the workspace has been left.
 * @throws {Error} If the request fails.
 */
async function leaveWorkspace(token, workspaceId) {
  const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/leave/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ workspace_id: workspaceId }),
  });

  if (!response.ok) {
    throw new Error(`Error leaving workspace: ${response.status}`);
  }
  return response.json();
}

/**
 * Deletes a workspace.
 * 
 * @async
 * @param {string} token - The authentication token of the user.
 * @param {number} workspaceId - The ID of the workspace to delete.
 * @returns {Promise<Object>} A promise that resolves when the workspace is deleted.
 * @throws {Error} If the request fails.
 */
async function deleteWorkspace(token, workspaceId) {
  const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/delete-workspace/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ workspace_id: workspaceId }),
  });

  if (!response.ok) {
    throw new Error(`Error deleting workspace: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Sends an invitation email to join a workspace using a join code.
 * 
 * @async
 * @param {string} email - The email address of the invitee.
 * @param {string} join_code - The join code for the workspace.
 * @returns {Promise<Object>} A promise that resolves when the invitation is successfully sent.
 * @throws {Error} If the request fails.
 */
async function invitePerEmail(email, join_code) {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/workspaces/invite/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, join_code }),
  });

  if (!response.ok) {
    throw new Error(`Error inviting user: ${response.statusText}`);
  }
  return response.json();
}

export { 
  fetchWorkspaces, 
  fetchWorkspaceById, 
  fetchFirstWorkspace, 
  createWorkspace, 
  leaveWorkspace, 
  deleteWorkspace, 
  invitePerEmail 
};