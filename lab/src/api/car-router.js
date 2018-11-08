'use strict';

import express from 'express';
const router = new express.Router();

import Car from './car.js';
import error from '../middleware/error.js';

const models = {
  cars: Car
};

let sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

router.get('/api/v1/:model/:id', (req, res, next) => {
  const model = models[req.params.model];

  model
    .findById(req.params.id)
    .then(data => sendJSON(res, data))
    .catch(next);
});

router.post('/api/v1/:model', (req, res, next) => {
  const model = models[req.params.model];
  let record = new model(req.body);
  record
    .save()
    .then(data => sendJSON(res, data))
    .catch(next);
});

router.put('/api/v1/:model/:id', (req, res, next) => {
  if (req.params.id) {
    const model = models[req.params.model];
    model
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(data => {
        sendJSON(res, data);
      })
      .catch(next);
  }
});

router.delete('/api/v1/:model/:id', (req, res) => {
  if (req.params.id) {
    const model = models[req.params.model];
    model.findByIdAndRemove(req.params.id).then(success => {
      let data = { id: req.params.id, deleted: success };
      sendJSON(res, data);
    });
  }
});

export default router;
