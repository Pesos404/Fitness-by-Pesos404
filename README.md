# Bilanz als PWA

Dateien: index.html, manifest.webmanifest, sw.js, icon-192.png, icon-512.png

## Hosting (kostenlos, HTTPS nötig – sonst funktioniert die Kamera nicht)

**Netlify Drop (am schnellsten):** app.netlify.com/drop öffnen, den entpackten Ordner hineinziehen, fertig.

**GitHub Pages:** neues Repository anlegen, alle Dateien hochladen, unter Settings > Pages den Branch main auswählen.

## Auf dem iPhone installieren
Seite in Safari öffnen > Teilen > „Zum Home-Bildschirm“. Beim ersten Scan Kamera erlauben.

## Hinweise
- Daten liegen lokal im Browser. Sichere sie regelmäßig über „Daten“ in der App.
- Gescannte Produkte werden gespeichert und sind danach offline verfügbar.
- Open Food Facts: Browser dürfen keinen eigenen User-Agent senden. Für den Eigengebrauch ist das üblich, prüfe aber die aktuelle API-Doku und nenne Open Food Facts als Quelle (steht in der App).
- Neue Version hochladen? In sw.js `bilanz-v1` hochzählen, damit Geräte die Dateien neu laden.
