import { makeExecutableSchema } from '@graphql-tools/schema'

import userModule  from './user/index.js'
import orderModule from "./order/index.js";

export const schema = makeExecutableSchema({
    typeDefs: [
        userModule.typeDefs,
        orderModule.typeDefs
    ],
    resolvers: [
        userModule.resolvers,
        orderModule.resolvers
    ]
})