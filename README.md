# Justify-API
This project is a RESTful API built with TypeScript for text justification. The API includes token-based authentication, rate-limiting, and error-handling mechanisms.

# Getting Started 
1. Clone the repository:
    - git clone https://github.com/ruchi-dhami/justify-api.git
    - cd justify-api
2. Install dependencies:
    -  npm install 
4. Starting the node server 
   - npm start

# API Endpoints
1. POST /api/token
 -- **Generates a token for the user based on their email.**

   **Request Body:`{ "email": "user@example.com" } `**

   **Response : `{"token": "cfd2795a8814792fd8a3b0715595e742"}`**

2. POST /api/justify
    -- **Justifies the input text to 80 characters per line.**
    - Headers:

        `Authorization: Bearer <token>`

        `Content-Type: text/plain`

  **Request Body: Raw text to be justified.**

  **Response: Justified text with lines exactly 80 characters long.**

  # Error Responses:
- If error occur, each endpoint return an error response in the following format:

   ` { "code": "ERROR_CODE", "message": "Descriptive error message" }`


# Rate Limiting
The API includes a daily word limit per token (default is 80,000 words). If exceeded, a 402 Payment Required error is returned.

# Live API Endpoint

The Justify-API is deployed on render.com and available for public use. You can test the API endpoints by sending requests to the following base URL:

** Base URL ** : `https://justify-api-915u.onrender.com/`

### Example Requests

#### 1. **Generate Token**

- **Endpoint**: `/api/token` (POST)
- **Request Body**:
  ```
  {
    "email": "user@example.com"
  }
- **Response Body**:
    ```
    {
       "token": "cfd2795a8814792fd8a3b0715595e742"
    }

#### 2. Justify Text

- **Headers**:

        `Authorization: Bearer <token>
        `Content-Type: text/plain`    

- **Endpoint**: `/api/justify` (POST)
- **Request Body**:
    ```
    Raw text to be justified.

- **Response Body**:
    ```
    Justified text with lines exactly 80 characters long.