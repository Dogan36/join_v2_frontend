import { API_BASE_URL } from '@/config';

const getToken = () => localStorage.getItem('join_token');


/**
 * Fetches the list of contacts from the server.
 * 
 * @async
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of contact objects.
 * @throws {Error} If the request fails.
 */
async function fetchContacts() {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/user/contacts/`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching contacts: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Adds a new contact to the server.
 * 
 * @async
 * @param {Object} contact - The contact data to add.
 * @returns {Promise<Object>} A promise that resolves to the newly created contact object.
 * @throws {Error} If the request fails.
 */
async function addContactFetch(contact) {
  console.log(contact);
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/user/contacts/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error(`Error adding contact: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Updates an existing contact on the server.
 * 
 * @async
 * @param {Object} contact - The updated contact data.
 * @param {number} contactId - The ID of the contact to update.
 * @returns {Promise<Object>} A promise that resolves to the updated contact object.
 * @throws {Error} If the request fails.
 */
async function updateContactFetch(contact, contactId) {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/user/contacts/${contactId}/`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error updating contact: ${response.statusText} - ${JSON.stringify(errorData)}`);
  }

  return response.json();
}

/**
 * Deletes a contact from the server.
 * 
 * @async
 * @param {number} contactId - The ID of the contact to delete.
 * @returns {Promise<void>} A promise that resolves when the contact is successfully deleted.
 * @throws {Error} If the request fails.
 */
async function deleteContactFetch(contactId) {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/user/contacts/${contactId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error deleting contact: ${response.statusText}`);
  }
}

export { 
  fetchContacts,
  addContactFetch,
  updateContactFetch,
  deleteContactFetch
};
