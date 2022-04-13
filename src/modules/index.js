import { makeExecutableSchema } from '@graphql-tools/schema'

import userModule from './user/index.js'

export const schema = makeExecutableSchema({
    typeDefs: [
        userModule.typeDefs,
    ],
    resolvers: [
        userModule.resolvers
    ]
})