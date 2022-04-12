import { readFileSync } from "fs"

const users = JSON.parse(readFileSync("./db/users.json"))
const orders = JSON.parse(readFileSync("./db/orders.json"))
const foods = JSON.parse(readFileSync("./db/foods.json"))

export const resolvers = {
	Query: {
		foods: () => foods,
		users: () => users,
		orders: () => orders
	},
	User: {
		orders: parent => orders.filter(order => order.userId == parent.userId)
	},
	Order: {
		user: parent => users.find(user => user.user_id == parent.user_id),
		food: parent => foods.find( food => food.foodId == parent.foodId)
	}
}