# AI API Test Hub

AI API Test Hub is a comprehensive application designed for testing and verifying connectivity with various AI model APIs. It provides a simple interface to test API connections, execute manual testing, and access API code snippets for integration.

## Features

- **Universal AI API Testing**: Test connections to multiple AI providers including OpenAI, Google, Anthropic, and DeepSeek
- **Model Discovery**: Browse through models organized by company with detailed information
- **Connection Verification**: Quickly verify API key validity and connectivity
- **Manual Testing**: Send custom prompts to test model responses
- **Code Snippets**: Access ready-to-use code examples for API integration in multiple languages
- **Responsive Design**: Clean, modern UI that works across devices

## Project Structure

The project is organized into two main directories:

- `frontend/`: React-based user interface
- `backend/`: Node.js/Express API server

## Tech Stack

### Frontend
- React
- React Router
- Syntax Highlighter
- Modern CSS (with variables and flexbox/grid)

### Backend
- Node.js
- Express
- Axios (for API requests)

## Setup and Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd ai-api-tester/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with your configuration:
   ```
   PORT=5000
   NODE_ENV=development
   ```

4. Start the server:
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd ai-api-tester/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```
   npm start
   ```

## Usage

### Home Page
- Browse available AI companies and models
- Search for specific models by name

### Company Page
- View all models available from a specific company
- Models are grouped by category (chat, image, etc.)

### Model Page
- View detailed information about a specific model
- Test API connection with your API key
- Try manual testing with custom prompts
- Access code snippets for integration

## API Endpoints

### Model Endpoints
- `GET /api/companies`: Get all companies with basic model info
- `GET /api/companies/:companyId`: Get detailed info for a specific company
- `GET /api/models`: Get all models (simplified info)
- `GET /api/models/:modelId`: Get detailed info for a specific model

### Test Endpoints
- `POST /api/test/connection`: Test API connection
  - Request body: `{ modelId, apiKey }`
- `POST /api/test/manual`: Send a manual test request
  - Request body: `{ modelId, apiKey, prompt }`

## Adding New Models

The system is designed to be easily extensible. To add new models:

1. Update the `models.json` file in the `backend/data` directory
2. Add appropriate connector logic to `apiConnectors.js` if it's a new provider

## Security Notes

- API keys are never stored on the server
- API keys are only used for the duration of the request
- All communication with AI provider APIs happens through the backend to avoid exposing API keys to the client

## Future Enhancements

- Add authentication to save favorite models
- Implement history of test results
- Add support for more AI providers
- Create a comparison tool for different models
- Add batch testing capabilities

## License

This project is licensed under the MIT License - see the LICENSE file for details.