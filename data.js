// data.js

const ocr_text = `
Lernwortschatz 5

Alltag
schlafen, er schläft
duschen
besuchen
treffen, er trifft
die Nachricht, -en
die Uni, -s
in die Uni/Schule fahren
die Mensa, Mensen
die Bibliothek, -en
die Musikschule, -n
die Hausaufgabe, -n
die Zeitung, -en
am Computer arbeiten
die Homepage, -s
der Stress (Sg.)

Uhrzeit
die Uhr, -en
wie viel Uhr ist es?
Wie spät ist es?
Es ist vier Uhr.
Es ist Viertel vor vier.
Es ist Viertel nach vier.
Es ist halb fünf.
Es ist kurz vor vier.
Es ist zehn nach vier.
um (um drei Uhr)
die Sekunde, -n
die Minute, -n
die Stunde, -n
eine halbe Stunde
die Verspätung, -en
pünktlich
zu spät kommen

Familie
die Familie, -n
der/die Verwandte, -n
das Baby, -s
das Kind, -er
der Junge, -n
das Mädchen, -
der Sohn, "e
die Tochter, "
die Mutter, "
die Eltern (Pl.)
der Bruder, "
die Schwester, -n
die Geschwister (Pl.)
die Großmutter, "
der Großvater, "
der Opa, -s
die Großeltern (Pl.)
der Mann (mein Mann)
die Frau (meine Frau)
ledig
verheiratet

Termine und Verabredungen
die Zeit, -en
Hast du morgen Zeit?
telefonieren
Auf Wiederhören.
am (am Montag)
von ... bis (von Montag bis Freitag)
können, er kann
müssen, er muss
wollen, er will
die Party, -s
eine Party machen
die Bar, -s
sitzen
der Kalender, -
die Besprechung, -en
Was kann ich für Sie tun?

Ich hätte gern einen Termin.
Haben Sie am ... einen Termin frei?
Geht es am ... um ...?
Nein, das geht leider nicht.

andere wichtige Wörter und Wendungen
krank
der Sport (Sg.)
der Ball, "e
das Motorrad, "er
die Geige, -n
Geige spielen
das Saxofon, -e
die Trompete, -n
der Hund, -e
süß (Euer Hund ist so süß.)
die Idee, -n
Gute Idee!
liebe Grüße
willkommen
cool
falsch
das Problem, -e
die Praxis, Praxen
schade
tut mir leid.
Bitte entschuldigen Sie.
Macht nichts.

Lernwortschatz 6

Freizeitaktivitäten
ins Fitness-Studio gehen
klettern
Ski fahren
wandern
der Ausflug, "e
einen Ausflug machen
die Fahrradtour, -en
das Picknick, -s

Feste/Partys
das Fest, -e
feiern
der Geburtstag, -e
werden, er wird (Sie wird 30 Jahre alt.)
schenken
das Geschenk, -e
einladen
das Datum (Sg.)
die Überraschung, -en
Achtung!
wissen, er weiß (Achtung, sie weiß nichts.)
mit|bringen
Spaß haben
hoffentlich (Hoffentlich kommt ihr.)

eine Mail schreiben
die Mail, -s
schicken
der Betreff, -e
die Anrede, -n
herzliche Grüße

Speisen und Getränke
die Schorle, -n
das Eis (Sg.)
die Salami, -s
das Schnitzel, -
die Tomatensuppe, -n
der Sandwich, -s

bestellen und bezahlen
der Durst (Sg.)
der Hunger (Sg.)
die Speisekarte, -n
die Bestellung, -en
bestellen
bringen
Für wen ist ...?
bezahlen
zahlen (Zahlen, bitte.)
die Rechnung, -en
Zusammen oder getrennt?
das Trinkgeld (Sg.)
geben, er gibt
Stimmt so.

Auf dem Tisch
die Gabel, -n
das Messer, -
der Löffel, -
das Glas, "er
die Tasse, -n
der Teller, -
die Serviette, -n

Lokale
die Kneipe, -n
das Kaffeehaus, "er
der Biergarten, "
die Bank, "e
die Selbstbedienung (Sg.)
geöffnet
draußen (Man kann draußen sitzen.)

Veranstaltungen
das Programm, -e
los sein (Was ist los?)
(keine) Lust haben
mit|kommen
der Treffpunkt, -e
der Eintritt, -e
die Anmeldung, -en
beginnen
enden
die Karte, -n

andere wichtige Wörter und Wendungen
ab|holen
an|fangen, er fängt an
an|rufen
auf|hören
mit|machen
glauben
laufen, er läuft
genießen
passieren
zu Hause
kalt
warm
wieder
typisch
verboten
überall
besonders (Was ist besonders?)
der Spielplatz, "e
früh
Alles klar?
Wann denn?
Klingt gut.
`;

