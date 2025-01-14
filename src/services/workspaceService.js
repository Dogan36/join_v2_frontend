import { ref, computed } from 'vue';

export const workspaces = ref([]);
export const currentWorkspaceId = ref(null);

export const currentWorkspace = computed(() => {
  return workspaces.value.find(workspace => workspace.id === currentWorkspaceId.value);
});
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
  const savedWorkspaceId = parseInt(localStorage.getItem('currentWorkspaceId'), 10); // String in Zahl umwandeln
  if (savedWorkspaceId && workspaces.value.some(ws => ws.id === savedWorkspaceId)) {
    currentWorkspaceId.value = savedWorkspaceId;
  } else if (workspaces.value.length > 0) {
    currentWorkspaceId.value = workspaces.value[0].id;
    console.log(currentWorkspaceId.value);
  }
}

export function setCurrentWorkspace() {
  localStorage.setItem('currentWorkspaceId', currentWorkspaceId.value);
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
    currentWorkspaceId.value = newWorkspace.id; // Direkt als aktuellen Workspace setzen
    setCurrentWorkspace();
    console.log("Workspace erstellt:", newWorkspace);
  } catch (err) {
    console.error("Fehler beim Erstellen des Workspaces:", err);
  }
}