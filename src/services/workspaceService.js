import { ref, computed } from 'vue';

import { useLoadingOverlay } from '@/composables/useLoadingOverlay';
import { useConfirmationOverlay } from "@/composables/useConfirmationOverlay";
import { isWorkspaceOverlayVisible } from '@/store/state';
const { showOverlay, hideOverlay } = useLoadingOverlay();
const { showConfirmation } = useConfirmationOverlay();

import { API_BASE_URL } from '@/config';

export const workspaces = ref([]);
export const currentWorkspace = ref(null);

export function determineInitialWorkspace() {
  const currentWorkspaceId = localStorage.getItem('currentWorkspaceId');
  if (currentWorkspaceId) {
    console.log("Lade Workspace mit ID", currentWorkspaceId);
    loadCurrentWorkspace(currentWorkspaceId);
  } else {
    loadFirstWorkspace();
  }
}

export async function loadCurrentWorkspace(currentWorkspaceId) {
  try {
    const token = localStorage.getItem('join_token');
    if (!token) throw new Error("Kein Token gefunden. Der Benutzer ist nicht authentifiziert.");

    const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/${currentWorkspaceId}`, {
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
    console.log("Workspace geladen:", data);
    if (!data) {
      console.warn("Keine Workspaces gefunden");
      return;
    }
    currentWorkspace.value = data;
    console.log("Workspaces geladen:", workspaces.value);
    
  } catch (err) {
    console.error("Fehler beim Laden der Workspaces:", err);
  }
}

export async function loadFirstWorkspace() {
  try {
    const token = localStorage.getItem('join_token');
    if (!token) throw new Error("Kein Token gefunden. Der Benutzer ist nicht authentifiziert.");

    const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/first_member_workspace/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Prüfe zuerst, ob die Antwort erfolgreich war.
    if (!response.ok) {
      throw new Error(`Fehler beim Laden des Workspaces: ${response.statusText}`);
    }

    // Prüfe, ob die Antwort Inhalt hat, bevor du versuchst, sie als JSON zu parsen.
    const text = await response.text();  // Erst die Antwort als Text holen
    if (!text) {
      isWorkspaceOverlayVisible.value = true;
      currentWorkspace.value = null;
      return;  // Frühzeitiger Rückkehr, wenn kein Inhalt vorhanden ist.
    }

    const data = JSON.parse(text);  // Parsen des Textes zu JSON, wenn Inhalt vorhanden ist
    console.log('Workspace geladen:', data);
    currentWorkspace.value = data;

  } catch (err) {
    console.error("Fehler beim Laden des ersten Workspaces:", err);
    currentWorkspace.value = null;
  }
}

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


export function setCurrentWorkspace() {
  if (currentWorkspace.value && currentWorkspace.value.id) {
    localStorage.setItem('currentWorkspaceId', currentWorkspace.value.id.toString());
  }
}

export async function createWorkspace(name) {
  showOverlay();
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
    currentWorkspace.value = newWorkspace;
    showConfirmation(`Workspace "${newWorkspace.name}" erfolgreich erstellt.`); // Direkt als aktuellen Workspace setzen
    setCurrentWorkspace();
  } catch (err) {
    console.error("Fehler beim Erstellen des Workspaces:", err);
  }
  finally {
    hideOverlay();
  }
}

export async function deleteWorkspace(workspaceId) {
  try {
    const token = localStorage.getItem('join_token');
    if (!token) throw new Error("Kein Token gefunden. Der Benutzer ist nicht authentifiziert.");

    const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/${workspaceId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Fehler beim Löschen des Workspaces: ${response.statusText}`);
    }

    const deletedWorkspace = workspaces.value.find(ws => ws.id === workspaceId);
    workspaces.value = workspaces.value.filter(ws => ws.id !== workspaceId); // Workspace aus der Liste entfernen
    console.log("Workspace gelöscht:", deletedWorkspace);
    return { success: true, workspace: deletedWorkspace };
  } catch (err) {
    console.error("Fehler beim Löschen des Workspaces:", err);
  }
}

export const changeWorkspace = (workspace) => {
  currentWorkspace.value = workspace;
  setCurrentWorkspace();
}

