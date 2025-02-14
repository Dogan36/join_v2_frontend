
import { fetchContacts, addContactFetch, updateContactFetch, deleteContactFetch } from "@/services/contactsService";
const getToken = () => localStorage.getItem('join_token');
import { contacts, selectedContact, contactOverlayIsEditMode, contactOverlayIsVisible } from "@/store/state";
import { useLoadingOverlay } from "./useLoadingOverlay";
import { useConfirmationOverlay } from "./useConfirmationOverlay";


/**
 * Provides functionality for managing contacts, including fetching, adding, updating, and deleting contacts.
 * 
 * Uses `useConfirmationOverlay` to display confirmation messages and `useLoadingOverlay` to manage loading states.
 * 
 * @returns {{
*   contacts: import('vue').Ref<Array<Object>>,
*   loadContacts: () => Promise<void>,
*   saveContact: (contact: Object) => Promise<void>,
*   selectedContact: import('vue').Ref<Object|null>,
*   deleteContact: () => Promise<void>
* }}
*/
export default function useContacts() {
 const { showConfirmation } = useConfirmationOverlay();
 const { showOverlay, hideOverlay } = useLoadingOverlay();
 const token = getToken();

 /**
  * Loads contacts from the server and updates the local contacts list.
  * Displays a loading overlay during the request.
  * 
  * @async
  */
 const loadContacts = async () => {
   if (token) {
     showOverlay();
     try {
       contacts.value = await fetchContacts(token);
     } catch (error) {
       console.error("Error loading contacts:", error);
     }
     hideOverlay();
   }
 };

 /**
  * Saves a contact by either updating an existing one or adding a new contact.
  * 
  * @async
  * @param {Object} contact - The contact object to be saved.
  */
 const saveContact = async (contact) => {
   if (contactOverlayIsEditMode.value) {
     updateContact(contact);
   } else {
     addContact(contact);
   }
 };

 /**
  * Adds a new contact and updates the local contacts list.
  * Displays a confirmation message on success.
  * 
  * @async
  * @param {Object} contact - The contact object to be added.
  */
 const addContact = async (contact) => {
   if (token) {
     showOverlay();
     try {
       const newContact = await addContactFetch(contact);
       contacts.value.push(newContact);
       showConfirmation("Contact created successfully");
     } catch (error) {
       console.error("Error adding contact:", error);
     }
     hideOverlay();
     contactOverlayIsVisible.value = false;
     selectedContact.value = contacts.value[contacts.value.length - 1];
   }
 };

 /**
  * Updates an existing contact and updates the local contacts list.
  * Displays a confirmation message on success.
  * 
  * @async
  * @param {Object} contact - The contact object with updated information.
  */
 const updateContact = async (contact) => {
   if (token) {
     showOverlay();
     try {
       const updatedContact = await updateContactFetch(contact, selectedContact.value.id);
       const index = contacts.value.findIndex((c) => c.id === selectedContact.value.id);
       if (index !== -1) {
         contacts.value[index] = updatedContact; // Update contact in the local list
       }
       showConfirmation("Contact updated successfully");
       selectedContact.value = contacts.value[index];
     } catch (error) {
       console.error("Error updating contact:", error);
     }
     hideOverlay();
     contactOverlayIsVisible.value = false;
   }
 };

 /**
  * Deletes the selected contact and removes it from the local contacts list.
  * Displays a confirmation message on success.
  * 
  * @async
  */
 const deleteContact = async () => {
   if (token) {
     showOverlay();
     try {
       await deleteContactFetch(selectedContact.value.id);
       const index = contacts.value.findIndex((c) => c.id === selectedContact.value.id);
       if (index !== -1) {
         contacts.value.splice(index, 1); // Remove contact from the local list
       }
       showConfirmation("Contact deleted successfully");
       selectedContact.value = null;
     } catch (error) {
       console.error("Error deleting contact:", error);
     }
     hideOverlay();
     contactOverlayIsVisible.value = false;
   }
 };

 return {
   contacts,
   loadContacts,
   saveContact,
   selectedContact,
   deleteContact,
 };
}
