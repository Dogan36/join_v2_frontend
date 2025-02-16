# InputField

## Beschreibung
Die `InputField`-Komponente stellt ein benutzerdefiniertes Eingabefeld dar, das für die Eingabe von Text, Passwörtern oder anderen Formaten verwendet werden kann. Es enthält Optionen zur Anzeige von Fehlernachrichten und zur Anpassung des Icons. Wenn das Feld vom Typ "Passwort" ist, wird ein Symbol zur Anzeige der Passwortsichtbarkeit eingebaut.

## Struktur
- **inputfield**: Der Container für das Eingabefeld, der die Fehleranzeige einbezieht.
  - **input**: Das eigentliche Eingabefeld. Es reagiert auf Benutzereingaben und zeigt den Wert an.
  - **img**: Zeigt ein Icon, das entweder das Passwort anzeigt oder ein Standard-Icon für andere Eingabefelder.
  - **error-message**: Ein Absatz, der Fehlermeldungen anzeigt, wenn das Eingabefeld nicht korrekt ausgefüllt wurde.

## Funktionen und Methoden
- **onInput**: Wird ausgelöst, wenn sich der Wert des Eingabefelds ändert.
  - **Rückgabewert**: `void`
  
- **togglePasswordVisibility**: Wechselt die Sichtbarkeit des Passworts.
  - **Rückgabewert**: `void`
  
- **emitIconClick**: Wird ausgelöst, wenn das Icon im Eingabefeld angeklickt wird, z. B. zum Umschalten der Passwortsichtbarkeit.
  - **Rückgabewert**: `void`

## Props
- **modelValue**: Der Wert des Eingabefelds.
  - **Typ**: `String`
  - **Erforderlich**: `true`
  
- **id**: Die eindeutige ID des Eingabefelds.
  - **Typ**: `String`
  - **Erforderlich**: `true`
  
- **type**: Der Typ des Eingabefelds (z. B. "text", "password").
  - **Typ**: `String`
  - **Standardwert**: `text`
  
- **placeholder**: Der Platzhaltertext für das Eingabefeld.
  - **Typ**: `String`
  - **Erforderlich**: `true`
  
- **maxlength**: Die maximale Anzahl von Zeichen im Eingabefeld.
  - **Typ**: `String`
  
- **icon**: Das Symbol für das Eingabefeld (standardmäßig leer).
  - **Typ**: `String`
  
- **iconAlt**: Der Alternativtext für das Eingabe-Icon.
  - **Typ**: `String`
  
- **error**: Ein Flag, das angibt, ob das Eingabefeld einen Fehler hat.
  - **Typ**: `Boolean`
  
- **errorMessages**: Ein Objekt mit Fehlermeldungen.
  - **Typ**: `Object`
  - **Standardwert**: `{}`

## Computed Properties
- **errorMessage**: Gibt die erste Fehlermeldung zurück, falls eine vorhanden ist.
  - **Rückgabewert**: `String`
  
- **passwordIconSrc**: Berechnet die Quelle des Passwort-Icons, basierend auf dem Zustand des Eingabefelds.
  - **Rückgabewert**: `String`
  
- **passwordIconAlt**: Berechnet den Alt-Text für das Passwort-Icon.
  - **Rückgabewert**: `String`
  
- **passwordIconClass**: Berechnet die CSS-Klasse für das Passwort-Icon.
  - **Rückgabewert**: `String`

## Events
- **update:modelValue**: Wird ausgelöst, wenn sich der Wert des Eingabefelds ändert.
- **iconClick**: Wird ausgelöst, wenn das Icon im Eingabefeld angeklickt wird.

## Stil
- **inputfield**: Der Container für das Eingabefeld, der auch Fehleranzeigen enthalten kann.
- **input-icon**: Das Icon für das Eingabefeld.
- **error-message**: Die Fehlermeldung unter dem Eingabefeld, die bei ungültigen Eingaben angezeigt wird.

## Weitere Hinweise
- Das Passwortfeld zeigt entweder ein Icon zum Anzeigen oder Verbergen des Passworts.

