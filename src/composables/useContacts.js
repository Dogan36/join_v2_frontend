// src/composables/useContacts.js
import { ref } from "vue";
import { contacts } from "../store/state";
export function useContacts() {
  const fetchedContacts = ref([]); // Lokaler Zustand für die geladenen Daten
  const isLoading = ref(false); // Status, ob Daten geladen werden
  const error = ref(null); // Fehlerstatus

  const fetchContacts = async () => {
    isLoading.value = true; // Ladeindikator starten
    error.value = null; // Fehlerstatus zurücksetzen
    try {
      const response = await fetch("http://localhost:8000/api/profiles/");
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const data = await response.json();

      // Kontakte nach dem Vornamen sortieren
      data.sort((a, b) => {
        const nameA = a.user.first_name.toUpperCase(); // Vornamen der ersten Person
        const nameB = b.user.first_name.toUpperCase(); // Vornamen der zweiten Person
        if (nameA < nameB) {
          return -1; // A kommt vor B
        }
        if (nameA > nameB) {
          return 1; // B kommt vor A
        }
        return 0; // Wenn die Namen gleich sind
      });

      contacts.value = data; // Daten speichern// Daten speichern
      console.log(contacts);
    } catch (err) {
      error.value = err.message; // Fehler speichern
    } finally {
      isLoading.value = false; // Ladeindikator stoppen
    }
  };

  return {
    fetchedContacts,
    isLoading,
    error,
    fetchContacts,
  };
}