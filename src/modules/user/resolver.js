export default {
    Query: {
        users: (_, { userId }, { read }) => {
            return read('users').filter(user => userId ? user.userId == userId : true)
        }
    },

    Mutation: {
        addUser: (_, { username, contact }, { read, write }) => {
            const users = read('users')

            username = username.trim()
            contact = contact.trim()
            if(!username || username > 30 || username < 3){
                return {
                    status: 400,
                    message: "Invalid username!",
                    data: null
                }
            }
            if((/^998[389][012345789][0-9]{7}$/).test(contact)){
                return {
                    status: 400,
                    message: "Invalid contact!",
                    data: null
                }
            }

            const newUser = {
                userId: users.length ? +users.at(-1).userId + 1 : 1,
                username, contact
            }

            users.push(newUser)
            write('users', users)

            return {
                status: 201,
                message: 'The user created!',
                data: newUser
            }
        },

        changeUser: (_,{userId, username, contact}, {read, write} ) => {

        },

        deleteUser(_, {userId},{read,write}){
            const users = read('users')

            const index = users.findIndex(user => user.userId === userId)
            console.log(index)
            if(index==-1){
                return {
                    status: 400,
                    message: "User not found",
                    data: null
                }
            }
            const user = users.splice(index,1)
            write("users",users)
            return {
                status: 202,
                message: 'The user deleted!',
                data: user[0]
            }
        }
    }
}