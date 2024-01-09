import mongoose from 'mongoose'

export const User = mongoose.model('User', {
  username: String,
  password: String,
})

export const Task = mongoose.model('Task', {
  value: String,
})
