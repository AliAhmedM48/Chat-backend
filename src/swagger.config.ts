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
        servers: [{ url: 'http://localhost:3000/api/v1' }],
    },
    apis: ['./src/routes/user.ts'],
};

export default swaggerOptions;