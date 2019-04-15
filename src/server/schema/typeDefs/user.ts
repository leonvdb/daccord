export const typeDef = `
type User{
      id: ID!
      email: String!
      password: String
      registered: Boolean!
      polls: [Poll!]
}

type AuthUser {
      isParticipant: Boolean!
      token: String
      user: User
      pseudonym: String
}
`