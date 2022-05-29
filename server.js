/**
 * third party libraries
 */
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const helmet = require('helmet');
const http = require('http');

/**
 * server configuration
 */
const auth = require('./src/api/policies/auth.policy');
const dbService = require('./src/api/services/db.service');
const { schema } = require('./src/api/graphql');

// environment: development, testing, production
const environment = process.env.NODE_ENV || 'development';

/**
 * express application
 */
const api = express();
const server = http.Server(api);
// const DB = dbService(environment, true).start();

// allow cross origin requests
// configure to allow only requests from certain origins
api.use(cors());

// secure express app
// api.use(helmet({
//     dnsPrefetchControl: false,
//     frameguard: false,
//     ieNoOpen: false,
// }));

// parsing the request bodys
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

(async () => {

    const graphQLServer = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res })
    });

    await graphQLServer.start();

    graphQLServer.applyMiddleware({
        app: api,
        cors: {
            origin: true,
            credentials: true,
            methods: ['POST'],
            allowedHeaders: [
                'X-Requested-With',
                'X-HTTP-Method-Override',
                'Content-Type',
                'Accept',
                'Authorization',
                'Access-Control-Allow-Origin',
            ],
        },
        playground: {
            settings: {
                'editor.theme': 'light',
            },
        },
    });
})()

const PORT = 4200
server.listen(PORT, () => {
    if (environment !== 'production'
        && environment !== 'development'
    ) {
        console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
        process.exit(1);
    }

    console.log(`Server is now running on PORT: ${PORT}`)

    // return DB;
});
