
import { fetchContacts, addNewContact } from "@/services/contactsService";
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

    const addContact = async (contact) => {
        if (token) {
            try {
            await addNewContact(contact);
            await loadContacts();
            } catch (error) {
            console.error('Fehler beim Hinzufügen des Contacts:', error);
            }
        }
    }

    return {
        contacts,
        loadContacts,
        addContact,
    }
}
