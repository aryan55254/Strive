```
 ███████╗████████╗██████╗ ██╗██╗   ██╗███████╗
 ██╔════╝╚══██╔══╝██╔══██╗██║██║   ██║██╔════╝
 ███████╗   ██║   ██████╔╝██║██║   ██║█████╗
 ╚════██║   ██║   ██╔══██╗██║╚██╗ ██╔╝██╔══╝
 ███████║   ██║   ██║  ██║██║ ╚████╔╝ ███████╗
 ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚══════╝
```

Strive is an AI-powered fitness platform that generates personalized workout and diet plans tailored to your specific goals, fitness level, and preferences. Built with React, Node.js, and powered by Google's Gemini AI.

## Features

- AI-generated personalized workout plans
- Custom diet plans based on your goals and preferences
- Exercise library with detailed instructions
- Progress tracking and plan management
- Secure user authentication
- Responsive design for all devices

## Tech Stack

### Frontend

- React
- TailwindCSS
- React Router
- Axios

### Backend

- Node.js
- Express
- MongoDB
- Google Gemini AI
- JWT Authentication

## Local Development Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Google Gemini API Key

### Backend Setup

1. Clone the repository

```sh
git clone https://github.com/aryan55254/Strive.git
cd Strive/server
```

2. Install dependencies

```sh
npm install
```

3. Create a `.env` file in the server directory with the following variables:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

4. Start the server

```sh
npm run dev
```

### Frontend Setup

1. Navigate to the client directory

```sh
cd ../client
```

2. Install dependencies

```sh
npm install
```

3. Create a `.env` file in the client directory:

```
VITE_API_URL=http://localhost:8000
```

4. Start the development server

```sh
npm run dev
```

The application should now be running at `http://localhost:5173`

## Environment Variables

### Backend

- `PORT`: Server port number
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `GEMINI_API_KEY`: Google Gemini API key
- `NODE_ENV`: Application environment (development/production)

### Frontend

- `VITE_API_URL`: Backend API URL

## API Routes

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: User login
- `POST /api/auth/logout`: User logout

### Plans

- `POST /api/generate/diet`: Generate AI diet plan
- `POST /api/generate/workout`: Generate AI workout plan
- `GET /api/plans/saved_diets`: Get user's saved diet plans
- `GET /api/plans/saved_workouts`: Get user's saved workout plans

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Live Demo

Visit [Strive](https://strive-chi.vercel.app) to see the live application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For support, email [contact@example.com](mailto:contact@example.com) or create an issue in the repository.
