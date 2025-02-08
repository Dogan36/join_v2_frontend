import { ref, watch } from 'vue';

export const getToken = () => localStorage.getItem('join_token');
export const currentUser = ref('');
export const currentView = ref('summary');
export const workspaces = ref([]);
export const currentWorkspace = ref('');
export const isWorkspaceOverlayVisible = ref(false);
export const members = ref([]);
export const contacts = ref([]);
export const selectedContact = ref(null);
export const tasks = ref([]);
export const subtasks = ref([]);
export const categories = ref([]);
export const contactOverlayIsEditMode = ref(false);
export const contactOverlayIsVisible = ref(false);
export const selectedCategory = ref(null);
export const currentTask = ref(null);

watch(selectedCategory, (newCategory) => {
    console.log('selectedCategory changed', newCategory);
});