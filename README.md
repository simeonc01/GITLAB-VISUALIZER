# Prosjekt 2 - IT2810 Webutvikling

Prosjektet skal visualisere GitLab data. For å gjøre dette benytter vi oss av GitLab sitt eget api. Webapplikasjonen er skrevet ved hjelp av React i TypeScript. For å starte prosjektet klikker du øverst til høyre. I URL-feltet skrives URL'en fra hjemsiden til prosjektet ditt. "https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-{ditt team nummer}/{ditt prosjekt navn}". I Token id skrives Access Token som du finner under settingsmenyen i ditt prosjekt.

## Bruk av context

Vi har benyttet oss av React sitt Context API. Vi har wrappet hele applikasjonen i dette slik at alle komponenter kan benytte seg av det. Vi valgte å bruke Context'en til å holde på all dataen som vi henter fra gitLab API'et. Dette syntes vi var hensiktsmessig siden da kan informasjonen brukes på tvers av komponentene med minimalt antall kall til API'et. Det å bruke context til å håndtere dataen hjalp oss også på en samlet dato filtrering der vi kun trengte å filtrere dataen en gang og la komponenter selv hente ut data som vanlig.

## Eksternt UI-bibliotek

Materiel UI (MUI) ble benyttet slik at vi slapp å designe egne komponenter fra bunnen av. Vi valgte MUI siden det dekker alt av nødvendige basiskomponenter. MUI har også gode løsninger for skalering av nettsiden som gir hjelper å oppfylle kravet om et responsivt web design.

## AJAX

For å hente data fra gitLab API'et valgte vi å benytte oss av Axios. En grunn til at vi valgte å bruke Axios er fordi Axios kommer med ferdig JSON-parsing, noe JavaScript sin fetch-funksjon ikke gjør. Vi trengte å bruke fetch en gang til å hente ut prosjekt ID'en. Gitlab api lar deg hente data fra et prosjekt ved å sette den uri-enkodede prosjektet i midten istedenfor en tall id, men axios de-enkoder urienkodede lenker som gjorde at vi ikke kunne bruke dette.

## Local- og sessionstorage

Gruppen har benyttet både local- og sessionstorage som gitt i kravbeskrivelsen. Localstorage er blitt brutk til å lagre URL og token lokalt i webleseren uten noe tidbegrensning. Tanken bak dette er at vi ønsker at brukeren skal kunne åpne webapplikasjonen ved en senere anledning uten å må taste inn URL og token på nytt. For å lagre filtreringsdatoene har vi valgt å benytte oss av sessionstorage. Årsaken til dette valget er at vi tenker det er hensiktsmessig å lagre disse datoene så lenge nettleseren er oppe. Men dersom nettleseren lukkes har vi kommet fram til at det ikke vil være nødvendig å lagre disse datoene, ettersom det er stor sannsynlighet at brukeren vil ønske å se på andre datoer neste gang.

## Testing

Vi har testet prosjektet kodevis ved bruk av snapshottester og vanlige kode tester. Vi har valgt å ikke ha hovedfokus på testing og testdekningsgrad siden det ikke var hovedoppgaven til prosjektet.

For brukertesting har vi valgt å sjekke det på en Iphone 11, Ipad Pro 2021, og Firefox og Edge på en windows PC. Fra testene fant vi ut at teksten vår at vi måtte ha mer justering for mindre skjærmer, og at vi burde ha startet og designet applikasjonen vår for den.

Vi hadde laget et design i figma når vi startet, men kun for desktop. Dette var noe vi burde ha forandret på og vi hadde sikkert da fått et mer samlet design.

## Ingen bruk av viewport og mdia-queries

Siden vi brukte MUI, og ikke skrev styling selv, trengte vi ikke å bruke viewport og media-queries direkte, men vi har brukt det indirekte gjennom MUI selv. Ved bruk av `sx` egenskapene til MUI komponenter kan vi sette responsiv styling. MUI kommer med 5 størrelser definert; `xs`, `sm`, `md`, `lg`, og `xl`. Man kan definere egne stiler for hver, og det har vi gjort. Vi satte ikke stiler for alle, men kun for `xs`, `sm`, og `md`.

## Klasse komponentene

Vi lagde `Filter` komponenten vår som en klasse. Det var uvant for gruppen siden vi har mest jobbet med funksjonelle komponenter. Til slutt ble løsningen av `Filter` komponenten som klasse bedre enn løsningen som funksjonell komponent siden vi fikk enn lettere struktur å lese, og mindre intrekat kode.

## Kommandoer:
### `npm start`
For å starte prosjektet
### `npm test`
For å teste prosjektet
### `npm run lint`
For å linte prosjektet
