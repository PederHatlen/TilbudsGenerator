# Tilbudsgenerator

## Om prosjektet

Dette er et prosjekt som er å lage en epost meldings-generator.  
Den er laget for å hente informasjon fra en form (PHP kompatibelt), og enerere tekst som kan lett kopieres og limes in i en epost klient.

## Tekst som blir generert

```diff
Hei [navn på kunde] og takk for en hyggelig telefonsamtale.
Sender deg som avtalt tilbud på [produkt1]( og [produkt2]).

Prisen vil da bli
 --------------------------------------------------
+[automatisk justering av mengden punktum (Fungerer best med monospace font)]
[produkt1] .................. [produkt1 pris]kr
[produkt2] .................. [produkt2 pris]kr
osv.
 --------------------------------------------------
+[Printer ikke ut rabatt hvis den ikke eksisterer]
Månedlig pris uten rabatt er [m.pris].
Månedlig rabatt [m.rabatt]% -[rabbat% av pris]kr i måneden.
Total månedlig pris er [m.pris-rabbat% av pris]kr.

+[Lager ikke kategorier hvis de ikke finnes]
Engangsprisen uten rabatt er [e.pris]kr.
Engangs-rabatt [e.rabatt]% -[rabbat% av pris]kr.
Total engangspris er [e.pris-rabbat% av pris]kr.
 --------------------------------------------------  
+[Vil ikke printe ut totalt hvis det bare er en kategori]
Totalt [total pris]kr nå (ink. denne måneden), og [månedlig pris (hvis den er der)]kr i måneden etter det.

Det er bare å svare på denne eposten hvis du har noen spørsmål.
Med vennlig hilsen [navn].
```
