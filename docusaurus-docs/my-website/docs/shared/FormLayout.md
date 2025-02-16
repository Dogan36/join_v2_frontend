# FormLayout Component

## Beschreibung
Die `FormLayout`-Komponente dient als Container für Formularinhalte. Sie stellt einen flexiblen Bereich zur Verfügung, in den andere Komponenten oder Inhalte über einen Slot eingefügt werden können. Dies ermöglicht die Wiederverwendung der Layout-Struktur in verschiedenen Formularen, während der Inhalt dynamisch angepasst werden kann.

## Struktur
- **form-layout**: Ein `div`-Container, der als Layout für das Formular dient. Es enthält einen Slot, in den benutzerdefinierte Inhalte eingefügt werden können.

## Verwendung
Die `FormLayout`-Komponente wird verwendet, um eine flexible und wiederverwendbare Struktur für Formulare zu schaffen. Sie ermöglicht es, Formularfelder und andere Eingabeelemente in einem konsistenten Layout zu platzieren.

Beispiel:

```vue
<FormLayout>
  <InputField label="Name" v-model="name" />
  <InputField label="Email" v-model="email" />
</FormLayout>
