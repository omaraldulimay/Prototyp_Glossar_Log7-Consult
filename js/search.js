// ===== Glossar-Daten mit Synonymen/Abkürzungen =====
const glossary = [
    { term: "Supply Chain Management", url: "scm.html", aliases: ["SCM"] },
    { term: "Just in Time", url: "jit.html", aliases: ["JIT"] },
    { term: "Cloud Computing", url: "cloud.html", aliases: ["Cloud"] },
    { term: "Big Data", url: "bigdata.html", aliases: ["BigData"] },
    { term: "SEO", url: "seo.html", aliases: ["Suchmaschinenoptimierung"] }
];

// ===== Suchfunktion =====
document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault(); // verhindert Neuladen der Seite
    const input = document.getElementById("searchInput").value.trim().toLowerCase();
    const resultsDiv = document.getElementById("searchResults");
    resultsDiv.innerHTML = ""; // vorherige Ergebnisse löschen

    if (input === "") {
        resultsDiv.innerHTML = "<p>Bitte einen Suchbegriff eingeben.</p>";
        return;
    }

    // Filter Glossar-Begriffe nach Eingabe oder Synonym
    const results = glossary.filter(entry => {
        const termMatch = entry.term.toLowerCase().includes(input);
        const aliasMatch = entry.aliases.some(alias => alias.toLowerCase().includes(input));
        return termMatch || aliasMatch;
    });

    if (results.length > 0) {
        const ul = document.createElement("ul");
        results.forEach(entry => {
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.href = entry.url;
            link.textContent = entry.term;
            li.appendChild(link);
            ul.appendChild(li);
        });
        resultsDiv.appendChild(ul);
    } else {
        resultsDiv.innerHTML = "<p>Keine Treffer gefunden.</p>";
    }
});

// ===== Formular zum Hinzufügen =====
document.getElementById("addForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const term = document.getElementById("newTerm").value.trim();
    const url = document.getElementById("newUrl").value.trim();
    const aliases = document.getElementById("newAliases").value
        .split(",")
        .map(a => a.trim())
        .filter(a => a !== "");

    if (term === "" || url === "") {
        document.getElementById("addResult").textContent = "Begriff und URL sind erforderlich.";
        return;
    }

    // Neuen Begriff zum Glossar hinzufügen
    glossary.push({ term, url, aliases });

    document.getElementById("addResult").textContent = `Begriff "${term}" erfolgreich hinzugefügt!`;

    // Formular zurücksetzen
    document.getElementById("addForm").reset();
});

