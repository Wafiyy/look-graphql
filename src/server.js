import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server'
import { schema } from './modules/index.js'
import model from './utils/model.js'

const server = new ApolloServer({
    context: ({ req, res }) => model,
    schema,
    introspection: true,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

server.listen(process.env.PORT ?? 4000).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})