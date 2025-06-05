# xServer Backend

## Overview
This is the backend service for the xServer application, built using Express.js.


## Prerequisites
- Node.js
- MongoDB
- Docker (optional)

## Installation
Clone the repository and install the dependencies:

```bash
git clone <repo>
cd backend
npm i
```

Run the app:
```bash
node server.js
```

## Security
The application uses JWT for authentication and bcrypt for password hashing. Ensure to replace the JWT_SECRET with a secure key in a production environment.