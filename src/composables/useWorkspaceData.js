import { fetchTasks, fetchCategories } from '@/services/workspaceDataService';
import { members, tasks, categories, currentWorkspace } from '@/store/state';

/**
 * Provides functionality to load and manage workspace-related data, including tasks, members, and categories.
 * 
 * @returns {{
*   tasks: import('vue').Ref<Array<Object>>,
*   members: import('vue').Ref<Array<Object>>,
*   categories: import('vue').Ref<Array<Object>>,
*   loadWorkspaceData: () => Promise<void>
* }}
*/
export default function useWorkspaceData() {

 /**
  * Loads tasks, members, and categories for the current workspace.
  * Fetches data only if a workspace is selected.
  * 
  * @async
  */
 const loadWorkspaceData = async () => {
   if (currentWorkspace.value !== null) {
     tasks.value = await fetchTasks(currentWorkspace.value.id);
     members.value = currentWorkspace.value.members;
     categories.value = await fetchCategories(currentWorkspace.value.id);
   }
 };

 return {
   tasks,
   members,
   categories,
   loadWorkspaceData
 };
}