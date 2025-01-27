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
    else(console.log(response.data))
    return response.json();
}

export { 
    fetchContacts };