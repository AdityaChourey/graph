import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { Task, User } from './models.js'

export const registerMutation = async (_, { input }) => {
  const { username, password } = input
  // Check if the username is already taken
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    throw new Error('Username is already taken')
  }

  // Hash the password before saving it to the database
  const hashedPassword = await hashPassword(password)

  // Create a new user
  const newUser = new User({
    username,
    password: hashedPassword,
  })

  // Generate a JWT token
  // const token = generateToken(newUser)

  // Save the user to the database
  await newUser.save()

  // Return the registered user
  return newUser
}

export const loginMutation = async (_, { input }) => {
  const { username, password } = input

  // Find the user by username
  const user = await User.findOne({ username })

  // Check if the user exists
  if (!user) {
    throw new Error('User not found')
  }

  // Compare the entered password with the stored hashed password
  const passwordMatch = await bcrypt.compare(password, user.password)

  // Check if the passwords match
  if (!passwordMatch) {
    throw new Error('Invalid password')
  }

  // Generate a JWT token
  // const token = generateToken(user)
  // Return the authenticated user and the token
  // const mainData = { ...user, token: token }
  // console.log(mainData)

  return user
}

export const addTaskMutation = async (_, { value }) => {
  const task = new Task({
    value,
  })

  await task.save()

  const taskList = Task.find()

  return taskList
}

export const deleteTaskMutation = async (_, { id }) => {
  const deletedTask = await Task.findByIdAndDelete(id)

  if (!deletedTask) {
    throw new Error('Task not found')
  }

  // Retrieve the updated task list after deletion
  const taskList = await Task.find()

  return taskList
}

export const editTaskMutation = async (_, { id, value }) => {
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { value: value }
    // { new: true } // Return the updated document
  )

  if (!updatedTask) {
    throw new Error('Task not found')
  }

  // Retrieve the updated task list after editing
  const taskList = await Task.find()

  return taskList
}

export const getAllUsers = async () => {
  const users = await User.find()
  return users
}

export const getAllTasks = async () => {
  const tasks = await Task.find()
  return tasks
}

export const getUser = async (_, { id }) => {
  const user = await User.findById(id)
  return user
}

const hashPassword = async (password) => {
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}

const generateToken = (user) => {
  const secretKey = 'qwer12345' // Replace with your actual secret key
  const expiresIn = '10h' // Token expiration time

  const payload = {
    userId: user.id,
    username: user.username,
  }

  const token = jwt.sign(payload, secretKey, { expiresIn })
  return token
}
