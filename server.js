import { ApolloServer } from 'apollo-server'
import {
    ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core"

import { schema } from './schema.js'
import { resolvers } from './reslover.js'

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})