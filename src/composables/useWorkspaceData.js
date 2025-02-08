import { fetchTasks, fetchCategories } from '@/services/workspaceDataService';
import { members, tasks, categories, currentWorkspace } from '@/store/state';

export default function useWorkspaceData() {
    
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