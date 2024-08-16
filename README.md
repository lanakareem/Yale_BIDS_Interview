# Yale_BIDS_Interview
 
 ## Overview

This project will consist of creating two server applications. The first is a Python-based API server that returns details about publications available remotely. The second is a Vue/React-based frontend server that interacts with the backend server to display the results of API calls.


## Prerequisites
Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- Python3 installed
- pip for Python package management

## Installation
Follow these steps to set up the project:

1. Clone the Repository

    git clone https://github.com/lanakareem/Yale_BIDS_Interview.git
    
    cd Yale_BIDS_Interview/project

2. Set Up the Backend

    1) Navigate to the backend directory

        cd backend

    2) Create a Virtual Environment

        python -m venv venv

    3) Activate the Virtual Environment:

        Windows: venv\Scripts\activate
        macOS/Linux: source venv/bin/activate

    4) Install Python Dependencies:

        pip install -r requirements.txt

    5) Run the backend server:

        python3 app.py

3. Set Up the Frontend (React)

    1) Navigate to the Frontend directory and into my-app

        cd frontend
        cd my-app

    2) Install node.js dependencies:

        npm install

    3) Start the React Development Server:

        npm start



## Server Functionalities:
### Backend (Python)
The backend server is responsible for handling API requests and serving data to the frontend. It includes the following functionalities:
- Search Publications:
    - Endpoint: /api/publications
    - Method: POST
    - Request Body: { "query": "search-term" }
    - Response: Returns a list of publication IDs based on the search term.
- Fetch Publication Details:
    - Endpoint: /api/publications/details
    - Method: GET
    - Query Parameters: ids (comma-separated list of publication IDs), page (page number for pagination)
    - Response: Returns detailed information about the specified publications, including title, abstract, authors, journal, and publication year.

### Frontend (React)
The frontend server provides the user interface for interacting with the backend. It includes the following functionalities:

- Search Form: 
    - Allows users to enter a search term and submit it to the backend.
    - Displays search results in a paginated format.

- Results Display:
    - Component: Results
    - Displays a list of publication cards, each showing the title, abstract, authors, journal, and publication year.
    - Each card includes a link to view the publication on PubMed.

- Pagination:
    - Component: Pagination
    - Allows users to navigate between pages of search results.

- Publication Details: 
    - Component: PublicationDetails
    - Shows detailed information about a selected publication.

## Usage
- Frontend: The React application should now be running on http://localhost:3000.
- Backend: The Python backend server should be running on http://localhost:5000.


## Environment Variables
Create a .env file in the root directory of your project to specify environment variables.

### .env File
Create a .env file with the following content in the backend directory:

    SECRET_KEY=my_key

    - SECRET_KEY: A secret key used for cryptographic operations. Replace my_key with your own unique secret key.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).