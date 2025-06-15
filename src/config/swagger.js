// src/config/swagger.js

const path = require('path');
const fs = require('fs');
const yaml = require('yaml');

// Correct path to swagger.yml
const swaggerPath = path.resolve(__dirname, '../../docs/swagger.yml');

const file = fs.readFileSync(swaggerPath, 'utf8');
const swaggerDocument = yaml.parse(file);

module.exports = swaggerDocument;
