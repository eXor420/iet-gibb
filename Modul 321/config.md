## Microservices Konfiguration

### Globale Umgebungsvariablen
Diese Variablen gelten für alle Services:

| Variable         | Beschreibung                                                       | Beispielwert             |
|------------------|--------------------------------------------------------------------|--------------------------|
| `INTERNAL_HOST` | Hostname, der für interne Kommunikation der Services verwendet wird | `http://auth-service:3001` |
| `EXTERNAL_HOST` | Öffentlicher Hostname für externe Zugriffe                         | `https://api.example.com` |
| `ENV`           | Umgebungsname (z. B. dev, staging, production)                     | `dev`                    |

### Auth-Service Konfiguration

| Variable       | Beschreibung                                       | Beispielwert            |
|----------------|----------------------------------------------------|-------------------------|
| `PORT`         | Port, auf dem der Service läuft                    | `3001`                  |
| `SECRET`       | JWT- oder andere Secret-Schlüssel für Authentifizierung | `supersecretkey123`     |
| `DB_HOST`      | Adresse der MongoDB-Datenbank                     | `auth-db`               |
| `DB_PORT`      | Port der Datenbank                                 | `27017`                 |
| `RABBITMQ_URL` | Verbindung zur RabbitMQ-Instanz                    | `amqp://user:password@rabbitmq:5672/` |
| `TOKEN_EXPIRY` | Dauer der Gültigkeit eines JWT-Tokens             | `3600` (Sekunden)       |

### User-Service Konfiguration

| Variable       | Beschreibung                                       | Beispielwert            |
|----------------|----------------------------------------------------|-------------------------|
| `PORT`         | Port, auf dem der Service läuft                    | `3002`                  |
| `DB_HOST`      | Adresse der MongoDB-Datenbank                     | `user-db`               |
| `DB_PORT`      | Port der Datenbank                                 | `27017`                 |
| `RABBITMQ_URL` | Verbindung zur RabbitMQ-Instanz                    | `amqp://user:password@rabbitmq:5672/` |

### Frontend Konfiguration

| Variable       | Beschreibung                                       | Beispielwert            |
|----------------|----------------------------------------------------|-------------------------|
| `API_BASE_URL` | Basis-URL für API-Aufrufe                          | `http://localhost:3001` |
| `ENV`          | Umgebung (z. B. dev, prod)                         | `dev`                   |

### RabbitMQ Konfiguration (bereits im Compose definiert)

- Benutzername: `user`
- Passwort: `password`
- Management-Konsole: erreichbar unter Port `15672`
- AMQP Port: `5672`

#### Health- und Readiness-Checks für RabbitMQ

RabbitMQ wird über einen integrierten Healthcheck geprüft, um sicherzustellen, dass es verfügbar und bereit zur Kommunikation ist. Dieser Check wird wie folgt durchgeführt:

```yaml
healthcheck:
  test: rabbitmq-diagnostics -q ping
  interval: 5s
  timeout: 5s
  retries: 5
```

- `test`: Der Befehl `rabbitmq-diagnostics -q ping` prüft, ob der Broker reagiert.
- `interval`: Der Test wird alle 5 Sekunden durchgeführt.
- `timeout`: Der Test schlägt fehl, wenn nach 5 Sekunden keine Antwort erfolgt.
- `retries`: Nach 5 Fehlversuchen wird der Container als „unhealthy“ markiert.

Andere Services wie der `auth-service` und `user-service` warten mit `depends_on` auf einen erfolgreichen Healthcheck von RabbitMQ, bevor sie gestartet werden.

### Volumes

| Volume-Name    | Verwendungszweck                 |
|----------------|----------------------------------|
| `auth_data`    | Datenbankdaten des Auth-Service  |
| `user_data`    | Datenbankdaten des User-Service  |
| `rabbitmq_data`| Persistente RabbitMQ-Daten       |

Diese Konfigurationen lassen sich über `.env`-Dateien, Docker Compose `environment`-Sektionen oder durch direkte Übergabe beim Start setzen.

