[![Prod](https://img.shields.io/badge/Prod-deployed-green)](https://host.xserver.space)
[![Angular](https://img.shields.io/badge/Angular-cf0027)](https://angular.dev/)
[![Express](https://img.shields.io/badge/Express%20js-f2dc2a)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-345cec)](https://www.docker.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-54a444)](https://www.mongodb.com/)

# xServer :fire:
![Logo](frontend/src/assets/images/xServer_Logo_white.png)

## Commits
Always use a matching gitmoji at the beginning of commit messages. If you don't know which gitmoji to use get the Intellij plugin or consult [gitmoji.dev](https://gitmoji.dev/).


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Docker installed on your machine.

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://git.gibb.ch/mda133769/xserver.git
   ```

2. Navigate to the project directory:

   ```bash
   cd xServer
   ```

3. Build and run the Docker containers using Docker Compose:

   ```bash
   docker-compose up --build -d
   ```
   
   Or pull and run the Docker containers using Docker Compose:
   ```bash
   docker-compose up --pull always -d
   ```
   
   Or just use the local images and run the Docker containers using Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. Access the frontend in your web browser at `http://localhost:6969`.
   Access the backend in your web browser at `http://localhost:6970`.
   Access the frontend in your web browser at `localhost:27017`.

## Code Documentation

In der Entwicklung mit Express und Angular ist es wichtig, schwer verständlichen Code durch aussagekräftige Kommentare zu erläutern, da keine Java-Dokumentationstools wie Javadoc verwendet werden können. Kommentare sollten den Zweck und die Funktionsweise komplexer Codeabschnitte erklären, die verwendeten Algorithmen beschreiben und besondere Randbedingungen nennen. Zum Beispiel kann ein Kommentar in einem Express-Controller erklären, wie eine Benutzeranmeldung verarbeitet wird, während in einer Angular-Komponente die Logik innerhalb von Methoden oder die Funktionsweise von Lifecycle-Hooks erläutert wird. Dies verbessert die Lesbarkeit und Wartbarkeit des Codes erheblich.


## CI/CD

This chapter outlines the structure of the GitLab CI/CD pipeline for both frontend and backend components. The pipeline orchestrates the build and deployment processes for each component and includes a notification mechanism for reporting the status of pipeline executions to a Discord channel.

### Defined Stages

The pipeline is segmented into distinct stages for clarity and control over the execution flow:

- `notify: 
- `frontend-build-image`: Builds the lastest Docker image of the Angular frontend.
- `frontend-build-image-release`: Builds the lastest Docker image of the Angular frontend. Version based on the Tag. If `prod` is in the Tag name then a Prod-Image will be built.
- `backend-build-image`: Builds the lastest Docker image of the Express JS backend.
- `backend-build-image-release`: Builds the lastest Docker image of the Express JS backend. Version based on the Tag.
- `notify`: Handles the dispatch of status notifications through Discord.

### Notification Mechanism

#### Success Notification

Dispatches a success alert to a specified Discord channel upon successful pipeline completion.

#### Failure Notification

Sends a failure alert to a specified Discord channel when the pipeline encounters an error.

# Deployment-Praxis

Unsere Deployment-Praxis basiert auf einer automatisierten Pipeline, die Images erstellt und bereitstellt. Der Prozess ist in folgende Schritte unterteilt:

## Image-Build und Speicherung

### Master-Branch Commits
Bei jedem neuen Commit auf dem `master`-Branch wird automatisch ein neues Docker-Image erstellt:
- Das Image wird als `:latest` getaggt.
- Es wird in der öffentlichen GitLab Docker Registry gespeichert.

### Tags
- Wenn ein Tag erstellt wird, wird ein Docker-Image mit dem Namen des Tags als Version erstellt und in der Registry gespeichert.
- Falls ein Tag "prod" im Namen enthält, wird zusätzlich ein `prod`-Image erstellt und gespeichert.

## Kubernetes Deployment
Nach dem erfolgreichen Build und der Speicherung des Images wird ein Deployment im Cluster ausgelöst:
- Ein `curl`-Befehl in der Pipeline ruft die `deployment-executor` App im Cluster auf.
- Die `deployment-executor` App ist ein einfaches Perl-Skript, das die neuen Kubernetes-Ressourcen pullt und auf der Produktionsumgebung anwendet.

## Hinweise zur Architektur
- Die `deployment-executor` App ist ein Perl-Skript, das folgende Aufgaben übernimmt:
  1. Pull der neuesten Kubernetes-Ressourcen.
  2. Anwenden der Ressourcen auf der Produktionsumgebung (`kubectl apply`).

- Durch diesen Mechanismus bleibt die Produktionsumgebung stets aktuell mit den neuesten Änderungen aus dem `master`-Branch oder den spezifischen Tags.

## Vorteile
- **Automatisierung**: Reduziert manuelle Arbeit durch automatische Erstellung, Speicherung und Anwendung.
- **Konsistenz**: Sicherstellt, dass die Produktionsumgebung mit den korrekten Ressourcen synchronisiert ist.
- **Flexibilität**: Ermöglicht unterschiedliche Deployments basierend auf Branch oder Tag.

# Paketierung der Anwendung

Unsere Anwendung wird in einzelne Docker-Images verpackt, um eine einheitliche und skalierbare Bereitstellung zu ermöglichen. Hier sind die Details zur Paketierung:

## Verwendung des MongoDB Images
- Wir verwenden das offizielle MongoDB-Docker-Image in einer spezifischen Version.
- Änderungen an der Version müssen manuell vorgenommen werden, um Kompatibilität sicherzustellen.

## Komponenten-Build
- Sowohl das Frontend als auch das Backend werden als separate Docker-Images verpackt.

### Backend-Build
- Das Backend verwendet eine `.env`-Datei, um die Umgebung festzulegen. Unterstützte Umgebungen sind:
  - `local`
  - `test`
  - `prod`
- Beim Backend-Build wird immer ein normaler Node.js-Build durchgeführt. Dieser Prozess ist unabhängig von der Zielumgebung identisch.
- Das Image enthält alle notwendigen Abhängigkeiten und den Build-Output der Anwendung.

### Frontend-Build
- Das Frontend verwendet die Angular-Umgebungsvariablen, um die Backend-URLs für die jeweilige Umgebung festzulegen.
- Es wird immer ein Angular-Prod-Build ausgeführt, um die Stabilität der Anwendung sicherzustellen.
- Das Image enthält den kompilierten Frontend-Code, bereit für die Ausführung in einer Produktionsumgebung.

## Schritt-für-Schritt Ablauf

### Backend-Build
```bash
# .env Datei bereitstellen
cp .env.prod .env

# Docker-Image für das Backend erstellen
docker build -t registry.gitlab.com/your_project/backend:latest ./backend
```

### Frontend-Build
```bash
# Angular-Prod-Build ausführen
ng build --prod

# Docker-Image für das Frontend erstellen
docker build -t registry.gitlab.com/your_project/frontend:latest ./frontend
```

# Analysieren der Abhängigkeiten der Komponenten in Bezug auf den Auslieferungsprozess

## Analyse der Abhängigkeiten

Die Abhängigkeiten zwischen den Software-Komponenten in unserem Auslieferungsprozess sind minimal, da die Docker-Images unabhängig voneinander erstellt und bereitgestellt werden können. Dadurch ergibt sich eine hohe Flexibilität im Auslieferungsprozess. Dennoch gibt es einige wichtige Aspekte, die berücksichtigt werden müssen:

### MongoDB-Image
- Das verwendete MongoDB-Docker-Image ist nicht direkt von den anderen Komponenten abhängig.
- **Wichtig:** Vor einem Update der MongoDB-Version muss die neue Version gründlich getestet werden, um potenzielle Inkompatibilitäten mit dem Backend auszuschließen.

### Backend und Frontend
- Das Backend und das Frontend sind funktional voneinander abhängig, da sie miteinander kommunizieren.
- Beide Komponenten sollten stets in derselben Version bereitgestellt werden, um mögliche Inkompatibilitäten (z. B. API-Änderungen) zu vermeiden.

### Unabhängigkeit der Builds
- Die Builds der einzelnen Komponenten (Frontend, Backend, MongoDB) erfolgen unabhängig voneinander.
- Es gibt keine feste Reihenfolge, in der die Builds durchgeführt werden müssen.

## Potenzielle Probleme bei der Integration oder Auslieferung
1. **MongoDB-Version**:
   - Ein Update der MongoDB-Version könnte unerwartete Fehler im Backend verursachen, wenn neue Funktionen oder Änderungen nicht kompatibel sind.
2. **Versionsmismatch zwischen Frontend und Backend**:
   - Unterschiedliche Versionen können zu API-Inkompatibilitäten führen, wodurch die Funktionalität beeinträchtigt wird.

## Strategien zur Minimierung von Abhängigkeitsproblemen
1. **Testen von MongoDB-Updates:**
   - Vor der Erhöhung der MongoDB-Version sollte diese gründlich getestet werden, insbesondere im Zusammenspiel mit dem Backend.

2. **Synchronisierte Versionen für Frontend und Backend:**
   - Sicherstellen, dass Frontend und Backend immer in derselben Version erstellt und bereitgestellt werden.
   - Bei Versionsupdates sollten alle Änderungen in beiden Komponenten überprüft werden, um Kompatibilität zu gewährleisten.

3. **Unabhängige Bereitstellung:**
   - Da die Images unabhängig voneinander sind, können sie flexibel bereitgestellt werden, solange die oben genannten Strategien eingehalten werden.