const GERMAN_TO_ENGLISH = {
    "Mensch": "person, human being", "Haus": "house", "Rathaus": "town hall, city hall",
    "Konzerthaus": "concert hall", "Kirche": "church", "Fahrrad": "bicycle", "Bus": "bus",
    "Straßenbahn": "tram, streetcar", "Zug": "train", "U-Bahn": "subway, underground",
    "S-Bahn": "suburban train", "Schiff": "ship, boat", "Turm": "tower", "Hotel": "hotel",
    "Brücke": "bridge", "Park": "park", "Markt": "market", "Bahnhof": "train station",
    "Hafen": "harbor, port", "See": "lake (der See); sea (die See)", "Fluss": "river",
    "Meer": "sea, ocean", "Station": "station", "Ort": "place, location, town",
    "Meter": "meter", "Kilometer": "kilometer", "Kosten": "costs, expenses",
    "Flugzeug": "airplane", "Fahrkarte": "ticket (for transport)", "Weg": "way, path, route",
    "Mitte": "middle, center", "Plan": "plan, map, schedule", "Start": "start",
    "Ziel": "goal, destination, target", "Euro": "Euro", "Event": "event",
    "Festival": "festival", "Ticket": "ticket (for event)", "Publikum": "audience, public",
    "Besucher": "visitor (male)", "Besucherin": "visitor (female)", "Gast": "guest",
    "Konzert": "concert", "Orchester": "orchestra", "Chor": "choir",
    "Konzertkarte": "concert ticket", "Film": "film, movie", "Schauspieler": "actor",
    "Schauspielerin": "actress", "Star": "star (celebrity)",
    "Regisseur": "director (film/theatre, male)", "Regisseurin": "director (film/theatre, female)",
    "Ausstellung": "exhibition", "Jahreszeit": "season (of the year)", "Frühling": "spring",
    "Sommer": "summer", "Herbst": "autumn, fall", "Winter": "winter", "Monat": "month",
    "Januar": "January", "Februar": "February", "März": "March", "April": "April",
    "Mai": "May", "Juni": "June", "Juli": "July", "August": "August",
    "September": "September", "Oktober": "October", "November": "November",
    "Dezember": "December", "Gruppe": "group", "Bild": "picture, image, painting",
    "Plakat": "poster", "Glück": "luck, happiness", "Test": "test", "Welt": "world",
    "Lösung": "solution, answer", "Obst": "fruit (collective)", "Apfel": "apple",
    "Banane": "banana", "Birne": "pear", "Gemüse": "vegetables (collective)",
    "Gurke": "cucumber", "Kartoffel": "potato", "Salat": "salad; lettuce",
    "Tomate": "tomato", "Olive": "olive", "Zwiebel": "onion", "Brot": "bread",
    "Brötchen": "bread roll", "Keks": "cookie, biscuit", "Kuchen": "cake, pie",
    "Fleisch": "meat", "Fisch": "fish", "Schokolade": "chocolate",
    "Marmelade": "jam, marmalade", "Müsli": "muesli, granola", "Getränk": "drink, beverage",
    "Wasser": "water", "Saft": "juice", "Limonade": "lemonade, soda", "Cola": "cola",
    "Kaffee": "coffee", "Tee": "tea", "Bäckerei": "bakery", "Metzgerei": "butcher shop",
    "Supermarkt": "supermarket", "Hähnchen": "chicken (food)", "Packung": "package, pack",
    "Schinken": "ham", "Becher": "cup, beaker, pot (e.g. yogurt pot)", "Wurst": "sausage",
    "Dose": "can, tin", "Würstchen": "small sausage, wiener", "Stück": "piece, bit; play (theatre)",
    "Butter": "butter", "Tüte": "bag (paper/plastic)", "Joghurt": "yogurt",
    "Gramm": "gram", "Käse": "cheese", "Kilo": "kilo, kilogram", "Milch": "milk",
    "Liter": "liter", "Sahne": "cream", "Pfeffer": "pepper (spice)", "Salz": "salt",
    "Zucker": "sugar", "Essig": "vinegar", "Öl": "oil", "Nudel": "noodle, pasta",
    "Reis": "rice", "Ei": "egg", "Einkaufswagen": "shopping cart", "Preis": "price; prize",
    "Kassenzettel": "receipt (from store)", "Essen": "food; meal; act of eating",
    "Frühstück": "breakfast", "Mittagessen": "lunch", "Abendessen": "dinner, supper",
    "Gericht": "dish (food); court (law)", "Suppe": "soup", "Pizza": "pizza",
    "Pommes frites": "french fries", "Morgen": "morning; tomorrow", "Mittag": "midday, noon",
    "Nachmittag": "afternoon", "Abend": "evening", "Nacht": "night",
    "Einladung": "invitation", "Kantine": "canteen, cafeteria",
    // New Vocab from Chapter 5 & 6
    "Nachricht": "message, news", "Uni": "university", "Mensa": "canteen, refectory",
    "Bibliothek": "library", "Musikschule": "music school", "Hausaufgabe": "homework",
    "Zeitung": "newspaper", "Homepage": "homepage", "Stress": "stress",
    "Uhr": "clock, watch, o'clock", "Sekunde": "second", "Minute": "minute", "Stunde": "hour",
    "Verspätung": "delay, lateness", "Familie": "family", "Verwandte": "relative", "Baby": "baby",
    "Kind": "child", "Junge": "boy", "Mädchen": "girl", "Sohn": "son", "Tochter": "daughter",
    "Mutter": "mother", "Eltern": "parents", "Bruder": "brother", "Schwester": "sister",
    "Geschwister": "siblings", "Großmutter": "grandmother", "Großvater": "grandfather",
    "Opa": "grandpa", "Großeltern": "grandparents", "Mann": "man, husband", "Frau": "woman, wife",
    "Zeit": "time", "Party": "party", "Bar": "bar", "Kalender": "calendar", "Besprechung": "meeting",
    "Sport": "sport", "Ball": "ball", "Motorrad": "motorcycle", "Geige": "violin", "Saxofon": "saxophone",
    "Trompete": "trumpet", "Hund": "dog", "Idee": "idea", "Problem": "problem", "Praxis": "practice (doctor's office)",
    "Ausflug": "trip, excursion", "Fahrradtour": "bike tour", "Picknick": "picnic", "Fest": "party, festival",
    "Geburtstag": "birthday", "Geschenk": "gift, present", "Datum": "date", "Überraschung": "surprise",
    "Mail": "email", "Betreff": "subject (of email)", "Anrede": "salutation, form of address",
    "Schorle": "spritzer (juice mixed with sparkling water)", "Eis": "ice, ice cream", "Salami": "salami",
    "Schnitzel": "schnitzel", "Tomatensuppe": "tomato soup", "Sandwich": "sandwich",
    "Durst": "thirst", "Hunger": "hunger", "Speisekarte": "menu", "Bestellung": "order",
    "Rechnung": "bill, invoice", "Trinkgeld": "tip, gratuity", "Gabel": "fork", "Messer": "knife",
    "Löffel": "spoon", "Glas": "glass", "Tasse": "cup", "Teller": "plate", "Serviette": "napkin",
    "Kneipe": "pub, bar", "Kaffeehaus": "coffee house", "Biergarten": "beer garden", "Bank": "bench",
    "Selbstbedienung": "self-service", "Programm": "program", "Treffpunkt": "meeting point",
    "Eintritt": "admission, entry", "Anmeldung": "registration", "Karte": "card, ticket, map",
    "Spielplatz": "playground"
};

