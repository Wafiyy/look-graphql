export default {
    Query: {
        orders: (parent, { userId }, { read }) => {
            const orders = read("orders")
            return  userId ? orders.filter(order => +order.userId === +userId) : orders
        },
    },

    Mutation: {
        addOrder: (_, {userId,foodId,count}, {read,write}) => {
            const users = read("users")
            const user = users.find(user => user.userId === userId)
            if(!user){
                return {
                    status:400,
                    message:"Invalid userId",
                    data: null
                }
            }

            const foods = read("foods")
            const food = foods.find(food => food.foodId === foodId)

            if(!food){
                return {
                    status:400,
                    message:"Invalid foodId",
                    data: null
                }
            }

            if(count < 1 || count >10){
                return {
                    status:400,
                    message:"count must be less than 10 and more than 0",
                    data: null
                }
            }
            const orders = read("orders")

            const newOrder = {
                orderId: orders.length ? +orders.at(-1).orderId + 1 : 1,
                userId,
                foodId,
                count
            }
            orders.push(newOrder)
            write("orders",orders)

            return {
                status:200,
                message: "The order added",
                data: newOrder
            }
        }
    },

    Order: {
        user: (parent,_,{read}) =>{
            const users = read("users")
            return users.find(user => user.userId === parent.userId)
        },
        food: (parent,_,{read}) => {
            const foods = read("foods")
            return foods.find( food => food.foodId === parent.foodId)
        }
    }
}