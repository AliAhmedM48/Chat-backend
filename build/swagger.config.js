"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Chat app API',
            version: '1.0.0', // Add version here
            description: 'API documentation',
            contact: {
                name: 'Your Name',
            },
        },
        servers: [{ url: 'https://chat-backend-citu.onrender.com/api/v1' }],
    },
    apis: ['./routes/*.js'],
};
exports.default = swaggerOptions;
