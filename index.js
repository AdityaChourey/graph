import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import mongoose from 'mongoose'
import { typeDefs } from './schema.js'
import {
  addTaskMutation,
  deleteTaskMutation,
  editTaskMutation,
  getAllTasks,
  getAllUsers,
  getUser,
  loginMutation,
  registerMutation,
} from './reolvers.js'

mongoose
  .connect(
    'mongodb+srv://aditya123:Rocklee123@rocklee.x5re41t.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('mongoDb connected'))
  .catch((e) => console.log(e))

const resolvers = {
  Query: {
    users: getAllUsers,
    user: getUser,
    tasks: getAllTasks,
  },
  Mutation: {
    registerUser: registerMutation,
    loginUser: loginMutation,
    addTask: addTaskMutation,
    deleteTask: deleteTaskMutation,
    editTask: editTaskMutation,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT },
})

console.log('server ready at', 4000)
