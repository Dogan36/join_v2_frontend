<template>
  <div class="contactsContent">
    <Contactslist
      :contacts="contacts"
      :selectedContact="selectedContact"
      @updateContact="setActiveContact"
    />

    <ContactMainContent :selectedContact="selectedContact" />
  </div>
</template>

<style scoped>
.contactsContent {
  display: flex;
  gap: 50px;
  height: 100%;
}
</style>

<script setup>
import { ref } from "vue";
import Contactslist from "./ContactsComponents/Contactslist.vue";
import ContactMainContent from "./ContactsComponents/ContactMainContent.vue";

const selectedContact = ref(null);

const setActiveContact = (contact) => {
  selectedContact.value = contact;

  // Update den aktiven Kontakt
};
const contacts = ref([
  {
    firstName: "Anna",
    lastName: "Meier",
    email: "anna.meier@example.com",
    phone: "123-456-7890",
    avatar: "AM",
    color: "#FF5733",
  },
  {
    firstName: "Benjamin",
    lastName: "Huber",
    email: "benjamin.huber@example.com",
    phone: "124-567-8901",
    avatar: "BH",
    color: "#33FF57",
  },
  {
    firstName: "Charlotte",
    lastName: "Weber",
    email: "charlotte.weber@example.com",
    phone: "125-678-9012",
    avatar: "CW",
    color: "#5733FF",
  },
  {
    firstName: "Daniel",
    lastName: "Schmidt",
    email: "daniel.schmidt@example.com",
    phone: "126-789-0123",
    avatar: "DS",
    color: "#FF33A1",
  },
  {
    firstName: "Emma",
    lastName: "Klein",
    email: "emma.klein@example.com",
    phone: "127-890-1234",
    avatar: "EK",
    color: "#33A1FF",
  },
  {
    firstName: "Felix",
    lastName: "Becker",
    email: "felix.becker@example.com",
    phone: "128-901-2345",
    avatar: "FB",
    color: "#FFC300",
  },
  {
    firstName: "Hannah",
    lastName: "Krüger",
    email: "hannah.krueger@example.com",
    phone: "129-012-3456",
    avatar: "HK",
    color: "#DAF7A6",
  },
  {
    firstName: "Isabella",
    lastName: "Wolf",
    email: "isabella.wolf@example.com",
    phone: "130-123-4567",
    avatar: "IW",
    color: "#C70039",
  },
  {
    firstName: "Jonas",
    lastName: "Seifert",
    email: "jonas.seifert@example.com",
    phone: "131-234-5678",
    avatar: "JS",
    color: "#900C3F",
  },
  {
    firstName: "Klara",
    lastName: "Neumann",
    email: "klara.neumann@example.com",
    phone: "132-345-6789",
    avatar: "KN",
    color: "#581845",
  },
  {
    firstName: "Lara",
    lastName: "Richter",
    email: "lara.richter@example.com",
    phone: "133-456-7890",
    avatar: "LR",
    color: "#FF5733",
  },
  {
    firstName: "Lukas",
    lastName: "Müller",
    email: "lukas.mueller@example.com",
    phone: "134-567-8901",
    avatar: "LM",
    color: "#33FF57",
  },
  {
    firstName: "Mia",
    lastName: "Schneider",
    email: "mia.schneider@example.com",
    phone: "135-678-9012",
    avatar: "MS",
    color: "#5733FF",
  },
  {
    firstName: "Noah",
    lastName: "Lehmann",
    email: "noah.lehmann@example.com",
    phone: "136-789-0123",
    avatar: "NL",
    color: "#FF33A1",
  },
  {
    firstName: "Olivia",
    lastName: "Bauer",
    email: "olivia.bauer@example.com",
    phone: "137-890-1234",
    avatar: "OB",
    color: "#33A1FF",
  },
  {
    firstName: "Paul",
    lastName: "Friedrich",
    email: "paul.friedrich@example.com",
    phone: "138-901-2345",
    avatar: "PF",
    color: "#FFC300",
  },
  {
    firstName: "Sophia",
    lastName: "Fischer",
    email: "sophia.fischer@example.com",
    phone: "139-012-3456",
    avatar: "SF",
    color: "#DAF7A6",
  },
  {
    firstName: "Tim",
    lastName: "Hoffmann",
    email: "tim.hoffmann@example.com",
    phone: "140-123-4567",
    avatar: "TH",
    color: "#C70039",
  },
  {
    firstName: "Valentina",
    lastName: "Scholz",
    email: "valentina.scholz@example.com",
    phone: "141-234-5678",
    avatar: "VS",
    color: "#900C3F",
  },
  {
    firstName: "Yannick",
    lastName: "Koch",
    email: "yannick.koch@example.com",
    phone: "142-345-6789",
    avatar: "YK",
    color: "#581845",
  },
  {
    firstName: "Zoe",
    lastName: "Arnold",
    email: "zoe.arnold@example.com",
    phone: "143-456-7890",
    avatar: "ZA",
    color: "#FF5733",
  },
]);
</script>