const NOUN_TO_EMOJI = {
    "Mensch": "🧑", "Haus": "🏠", "Rathaus": "🏛️", "Konzerthaus": "🎶", "Kirche": "⛪",
    "Fahrrad": "🚲", "Bus": "🚌", "Straßenbahn": "🚋", "Zug": "🚂", "U-Bahn": "🚇",
    "S-Bahn": "🚆", "Schiff": "🚢", "Turm": "🗼", "Hotel": "🏨", "Brücke": "🌉",
    "Park": "🏞️", "Markt": "🛒", "Bahnhof": "🚉", "Hafen": "⚓", "See": "🌊",
    "Fluss": "🏞️", "Meer": "🌊", "Station": "🚉", "Ort": "📍",
    "Meter": "📏", "Kilometer": "🛣️",
    "Kosten": "💰", "Flugzeug": "✈️", "Fahrkarte": "🎟️", "Weg": "🛣️",
    "Mitte": "🎯", "Plan": "🗺️", "Start": "🏁", "Ziel": "🎯", "Euro": "💶",
    "Event": "🎉", "Festival": "🎉", "Ticket": "🎟️",
    "Publikum": "👥", "Besucher": "🚶", "Besucherin": "🚶‍♀️", "Gast": "👋",
    "Konzert": "🎵", "Orchester": "🎻", "Chor": "🎤", "Konzertkarte": "🎟️",
    "Film": "🎬", "Schauspieler": "🎭", "Schauspielerin": "🎭", "Star": "🌟",
    "Regisseur": "🎬", "Regisseurin": "🎬", "Ausstellung": "🖼️",
    "Jahreszeit": "📅", "Frühling": "🌸", "Sommer": "☀️", "Herbst": "🍂", "Winter": "❄️",
    "Monat": "📅", "Januar": "❄️", "Februar": "⛄", "März": "🌷", "April": "🌧️",
    "Mai": "🌼", "Juni": "☀️", "Juli": "🏖️", "August": "🌞",
    "September": "🍁", "Oktober": "🎃", "November": "🌬️", "Dezember": "🎄",
    "Gruppe": "👥", "Bild": "🖼️", "Plakat": "📰", "Glück": "🍀", "Test": "📝",
    "Welt": "🌍", "Lösung": "💡",
    "Obst": "🍓", "Apfel": "🍎", "Banane": "🍌", "Birne": "🍐",
    "Gemüse": "🥕", "Gurke": "🥒", "Kartoffel": "🥔", "Salat": "🥗",
    "Tomate": "🍅", "Olive": "🫒", "Zwiebel": "🧅",
    "Brot": "🍞", "Brötchen": "🥖", "Keks": "🍪", "Kuchen": "🍰",
    "Fleisch": "🥩", "Fisch": "🐟", "Schokolade": "🍫", "Marmelade": "🍓",
    "Müsli": "🥣", "Getränk": "🥤", "Wasser": "💧", "Saft": "🧃",
    "Limonade": "🥤", "Cola": "🥤", "Kaffee": "☕", "Tee": "🍵",
    "Bäckerei": "🥐", "Metzgerei": "🍖", "Supermarkt": "🏪",
    "Hähnchen": "🍗", "Packung": "📦", "Schinken": "🥓", "Becher": "🥛",
    "Wurst": "🌭", "Dose": "🥫", "Würstchen": "🌭", "Stück": "🧩",
    "Butter": "🧈", "Tüte": "🛍️", "Joghurt": "🍦",
    "Gramm": "⚖️", "Käse": "🧀", "Kilo": "⚖️", "Milch": "🥛", "Liter": "💧",
    "Sahne": "🍦",
    "Pfeffer": "🌶️", "Salz": "🧂", "Zucker": "🍬", "Essig": "🍾", "Öl": "🫒",
    "Nudel": "🍜", "Reis": "🍚", "Ei": "🥚",
    "Einkaufswagen": "🛒", "Preis": "💲", "Kassenzettel": "🧾",
    "Essen": "🍽️", "Frühstück": "🥞", "Mittagessen": "🥪", "Abendessen": "🍝",
    "Gericht": "🍲", "Suppe": "🥣", "Pizza": "🍕", "Pommes frites": "🍟",
    "Morgen": "🌅", "Mittag": "☀️", "Nachmittag": "🌇", "Abend": "🌃", "Nacht": "🌙",
    "Einladung": "✉️", "Kantine": "🍽️",
    // New Emojis from Chapter 5 & 6
    "Nachricht": "💬", "Uni": "🎓", "Mensa": "🍽️", "Bibliothek": "📚", "Musikschule": "🎼",
    "Hausaufgabe": "✍️", "Zeitung": "📰", "Homepage": "🌐", "Stress": "🤯",
    "Uhr": "⏰", "Sekunde": "⏱️", "Minute": "⏱️", "Stunde": "⏳", "Verspätung": "🏃‍♂️💨",
    "Familie": "👨‍👩‍👧‍👦", "Verwandte": "👨‍👩‍👧‍👦", "Baby": "👶", "Kind": "🧒", "Junge": "👦",
    "Mädchen": "👧", "Sohn": "👦", "Tochter": "👧", "Mutter": "👩", "Eltern": "👨‍👩‍👧",
    "Bruder": "👨‍👦", "Schwester": "👩‍👧", "Geschwister": "👧👦", "Großmutter": "👵", "Großvater": "👴",
    "Opa": "👴", "Großeltern": "👵👴", "Mann": "👨", "Frau": "👩",
    "Zeit": "⏳", "Party": "🎉", "Bar": "🍸", "Kalender": "📅", "Besprechung": "🗣️",
    "Sport": "⚽", "Ball": "⚽", "Motorrad": "🏍️", "Geige": "🎻", "Saxofon": "🎷",
    "Trompete": "🎺", "Hund": "🐕", "Idee": "💡", "Problem": "🤔", "Praxis": "⚕️",
    "Ausflug": "🏞️", "Fahrradtour": "🚴‍♀️", "Picknick": "🧺", "Fest": "🥳", "Geburtstag": "🎂",
    "Geschenk": "🎁", "Datum": "🗓️", "Überraschung": "😮", "Mail": "📧", "Betreff": "ር",
    "Anrede": "👋", "Schorle": "🥤", "Eis": "🍦", "Salami": "🍕",
    "Schnitzel": "🍖", "Tomatensuppe": "🥣", "Sandwich": "🥪", "Durst": "💧", "Hunger": "😋",
    "Speisekarte": "📜", "Bestellung": "🛍️", "Rechnung": "🧾", "Trinkgeld": "💰",
    "Gabel": "🍴", "Messer": "🔪", "Löffel": "🥄", "Glas": "🥛", "Tasse": "☕",
    "Teller": "🍽️", "Serviette": "🧻", "Kneipe": "🍻", "Kaffeehaus": "☕", "Biergarten": "🍺🌳",
    "Bank": "🏦", "Selbstbedienung": "🙋‍♂️", "Programm": "💻", "Treffpunkt": "📍",
    "Eintritt": "🎟️", "Anmeldung": "📝", "Karte": "🃏", "Spielplatz": "🎠"
};


