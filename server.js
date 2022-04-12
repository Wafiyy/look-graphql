import { ApolloServer } from 'apollo-server'
import {
    ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core"

import { schema } from './schema.js'
import { resolvers } from './reslover.js'
const PORT = process.env.PORT|| 5000
const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

server.listen(PORT).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})