# Qadhiaty - قضيتي
This repository contains the source code for **Qadhiaty** website, a web application to know what to boycott to support Palestine.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)


## Installation

To install and run **Qadhiaty** on your local machine, follow these steps:

1. Clone the repository:

```
git clone https://github.com/Hetari/qadhiaty.git
```

2. Install the dependencies:

```
npm install
```

3. Set up the environment variables:

Create a `.env` file in the `server` directory of the project and add the following lines:

```
DATABASE_HOST
DATABASE_USER
DATABASE_PASSWORD
DATABASE_NAME
```

Replace the values with your own database configuration.

4. Start the backend:

```
cd server
node app.js // or nodemon app.js
```
5. Open the frontend:
```
cd client/src
index.html
```

The backend should now be running on `http://localhost:3000`.

## Configuration

The application requires a `.env` file to store configuration variables. The following variables are required:

- `DATABASE_HOST`: The host address of the database server.
- `DATABASE_USER`: The username for the database connection.
- `DATABASE_PASSWORD`: The password for the database connection.
- `DATABASE_NAME`: The name of the database to use.

Make sure to update these variables with your own database configuration.

## Usage

Once the backend, frontend, and database are up and running, in your web browser, you can write any product's barcode and see the results.

## Contributing

Contributions to **Qadhiaty** are welcome! If you find a bug or have a feature suggestion, please open an issue or submit a pull request. Make sure to follow the existing coding style and conventions.
