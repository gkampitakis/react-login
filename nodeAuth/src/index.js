import express from 'express';
import Router from './router';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import cors from 'cors';
import bluebird from 'bluebird';

const app = express();
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(cors());
mongoose
  .connect('mongodb://localhost:27017/mochaTest', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.info('Connected to db');
    mongoose.Promise = bluebird;
  });

mongoose.connection.on('error', err => {
  console.error('Could not connect to db');
  process.exit(-1);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(Router);

app.listen('2000', () => {
  console.log('Listening on 2000');
});

export default app;
