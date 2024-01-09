export const typeDefs = `
  type User {
    id: ID
    username: String
  }
  type Task {
    id:ID
    value:String
  }
  type Query {
    dummyQuery: String
    users:[User]
    tasks:[Task]
    task(id:ID!):Task!   
    user(id:ID!):User!
  }
  type Mutation {
    registerUser(input: RegisterInput!): User!
    loginUser(input:LoginInput!) : User!
    addTask(value:String!) : [Task]
    deleteTask(id:String!) : [Task]
    editTask(id:String!,value:String!) : [Task]
  }
  input RegisterInput {
    username: String!
    password: String!
  }
  input LoginInput {
    username: String!
    password: String!
  }
`
