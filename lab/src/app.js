import express from 'express';
import notFound from './middleware/404.js';
import error from './middleware/error.js';
import auth from './auth/router.js';
import carRouter from './api/car-router.js';

const app = express();

/* Start app file. It is NOT complete so add to it what you will */
/* Stretch goal: add the below routes and get them to work 
app.get('/', auth(), (req,res) => {
  res.send('hi from /');
});

app.get('/s', auth('create'), (req,res) => {
  res.send('hi from /s');
});

app.get('/d', auth('delete'), (req,res) => {
  res.send('hi from /d');
});
*/
app.use(express.json());

app.use(auth);
app.use(carRouter);
app.use(notFound);
app.use(error);

let server;

module.exports = {
  app,
  start: port => {
    server = app.listen(port, () => console.log('Listening on port ' + port));
  },
  stop: () => {
    server.close(() => {
      console.log('Server has been stopped');
    });
  }
};
