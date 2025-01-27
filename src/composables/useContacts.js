import { ref } from "vue";
import { fetchContacts } from "@/services/contactsService";
const getToken = () => localStorage.getItem('join_token');
import { contacts } from "@/store/state";

export default function useContacts() {
    const token = getToken();
    const loadContacts = async () => {
        if (token) {
            try {
            contacts.value = await fetchContacts(token);
            } catch (error) {
            console.error('Fehler beim Laden der Contacts:', error);
            }
      }
    }

    return {
        contacts,
        loadContacts
    }
}