function parseOcrToFlashcards(text) {
    const flashcards = [];
    const lines = text.split('\n');
    const articleRegex = /^(der|die|das|der\/das)\s+([A-ZÖÄÜ][a-zA-Zöäüß]+.*?)(?:,\s*(.*?))?$/;
    const noCommaPluralRegex = /^(der|die|das|der\/das)\s+([A-ZÖÄÜ][a-zA-Zöäüß]+)\s+\((PL\.|Sg\.)\)/;

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        let article, nounPartWithDetails, pluralPartRaw;
        let match = trimmedLine.match(articleRegex);

        if (match) {
            article = match[1];
            nounPartWithDetails = match[2].trim(); // This is the part after the article, up to the comma
            pluralPartRaw = match[3] ? match[3].trim() : null;
        } else {
            match = trimmedLine.match(noCommaPluralRegex);
            if (match) {
                article = match[1];
                // Reconstruct nounPartWithDetails to include the (Sg.) or (Pl.) tag for consistency
                nounPartWithDetails = `${match[2].trim()} (${match[3]})`;
                pluralPartRaw = null; // Plural info is now part of nounPartWithDetails
            } else {
                continue; // Not a noun line we can parse in either format
            }
        }

        // Clean noun_base: remove (Sg.), (Pl.), (g), (kg), (l) from the end
        let nounBase = nounPartWithDetails.replace(/\s*\((Sg\.|Pl\.|g|kg|l|PL\.)\)$/, '').trim();
        // Second pass if the tag was not at the very end but part of nounPartWithDetails from noCommaPluralRegex
        nounBase = nounBase.replace(/\s*\((Sg\.|Pl\.|PL\.)\)$/, '').trim();


        let pluralDisplayText = "";
        if (pluralPartRaw === null) { // No comma, plural info might be in nounPartWithDetails
            if (nounPartWithDetails.includes("(Sg.)")) pluralDisplayText = "(Singular only)";
            else if (nounPartWithDetails.includes("(Pl.)") || nounPartWithDetails.includes("(PL.)")) {
                pluralDisplayText = "(Plural only)";
            } else pluralDisplayText = "-"; // Default if no info
        } else { // Plural info came after a comma
            pluralDisplayText = pluralPartRaw;
            if (pluralDisplayText === "=") pluralDisplayText = "¨e"; // For Markt
        }

        // Handle OCR quote for umlaut
        if (pluralDisplayText && pluralDisplayText.startsWith('"')) {
            pluralDisplayText = "¨" + pluralDisplayText.substring(1);
        }
        // Specific OCR artifact corrections based on previous Python logic
        if (nounBase === "Haus" && pluralDisplayText === "er") pluralDisplayText = "¨er";
        else if (nounBase === "Rathaus" && pluralDisplayText === "er") pluralDisplayText = "¨er";
        else if (nounBase === "Konzerthaus" && pluralDisplayText === "er") pluralDisplayText = "¨er";
        else if (nounBase === "Fahrrad" && pluralDisplayText === "er") pluralDisplayText = "¨er"; // Note: OCR was "er", not ""er"
        else if (nounBase === "Apfel" && pluralDisplayText === "¨") pluralDisplayText = "¨"; // OCR "
        else if (nounBase === "Nacht" && pluralDisplayText === "e") pluralDisplayText = "¨e"; // OCR "e
        

        // Basic validation
        if (!nounBase || nounBase.toLowerCase() === nounBase || nounBase.split(' ').length > 3) continue;
        if (nounBase.includes('(') && !nounBase.includes(')')) continue; // Unclosed parenthesis
        if (nounBase.includes('...') || nounBase.includes('?')) continue; // Likely not a noun

        let fullInfoGerman = `${article} ${nounBase}`;
        if (pluralDisplayText && pluralDisplayText !== "(Singular only)" && pluralDisplayText !== "(Plural only)" && pluralDisplayText !== "-") {
            fullInfoGerman += `, Pl: ${pluralDisplayText}`;
        } else if (pluralDisplayText && (pluralDisplayText === "(Singular only)" || pluralDisplayText === "(Plural only)")) {
            fullInfoGerman += ` ${pluralDisplayText}`;
        } else if (pluralDisplayText === "-") {
             // Optionally add ", Pl: -" or just leave it if "-" means no change / not specified often
        }
        
        const englishMeaning = GERMAN_TO_ENGLISH[nounBase] || "Meaning not available";
        const emoji = NOUN_TO_EMOJI[nounBase] || "";

        flashcards.push({
            id: nounBase, // Use nounBase as a unique ID for the card
            front_display: nounPartWithDetails, 
            noun_base_for_lookup: nounBase,
            article: article,
            plural_form_raw: pluralDisplayText, // This will be used to construct the display plural
            full_info_german: fullInfoGerman,
            english_meaning: englishMeaning,
            emoji: emoji
        });
    }

    // Remove duplicates based on 'id' (noun_base_for_lookup)
    const uniqueFlashcards = [];
    const seenIds = new Set();
    for (const card of flashcards) {
        if (!seenIds.has(card.id)) {
            uniqueFlashcards.push(card);
            seenIds.add(card.id);
        }
    }
    // console.log("Parsed Flashcards:", uniqueFlashcards); // For debugging
    return uniqueFlashcards;
}

// This function will be called by script.js to get the processed flashcard data
function getFlashcardData() {
    return parseOcrToFlashcards(ocr_text);
}
