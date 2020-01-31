const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
  password: { type: String, required: true, select: false }, // select: false 避免暴露 password
  avatar_url: { type: String },
  gender: { type: String, enum: ['male', 'female'], default: 'male', required: true },
  headline: { type: String },
  locations: { type: [{ type: String }], select: false }, // todo
  business: { type: String, select: false }, // todo
  employments: {
    type: [{
      company: { type: String }, // todo
      job: { type: String }, // todo
    }],
    select: false,
  },
  educations: {
    type: [{
      school: { type: String },
      major: { type: String },
      diploma: { type: Number, enum: [1, 2, 3, 4, 5] },
      entrance_year: { type: Number },
      graduation_year: { type: Number },
    }],
    select: false,
  },
  following: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }], // 与名字为 User 的 Schema 相关联
    select: false,
  },
});

module.exports = model(
  'User', // 集合名称
  userSchema, // Schema
);
