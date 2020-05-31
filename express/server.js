'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
//routes
const CourseRoutes = require('./routes/course')
const DocumentRoutes = require('./routes/document')
const ExerciseRoutes = require('./routes/exercise')
const SeasonRoutes = require('./routes/season')

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({route: req.originalUrl}));
router.post('/', (req, res) => res.json({postBody: req.body}));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

//check db connection
mongoose.connect("mongodb+srv://root:pass@cluster0-i0azz.gcp.mongodb.net/test?retryWrites=true&w=majority/myNewDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => console.log('  yeah you win ! ' + (err ? err : '')));

app.use('/documents', DocumentRoutes)

module.exports = app;

module.exports.handler = serverless(app);
