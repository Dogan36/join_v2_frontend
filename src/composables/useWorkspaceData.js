import { ref, watch } from 'vue';
import { fetchTasks, fetchMembers, fetchSubtasks, fetchCategories } from '@/services/workspaceDataService'; // Pseudo-API-Aufrufe

export default function useWorkspaceData(currentWorkspace) {
    const tasks = ref([]);
    const members = ref([]);
    const subtasks = ref([]);
    const categories = ref([]);

    const loadWorkspaceData = async () => {
        if (currentWorkspace.value) {
            tasks.value = await fetchTasks(currentWorkspace.value.id);
            members.value = await fetchMembers(currentWorkspace.value.id);
            subtasks.value = await fetchSubtasks(currentWorkspace.value.id);
            categories.value = await fetchCategories(currentWorkspace.value.id);
        }
    };

    watch(currentWorkspace, (newVal, oldVal) => {
        if (newVal !== oldVal) {
            loadWorkspaceData();
        }
    }, { immediate: true });

    return {
        tasks,
        members,
        subtasks,
        categories,
        loadWorkspaceData
    };
}