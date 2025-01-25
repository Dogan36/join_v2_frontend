import { fetchTasks, fetchCategories } from '@/services/workspaceDataService';
import { currentWorkspace } from './useWorkspaces';
import { contacts, tasks, categories } from '@/store/state';

export default function useWorkspaceData() {
    
    const loadWorkspaceData = async () => {
        if (currentWorkspace.value !== null) {
            tasks.value = await fetchTasks(currentWorkspace.value.id);
            contacts.value = currentWorkspace.value.members;
            categories.value = await fetchCategories(currentWorkspace.value.id);
        }
    };

    return {
        tasks,
        contacts,
        categories,
        loadWorkspaceData
    };
}