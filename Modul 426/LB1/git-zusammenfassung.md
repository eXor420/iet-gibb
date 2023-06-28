# Git CLI Cheat Sheet

## Konfiguration

- `git config --global user.name "[Dein Name]"` - Setzt deinen Benutzernamen für alle Git-Repositories.
- `git config --global user.email "[Deine E-Mail-Adresse]"` - Setzt deine E-Mail-Adresse für alle Git-Repositories.

## Erste Schritte

- `git init` - Initialisiert ein neues Git-Repository im aktuellen Verzeichnis.
- `git clone [Repository-URL]` - Klonen ein Remote-Repository auf deinen lokalen Computer.

## Änderungen verfolgen

- `git status` - Zeigt den aktuellen Status des Repositories an.
- `git add [Dateiname]` - Fügt eine Datei zur Staging-Area hinzu.
- `git add .` - Fügt alle Dateien zur Staging-Area hinzu.
- `git commit -m "[Commit-Nachricht]"` - Erstellt einen neuen Commit mit den Änderungen aus der Staging-Area.
- `git log` - Zeigt eine Liste aller Commits an.

## Branches

- `git branch` - Zeigt eine Liste der Branches im Repository an.
- `git branch [Branch-Name]` - Erstellt einen neuen Branch.
- `git checkout [Branch-Name]` - Wechselt zu einem anderen Branch.
- `git merge [Branch-Name]` - Mergt die Änderungen eines anderen Branches in den aktuellen Branch.

## Remote-Repositories

- `git remote add origin [Repository-URL]` - Fügt ein Remote-Repository hinzu.
- `git push -u origin [Branch-Name]` - Pushed den aktuellen Branch zu einem Remote-Repository.
- `git pull origin [Branch-Name]` - Aktualisiert den aktuellen Branch mit den Änderungen aus dem Remote-Repository.

## Sonstige

- `git diff` - Zeigt die Änderungen zwischen dem Arbeitsverzeichnis und dem letzten Commit an.
- `git reset [Dateiname]` - Entfernt eine Datei aus der Staging-Area.
- `git reset --hard [Commit-ID]` - Setzt das Repository auf einen bestimmten Commit zurück.
