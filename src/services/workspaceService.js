import { API_BASE_URL } from '@/config';

const getToken = () => localStorage.getItem('join_token');

async function fetchWorkspaceById(workspaceId) {
    console.log("fetchWorkspaceById");
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/${workspaceId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Fehler beim Laden des Workspace: ${response.statusText}`);
    }
    return response.json();
  }
  
  async function fetchFirstWorkspace() {
    const token = localStorage.getItem('join_token');
    const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/first_member_workspace/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Überprüfe den Statuscode der Antwort, nicht nur, ob er gleich 404 ist
    if (!response.ok) {
      console.error('Failed to fetch the first workspace:', response.statusText);
      return null; // oder eine angemessene Fehlerbehandlung durchführen
    }

    // Prüfen, ob die Antwort leer ist
    const text = await response.text(); // Erst den Text aus der Antwort holen
    if (!text) {
      
      return null; // Frühzeitig zurückkehren, wenn keine Daten vorhanden sind
    }

    // Parsen des Textes zu JSON, wenn Inhalt vorhanden ist
    return JSON.parse(text);
}

async function fetchWorkspaces() {
  console.log("fetchWorkspaces");
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/`, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Fehler beim Laden der Workspaces: ${response.statusText}`);
  }
  return response.json();
}

async function createWorkspace(name) {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error(`Fehler beim Erstellen des Workspaces: ${response.statusText}`);
  }
  return response.json();
}


async function leaveWorkspace(token, workspaceId) {
    const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/leave/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ workspace_id: workspaceId })
    });
  
    if (!response.ok) {
      throw new Error(`Fehler beim Verlassen des Workspaces: ${response.status}`);
    }
    return response.json();
  }

async function deleteWorkspace(token, workspaceId) {
    const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/delete-workspace/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ workspace_id: workspaceId })
    });
  
    if (!response.ok) {
      throw new Error(`Fehler beim Löschen des Workspaces: ${response.statusText}`);
    }
    return response.json();
  }

  async function invitePerEmail(email, join_code) {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/workspaces/invite/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, join_code }),
    });
  
    if (!response.ok) {
      throw new Error(`Fehler beim Einladen des Benutzers: ${response.statusText}`);
    }
    return response.json();
  }
// Füge hier zusätzliche Funktionen hinzu wie joinWorkspace, leaveWorkspace, deleteWorkspace, usw.

export { 
  fetchWorkspaces, 
  fetchWorkspaceById, 
  fetchFirstWorkspace, 
  createWorkspace, 
  leaveWorkspace, 
  deleteWorkspace, 
  invitePerEmail };