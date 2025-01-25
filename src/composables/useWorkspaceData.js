import { ref, watch } from 'vue';
import { fetchTasks, fetchCategories } from '@/services/workspaceDataService';
import { currentWorkspace } from './useWorkspaces';
export default function useWorkspaceData() {
    const tasks = ref([]);
    const members = ref([]);
    const subtasks = ref([]);
    const categories = ref([]);

    const loadWorkspaceData = async () => {
        if (currentWorkspace.value !== null) {
            tasks.value = await fetchTasks(currentWorkspace.value.id);
            console.log(tasks.value)
            members.value = currentWorkspace.value.members;
            console.log(members.value)
            categories.value = await fetchCategories(currentWorkspace.value.id);
            console.log(categories.value)
        }
    };

    return {
        tasks,
        members,
        subtasks,
        categories,
        loadWorkspaceData
    };
}