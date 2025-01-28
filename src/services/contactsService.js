import { API_BASE_URL } from '@/config';

const getToken = () => localStorage.getItem('join_token');


async function fetchContacts() {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/user/contacts/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Fehler beim Laden der Contacts: ${response.statusText}`);
    }
    return response.json();
}

async function addContactFetch(contact) {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/user/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      throw new Error(`Fehler beim Hinzufügen des Contacts: ${response.statusText}`);
    }
    return response.json();
      
}

async function updateContactFetch(contact, contactId,) {
  const token = getToken(); // Funktion zum Abrufen des Authentifizierungs-Tokens
  const response = await fetch(`${API_BASE_URL}/user/contacts/${contactId}/`, {
      method: 'PUT', // Oder 'PUT' für vollständige Aktualisierungen
      headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Fehler beim Aktualisieren des Contacts: ${response.statusText} - ${JSON.stringify(errorData)}`);
  }

  return response.json();
}

async function deleteContactFetch(contactId) {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/user/contacts/${contactId}/`, {
      method: 'DELETE',
      headers: {
          'Authorization': `Token ${token}`,
      },
  });

  if (!response.ok) {
      throw new Error(`Fehler beim Löschen des Contacts: ${response.statusText}`);
  }
}

export { 
    fetchContacts,
    addContactFetch,
    updateContactFetch,
    deleteContactFetch
  };