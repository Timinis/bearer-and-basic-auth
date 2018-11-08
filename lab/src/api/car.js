'use strict';

import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  model: { type: String, requirede: true },
  brand: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
});

const Car = mongoose.model('Car', carSchema);

export default Car;
