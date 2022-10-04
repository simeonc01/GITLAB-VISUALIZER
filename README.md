# Prosjekt 2 - IT2810 Webutvikling
Prosjektet skal visualisere GitLab data. For å gjøre dette benytter vi oss av GitLab sitt eget api. Webapplikasjonen er skrevet ved hjelp av React i TypeScript.

Kommandoer:
### `npm start`
For å starte prosjektet
### `npm test`
For å teste prosjektet
### `npm run lint`
For å linte prosjektet


## Local- og sessionstorage
Gruppen har benyttet både local- og sessionstorage som gitt i kravbeskrivelsen. Localstorage er blitt brutk til å lagre URL og token lokalt i webleseren uten noe tidbegrensning. Tanken bak dette er at vi ønsker at brukeren skal kunne åpne webapplikasjonen ved en senere anledning uten å må taste inn URL og token på nytt. For å lagre filtreringsdatoene har vi valgt å benytte oss av sessionstorage. Årsaken til dette valget er at vi tenker det er hensiktsmessig å lagre disse datoene så lenge nettleseren er oppe. Men dersom nettleseren lukkes har vi kommet fram til at det ikke vil være nødvendig å lagre disse datoene, ettersom det er stor sannsynlighet at brukeren vil ønske å se på andre datoer neste gang.


## MUI bibliotek
I dette prosjektet har vi valgt å benytte oss av et eksternt bibliotek, nemlig MUI. Årsaken til at vi valgte nettopp dette biblioteket er at det innehar rikelige UI-komponenter som kan benyttes i react-applikasjonen vår. I tillegg har vi en oppfatning av at MUI blir mye brukt ute i utviklerbransjen, slik at det kan være nyttig for oss å bli kjent med dette biblioteket allerede her. Underveis har vi også tatt i bruke egne React-komponenter i prosjektet. 


## Bruk av context
Vi har benyttet oss av React sitt Context API. Vi har wrappet hele applikasjonen i dette slik at alle komponenter kan benytte seg av det. Vi valgte å bruke Context'en til å holde på all dataen som vi henter fra gitLab API'et. Dette syntes vi var hensiktsmessig siden da kan informasjonen brukes på tvers av komponentene med minimalt antall kall til API'et.

## Testing
Hva er gjort og hvorfor? 
Snapshot testing...
(Se spesielt under punkt 2 for testing i oppgavebeskrivelsen. MAO skriv noen ord om testing på tre ulike enheter).


## Responsiv web design
...(Hvis ingen har noe her på hjertet så kan vi bare fjerne denne delen tenker jeg)


## Ingen direkte bruk av viewport og mdia-queries
Hva har vi gjort i stedet for (har vell brukt det indirekte?)
Hvorfor har vu gjort det slik?



## Diverse
...
(Kan ta opp ting det som ikke dekkes i de andre overskriftene)



### Link til Figma:
Versjon 1: https://www.figma.com/file/eTedEAm5sPkru2xtAeVHnf/Untitled?node-id=0%3A1

Versjon 2: https://www.figma.com/file/ySH17kFnnyEihaBgLdciH2/Untitled?node-id=0%3A1&fbclid=IwAR3Q8Xba0cjM-YB3FWS3g80lZFUAemQYPRSLVOH9oXQJgFbXuSrBz3D95ws