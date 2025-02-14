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
import { getToken, currentWorkspace, workspaces, currentUser } from '@/store/state';
const token = getToken();
const { loadWorkspaceData } = useWorkspaceData();

/**
 * Provides functionality for managing workspaces, including loading, creating, switching, leaving, and deleting workspaces.
 * Also includes functionality to send email invitations.
 * 
 * Uses `useConfirmationOverlay` for confirmation messages and `useLoadingOverlay` for loading states.
 * 
 * @returns {{
*   loadCurrentWorkspace: (workspaceId: number) => Promise<void>,
*   loadWorkspaces: () => Promise<void>,
*   addWorkspace: (name: string) => Promise<void>,
*   determineInitialWorkspace: () => Promise<void>,
*   setCurrentWorkspace: () => void,
*   createWorkspace: (name: string) => Promise<void>,
*   changeWorkspace: (workspace: Object) => void,
*   leaveWorkspace: () => Promise<void>,
*   deleteWorkspace: () => Promise<void>,
*   invitePerEmail: (email: string, join_code: string) => Promise<void>
* }}
*/
export default function useWorkspaces() {
 const { showConfirmation } = useConfirmationOverlay();
 const { showOverlay, hideOverlay } = useLoadingOverlay();

 /**
  * Determines the initial workspace to load.
  * If a workspace ID is stored in localStorage, it tries to load it.
  * Otherwise, it loads the first available workspace.
  * 
  * @async
  */
 const determineInitialWorkspace = async () => {
   if (token) {
     const currentWorkspaceId = Number(localStorage.getItem("currentWorkspaceId"));
     if (currentWorkspaceId) {
       const foundWorkspace = workspaces.value.find(ws => ws.id === currentWorkspaceId);
       if (foundWorkspace) {
         currentWorkspace.value = await fetchWorkspaceById(currentWorkspaceId);
       } else {
         console.warn("No workspace found with the stored ID, loading the first available workspace.");
         currentWorkspace.value = await fetchFirstWorkspace();
       }
     } else {
       currentWorkspace.value = await fetchFirstWorkspace();
     }
   }
 };

 /**
  * Loads a specific workspace by its ID.
  * 
  * @async
  * @param {number} workspaceId - The ID of the workspace to load.
  */
 const loadCurrentWorkspace = async (workspaceId) => {
   try {
     const workspace = await fetchWorkspaceById(workspaceId);
     if (!workspace) {
       console.warn("No workspace found.");
       currentWorkspace.value = null;
       return;
     }
     currentWorkspace.value = workspace;
   } catch (err) {
     console.error("Error loading workspace:", err);
   }
 };

 /**
  * Loads all available workspaces and sets the initial workspace.
  * 
  * @async
  */
 const loadWorkspaces = async () => {
   if (token) {
     try {
       workspaces.value = await fetchWorkspaces(token);
       await determineInitialWorkspace();
     } catch (error) {
       console.error("Error loading workspaces:", error);
     }
   }
   console.log(currentWorkspace);
 };

 /**
  * Adds a new workspace and sets it as the current workspace.
  * 
  * @async
  * @param {string} name - The name of the workspace to create.
  */
 const addWorkspace = async (name) => {
   if (token) {
     try {
       const newWorkspace = await createWorkspace(token, name);
       workspaces.value.push(newWorkspace);
       currentWorkspace.value = newWorkspace;
     } catch (error) {
       console.error("Error creating workspace:", error);
     }
   }
 };

 /**
  * Creates a new workspace, updates the workspaces list, and sets it as the current workspace.
  * 
  * @async
  * @param {string} name - The name of the new workspace.
  */
 const createWorkspace = async (name) => {
   showOverlay();
   try {
     const newWorkspace = await createWorkspaceAPI(name);
     workspaces.value.push(newWorkspace);
     currentWorkspace.value = newWorkspace;
     showConfirmation(`Workspace "${newWorkspace.name}" created`);
   } catch (err) {
     console.error("Error creating workspace:", err);
   } finally {
     hideOverlay();
   }
 };

 /**
  * Changes the current workspace and displays a confirmation message.
  * 
  * @param {Object} workspace - The workspace object to switch to.
  */
 const changeWorkspace = (workspace) => {
   currentWorkspace.value = workspace;
   showConfirmation(`Switched to workspace "${workspace.name}"`);
 };

 /**
  * Allows the user to leave the current workspace.
  * If the user is a guest in a restricted workspace, they cannot leave.
  * 
  * @async
  */
 const leaveWorkspace = async () => {
   if (currentWorkspace.value.id === "93" && currentUser.value.id === "29") {
     alert("Guest cannot leave this workspace.");
     hideOverlay();
     return;
   }
   showOverlay();
   try {
     if (!token) {
       throw new Error("No token found. User is not authenticated.");
     }
     await leaveWorkspaceAPI(token, currentWorkspace.value.id);
     showConfirmation("Successfully left workspace.");
     currentWorkspace.value = null;
     await loadWorkspaces();
   } catch (error) {
     console.error("Error leaving workspace:", error);
   } finally {
     hideOverlay();
   }
 };

 /**
  * Deletes the current workspace.
  * If the user is a guest in a restricted workspace, deletion is not allowed.
  * 
  * @async
  */
 const deleteWorkspace = async () => {
   showOverlay();
   if (currentWorkspace.value.id === "108") {
     alert("Guests cannot delete this workspace.");
     hideOverlay();
     return;
   }
   try {
     if (!token) throw new Error("No token found. User is not authenticated.");
     await deleteWorkspaceAPI(token, currentWorkspace.value.id);
     showConfirmation("Workspace successfully deleted.");
     currentWorkspace.value = null;
     await loadWorkspaces();
   } catch (error) {
     console.error("Error deleting workspace:", error);
   } finally {
     hideOverlay();
   }
 };

 /**
  * Sends an invitation email to join the workspace using a join code.
  * 
  * @async
  * @param {string} email - The email address to send the invitation to.
  * @param {string} join_code - The workspace join code.
  */
 const invitePerEmail = async (email, join_code) => {
   showOverlay();
   try {
     await invitePerEmailAPI(email, join_code);
     showConfirmation("Invitation sent successfully.");
   } catch (error) {
     console.error("Error sending invitation:", error);
   } finally {
     hideOverlay();
   }
 };

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
   invitePerEmail,
 };
}

/**
* Watches for changes in the current workspace and updates the stored workspace ID.
*/
watch(currentWorkspace, async (newWorkspace, oldWorkspace) => {
 if (newWorkspace !== oldWorkspace) {
   setCurrentWorkspace();
   await loadWorkspaceData(newWorkspace);
 }
});

/**
* Stores the current workspace ID in localStorage.
*/
const setCurrentWorkspace = () => {
 if (currentWorkspace.value && currentWorkspace.value.id) {
   localStorage.setItem("currentWorkspaceId", currentWorkspace.value.id.toString());
 }
};
