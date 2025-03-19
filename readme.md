# Japanese NLP Platform

This project is a platform for translating and sentiment analysis of Japanese texts using AI. It features a front-end built with React + TypeScript and a back-end developed with NestJS + TypeScript, incorporating JWT authentication and an SQLite database.

## Technologies Used
- **Front-end:** React + TypeScript + TailwindCSS
- **Back-end:** NestJS + TypeScript
- **Database:** SQLite with Prisma
- **Authentication:** JWT with Passport.js
- **NLP:** Google Gemini API

## Project Structure
```
.
├── backend/   # API built with NestJS
├── frontend/  # React application
├── database/  # SQLite configuration
├── .env       # Environment variables
├── .gitignore # Git ignore file
└── README.md  # Project documentation
```

## Setup and Installation

### 1. Clone the Repository
```sh
git clone https://github.com/Raphaelfm/japanese-nlp-platform.git
cd japanese-nlp-platform
```

### 2. Backend Setup
```sh
cd backend
npm install
```

Create a `.env` file and configure:
```
PORT=3001
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

Run database migrations:
```sh
npx prisma migrate dev
```

Start the API:
```sh
npm run start
```

### 3. Frontend Setup
```sh
cd ../frontend
npm install
```

Run the project:
```sh
npm run dev
```

## API Endpoints

### Authentication
- **POST /auth/register** → Registers a new user
- **POST /auth/login** → Logs in and returns a JWT token

### Translation and Sentiment Analysis
- **POST /text-analysis** → Translates and analyzes sentiment of the text
- **GET /translations** → Retrieves all user translations
- **DELETE /translations/:id** → Deletes a specific translation

## Contact
If you have any questions or suggestions, feel free to open an issue or a pull request! 🚀

