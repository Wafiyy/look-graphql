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
            if (!user) {
                return {
                    status: 400,
                    message: "Invalid userId",
                    data: null
                }
            }

            const foods = read("foods")
            const food = foods.find(food => food.foodId === foodId)

            if (!food) {
                return {
                    status: 400,
                    message: "Invalid foodId",
                    data: null
                }
            }

            if (count < 1 || count > 10) {
                return {
                    status: 400,
                    message: "count must be less than 10 and more than 0",
                    data: null
                }
            }
            const orders = read("orders")

            const order = orders.find(order => order.userId == userId && order.foodId == foodId)

            if(order){
                order.count += +count
                write("orders", orders)
                return {
                    status: 200,
                    message: "The order added",
                    data: order
                }
            }
            else {
                const newOrder = {
                    orderId: orders.length ? +orders.at(-1).orderId + 1 : 1,
                    userId,
                    foodId,
                    count
                }
                orders.push(newOrder)
                write("orders", orders)

                return {
                    status: 200,
                    message: "The order added",
                    data: newOrder
                }
            }
        },
        changeOrder: (_,{orderId, userId, foodId,count}, {read, write} ) => {
            const orders = read('orders')

            const order = orders.find(order => +order.orderId === +orderId)

            if(!order){
                return {
                    status: 400,
                    message: "Invalid orderId",
                    data: null
                }
            }

            if(userId) {
                const users = read("users")
                const user = users.find(user => user.userId === userId)
                if (!user) {
                    return {
                        status: 400,
                        message: "Invalid userId",
                        data: null
                    }
                }
            }

            if(foodId) {
                const foods = read("foods")
                const food = foods.find(food => food.foodId === foodId)

                if (!food) {
                    return {
                        status: 400,
                        message: "Invalid foodId",
                        data: null
                    }
                }
            }

            if (count && ( count < 1 || count > 10)) {
                return {
                    status: 400,
                    message: "count must be less than 10 and more than 0",
                    data: null
                }
            }

            order.userId = userId ? userId : order.userId
            order.foodId = foodId ? foodId : order.foodId
            order.count =  count  ? count  : order.count

            return {
                status: 200,
                message: "Ok",
                data: order
            }

        },
        deleteOrder(_, {orderId},{read,write}){
            const orders = read('orders')

            const index = orders.findIndex(order => +order.orderId === +orderId)
            if(index===-1){
                return {
                    status: 400,
                    message: "Order not found",
                    data: null
                }
            }
            const order = orders.splice(index,1)
            write("orders",orders)
            return {
                status: 202,
                message: 'The user deleted!',
                data: order[0]
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