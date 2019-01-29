export const typeDef = `
type User{
      id: ID!
      email: String!
      password: String
      registered: Boolean!
      polls: [Poll!]
}
`