const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, default: 0, required: false },
});

module.exports = model(
  'User', // 集合名称
  userSchema, // Schema
);
