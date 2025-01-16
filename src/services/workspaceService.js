import { ref, computed } from 'vue';

export const workspaces = ref([]);
export const currentWorkspace = ref(null);


import { API_BASE_URL } from '@/config';

export async function loadWorkspaces() {
  try {
    const token = localStorage.getItem('join_token');
    if (!token) throw new Error("Kein Token gefunden. Der Benutzer ist nicht authentifiziert.");

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

    const data = await response.json();
    if (!data.length) {
      console.warn("Keine Workspaces gefunden");
      return;
    }

    workspaces.value = data;
    console.log("Workspaces geladen:", workspaces.value);
    loadCurrentWorkspace();
  } catch (err) {
    console.error("Fehler beim Laden der Workspaces:", err);
  }
}

export function loadCurrentWorkspace() {
  const savedWorkspace = parseInt(localStorage.getItem('currentWorkspace'));
  if (savedWorkspace && workspaces.value.some(ws => ws.id === savedWorkspace)) {
    currentWorkspace.value = savedWorkspace;
  } else if (workspaces.value.length > 0) {
    currentWorkspace.value = workspaces.value[0];
    console.log(currentWorkspace.value);
  }
}

export function setCurrentWorkspace() {
  localStorage.setItem('currentWorkspace', currentWorkspace.value);
}

export async function createWorkspace(name) {
  try {
    const token = localStorage.getItem('join_token');
    if (!token) throw new Error("Kein Token gefunden. Der Benutzer ist nicht authentifiziert.");

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

    const newWorkspace = await response.json();
    workspaces.value.push(newWorkspace); // Neuen Workspace zur Liste hinzufügen
    currentWorkspace.value = newWorkspace; // Direkt als aktuellen Workspace setzen
    setCurrentWorkspace();
    console.log("Workspace erstellt:", newWorkspace);
  } catch (err) {
    console.error("Fehler beim Erstellen des Workspaces:", err);
  }
}