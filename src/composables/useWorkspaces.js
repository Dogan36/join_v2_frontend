import { ref, watch } from 'vue';
import { fetchWorkspaces, 
        createWorkspace as createWorkspaceAPI, 
        fetchWorkspaceById, 
        fetchFirstWorkspace, 
        deleteWorkspace as deleteWorkspaceAPI, 
        leaveWorkspace as leaveWorkspaceAPI,
        invitePerEmail as invitePerEmailAPI} 
        from '@/services/workspaceService';
import { useConfirmationOverlay } from './useConfirmationOverlay';
import { useLoadingOverlay } from './useLoadingOverlay';
import useWorkspaceData from './useWorkspaceData';
import { getToken, currentWorkspace, workspaces } from '@/store/state';
const token = getToken();
const { loadWorkspaceData } = useWorkspaceData();




export default function useWorkspaces() {
  const { showConfirmation } = useConfirmationOverlay();  
  const { showOverlay, hideOverlay } = useLoadingOverlay();

  const determineInitialWorkspace = async () => {
    if (token) {
    const currentWorkspaceId = Number(localStorage.getItem('currentWorkspaceId'));
    if (currentWorkspaceId) {
      const foundWorkspace = workspaces.value.find(ws => ws.id === currentWorkspaceId);
      if (foundWorkspace) {
        currentWorkspace.value = await fetchWorkspaceById(currentWorkspaceId);
      } else {
        console.warn("Kein Workspace mit der gespeicherten ID gefunden, lade ersten verfügbaren Workspace.");
        currentWorkspace.value = await fetchFirstWorkspace();

      }
    } else {
      currentWorkspace.value = await fetchFirstWorkspace();
    }
  }
  };

  

  const loadCurrentWorkspace = async (workspaceId) => {
    try {
      const workspace = await fetchWorkspaceById(workspaceId);
      if (!workspace) {
        console.warn("Kein Workspace gefunden");
        currentWorkspace.value = null;
        return;
      }
      currentWorkspace.value = workspace;
    } catch (err) {
      console.error("Fehler beim Laden des Workspaces:", err);
    }
  };

  const loadWorkspaces = async () => {
    if (token) {
      try {
        workspaces.value = await fetchWorkspaces(token);
        await determineInitialWorkspace();
      } catch (error) {
        console.error('Fehler beim Laden der Workspaces:', error);
      }
    }
  };

  const addWorkspace = async (name) => {
    if (token) {
      try {
        const newWorkspace = await createWorkspace(token, name);
        workspaces.value.push(newWorkspace);
        currentWorkspace.value = newWorkspace;
      } catch (error) {
        console.error('Fehler beim Erstellen des Workspaces:', error);
      }
    }
  };

 
  const createWorkspace = async (name) => {
    showOverlay();
    try {
      const newWorkspace = await createWorkspaceAPI(name);
      workspaces.value.push(newWorkspace); // Neuen Workspace zur Liste hinzufügen
      currentWorkspace.value = newWorkspace;
      showConfirmation(`Workspace "${newWorkspace.name}" created successfully.`);// Diese Funktion speichert den aktuellen Workspace in LocalStorage
    } catch (err) {
      console.error("Fehler beim Erstellen des Workspaces:", err);
    } finally {
      hideOverlay();
    }
  };

  const changeWorkspace = (workspace) => {
    currentWorkspace.value = workspace;
    showConfirmation(`Switched to workspace "${workspace.name}"`);
    
  };


  const leaveWorkspace = async () => {
    showOverlay();
    try {
      if (!token) {
        throw new Error("Kein Token gefunden. Der Benutzer ist nicht authentifiziert.");
      }
      await leaveWorkspaceAPI(token, currentWorkspace.value.id);
      showConfirmation('Workspace erfolgreich verlassen.');
      currentWorkspace.value = null;
      await loadWorkspaces(); // Stelle sicher, dass diese Funktion definiert ist
    } catch (error) {
      console.error('Fehler beim Verlassen des Workspaces:', error);
    } finally {
      hideOverlay();
    }
  };

  const deleteWorkspace = async () => {
    showOverlay();
    try {
      if (!token) throw new Error("Kein Token gefunden. Der Benutzer ist nicht authentifiziert.");
      await deleteWorkspaceAPI(token, currentWorkspace.value.id);
      showConfirmation("Workspace erfolgreich gelöscht.");
      currentWorkspace.value = null; // Setzen Sie den aktuellen Workspace zurück
      await loadWorkspaces(); // Laden Sie die Liste der verbleibenden Workspaces neu
    } catch (error) {
      console.error('Fehler beim Löschen des Workspaces:', error);
    } finally {
      hideOverlay();
    }
  };

  const invitePerEmail = async (email, join_code) => {
    showOverlay();
    console.log("Sending invite with email:", email + " and join code:", join_code);
    try {
      await invitePerEmailAPI(email, join_code);
      showConfirmation("Einladung erfolgreich verschickt.");
    }
    catch (error) {
      console.error("Fehler beim Versenden der Einladung:", error);
    }
    finally {
      hideOverlay();
    }
  }

  return {
   
    loadCurrentWorkspace,
    loadWorkspaces,
    addWorkspace,
    determineInitialWorkspace,
    setCurrentWorkspace,
    createWorkspace,
    changeWorkspace,
    leaveWorkspace,
    deleteWorkspace,
    invitePerEmail
  };
}
watch(currentWorkspace, async (newWorkspace, oldWorkspace) => {
  if(newWorkspace !== oldWorkspace) {
    setCurrentWorkspace();
    await loadWorkspaceData(newWorkspace);
  }
});

const setCurrentWorkspace = () => {
  if (currentWorkspace.value && currentWorkspace.value.id) {
    localStorage.setItem('currentWorkspaceId', currentWorkspace.value.id.toString());
  }
}