const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
  password: { type: String, required: true, select: false }, // select: false 避免暴露 password
});

module.exports = model(
  'User', // 集合名称
  userSchema, // Schema
);
