# 🤖 Robo-Fabriek

Een Nederlands spel over **patronen** voor kinderen van 6 tot 10 jaar, waarin je ook een beetje leert **ondernemen**. Opa Tinus gaat met pensioen en geeft jou zijn stoffige robotfabriek. Zet de patronen van de machines goed, maak robots, verkoop ze en bouw de fabriek uit.

▶️ **Spelen:** https://kmhkasper-boop.github.io/robofabriek/

## Fase A (nu online)
- **Intro met opa Tinus en Bliep** (tekstballonnen + robotbrabbel, geen voorleesstem) en een korte instaptoets.
- **Fabrieksoverzicht** met kamers: Lopende band (doseermachine), Tik-tak-band, Herhaal-machine, Testkamer, Magazijn. Elke machine heeft patroonpuzzels (patroon afmaken, gat vullen, band afmaken, vertalen, kern vinden, geluidspatronen, fout vinden, groeiende stapels, getallenrijen) en 5 niveaus.
- **Economie**: werkbeurt → robots met kwaliteit ★ → winkel (vraag per dag) en bestellingen van klanten → munten + reputatie → bouwen en upgraden. Plafonds: kluis, magazijn, minder opbrengst bij vaker werken op één dag.
- **Onderhoud (zacht)**: machines die je een paar speeldagen niet gebruikt worden moe en gaan piepen (langzamer), smeren = één korte "fout vinden"-puzzel. Nooit kapot, nooit geld kwijt.
- **Tik-tak-band**: tik onderdelen in de volgorde van het recept. Leuk, maar levert pas echt wat op na upgrades.
- **Geheime puzzels** op rare plekken (schoorsteen, klok, poster, losse tegel) geven onderdelen voor het robotvoetbal (komt in fase C).
- **Dagrapport** met opa's commentaar. Samen spelen op één apparaat blijft (Lezer en bouwer, Maak een patroon).
- Voortgang uit de eerste versie wordt overgezet (sterren → machineniveaus + startgeld).

## Fase B (nu online)
- **Nieuwe stijl**: donkerder, metaal en licht, strakkere letters (Exo 2), meters en een hendel op de puzzelmachines.
- **Real time**: na één werkbeurt ("afregelen") maakt een machine vanzelf robots zolang het spel openstaat; de winkel verkoopt ze vanzelf aan klanten. Ben je weg geweest, dan heeft de fabriek even (begrensd) doorgewerkt.
- **Makkelijk / normaal / moeilijk** per werkbeurt, met vooraf de beloning. Nieuwe uitdagingen +30%; wat je al beheerst wordt "te makkelijk" en levert minder op. Hints mogen altijd (kosten een beetje).
- **Investeren** met terugverdientijd ("verdient zichzelf terug in ~X dagen"), etalage, zuinige lampen, kluis; **📊 Financiën** met inkomsten, kosten, winst en grafiek; tips van opa en Bliep.
- De economie is getest met een simulatie van 7 speelstijlen (`tests/sim_economie.js` in de bronmap).

## Fase C (nu online): Robotvoetbal
- Na 25 verkochte robots opent opa het **stadion**: 4 divisies, elk met een rivaal (Kartonco, TurboTech, MegaMetaal, Robo-X). 3 wedstrijden per divisie; 4 punten = promotie.
- **3 tegen 3**, 2 × 90 seconden, kratten en bosjes om je in te verstoppen. Joystick + Schiet + Duw (+ Spelzet), of het toetsenbord. Alleen tegen de computer, samen tegen de computer, of tegen elkaar op één apparaat.
- Richt-hulp, automatisch wisselen naar de robot bij de bal, en slimme AI-teamgenoten. Grappige knock-outs (BOING!) en vroege robots die vanzelf uit elkaar vallen.
- Patronen: het duikpatroon van de keeper lezen, spelzetten programmeren met herhaalblokken, en een juich-ritme in de rust.
- **Teammanagement:** opstelling en wissels, upgrades, werkplaats, training, aankleden (kleur, hoofd, hoed, ogen) en geheime onderdelen als uitrusting.
- Een deel van de fabriekswinst gaat naar de **clubkas**, met een plafond per divisie: geld helpt, maar slim spelen wint.

Werkt offline (PWA), zonder account, reclame of tracking. Geen verzoeken naar buiten (lettertype Exo 2 zelf gehost, SIL OFL, zie `fonts/OFL-Exo2.txt`).
