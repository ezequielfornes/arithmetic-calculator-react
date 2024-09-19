# Frontend Setup and Installation

This is the frontend for the Arithmetic Calculator API.

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/your-frontend-repo.git
    cd your-frontend-repo
    ```

2. **Environment Variables**

    Create a `.env` file in the root directory of the frontend project with the following:

    ```bash
    REACT_APP_BACKEND_URL=http://localhost:8080
    ```

    This points the frontend to the backend running locally. Update the URL if the backend is deployed to a cloud platform.

3. **Install Dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

4. **Running the Frontend**

    To start the development server:

    ```bash
    npm start
    # or
    yarn start
    ```

    The frontend will be running at `http://localhost:3000`.

5. **Building for Production**

    To build the project for production:

    ```bash
    npm run build
    # or
    yarn build
    ```

    This will create an optimized production build in the `build` folder.

6. **Docker Setup (Optional)**

    To run the frontend in Docker, create a `Dockerfile` and `docker-compose.yml`:

    **Dockerfile**

    ```dockerfile
    FROM node:18

    WORKDIR /app
    COPY . .

    RUN npm install
    RUN npm run build

    EXPOSE 3000
    CMD ["npx", "serve", "-s", "build"]
    ```

    **docker-compose.yml**

    ```yaml
    version: "3"
    services:
      frontend:
        build: .
        ports:
          - "3000:3000"
        environment:
          - REACT_APP_BACKEND_URL=http://your-backend-url
    ```

    Run with Docker:

    ```bash
    docker-compose up --build
    ```

7. **Connecting to the Backend**

    Make sure that the `REACT_APP_BACKEND_URL` in your `.env` file matches the actual backend URL. If running both frontend and backend locally, the default would be `http://localhost:8080`.

8. **Testing**

    Run the tests using:

    ```bash
    npm test
    # or
    yarn test
    ```
