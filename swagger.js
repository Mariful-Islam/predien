const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Next.js API',
    description: 'Automatically generated swagger docs',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  // You can add some basic global schemas or tags here if you want
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/pages/api/hello.ts']; // Add all your API files here

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated without manual comments.');
});
