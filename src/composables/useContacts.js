
import { fetchContacts, addContactFetch, updateContactFetch, deleteContactFetch } from "@/services/contactsService";
const getToken = () => localStorage.getItem('join_token');
import { contacts, selectedContact, contactOverlayIsEditMode, contactOverlayIsVisible } from "@/store/state";
import { useLoadingOverlay } from "./useLoadingOverlay";
import { useConfirmationOverlay } from "./useConfirmationOverlay";
export default function useContacts() {
    const { showConfirmation } = useConfirmationOverlay();  
    const { showOverlay, hideOverlay } = useLoadingOverlay();
    const token = getToken();
    const loadContacts = async () => {
        if (token) {
            showOverlay()
            try {
            contacts.value = await fetchContacts(token);
            } catch (error) {
            console.error('Fehler beim Laden der Contacts:', error);
        }
        hideOverlay();
        }
    }

    const saveContact = async (contact) => {
        if (contactOverlayIsEditMode.value) {
            updateContact(contact);
        } else {
            addContact(contact);
        }
    }

    const addContact = async (contact) => {
        if (token) {
            showOverlay();
            try {
                const newContact = await addContactFetch(contact);
                contacts.value.push(newContact);
                showConfirmation('Contact created successfully');
            } catch (error) {
            console.error('Fehler beim Hinzufügen des Contacts:', error);
            }
            hideOverlay();
            contactOverlayIsVisible.value = false;
            selectedContact.value = contacts.value[contacts.value.length - 1];
        }
    }   

    const updateContact = async (contact) => {
        if (token) {
            showOverlay();
            try {
                const updatedContact = await updateContactFetch(contact, selectedContact.value.id);
                const index = contacts.value.findIndex(c => c.id === selectedContact.value.id);
                if (index !== -1) {
                    contacts.value[index] = updatedContact; // Aktualisiere den Kontakt in der lokalen Liste
                }
                showConfirmation('Contact updated successfully');
                selectedContact.value = contacts.value[index];
            } catch (error) {
            console.error('Fehler beim Aktualisieren des Contacts:', error);
            }
            hideOverlay();
            contactOverlayIsVisible.value = false;
        }
    }

    const deleteContact = async () => {
        if (token) {
            showOverlay();
            try {
                await deleteContactFetch(selectedContact.value.id);
                const index = contacts.value.findIndex(c => c.id === selectedContact.value.id);
                if (index !== -1) {
                    contacts.value.splice(index, 1); // Entferne den Kontakt aus der lokalen Liste
                }
                showConfirmation('Contact deleted successfully');
                selectedContact.value = null;
            } catch (error) {
            console.error('Fehler beim Löschen des Contacts:', error);
            }
            hideOverlay();
            contactOverlayIsVisible.value = false;
        }
    }





    return {
        contacts,
        loadContacts,
        saveContact,
        selectedContact,
        deleteContact,
    }

}