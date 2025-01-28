import { ref } from 'vue';

export const getToken = () => localStorage.getItem('join_token');
export const currentUser = ref('');
export const currentView = ref('summary');
export const isWorkspaceOverlayVisible = ref(false);
export const members = ref([]);
export const contacts = ref([]);
export const selectedContact = ref(null);
export const tasks = ref([]);
export const subtasks = ref([]);
export const categories = ref([]);
export const contactOverlayIsEditMode = ref(false);
export const contactOverlayIsVisible = ref(false);