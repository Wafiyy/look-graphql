export default {
    Query: {
        foods: (_, { foodId }, { read }) => {
            return read('foods').filter(food => foodId ? food.foodId == foodId : true)
        }
    },

    Mutation: {
        addFood: (_, { foodName, foodImg }, { read, write }) => {
            const foods = read('foods')

            const newFood = {
                foodId: +foods.at(-1).foodId + 1 || 1,
                foodName, foodImg
            }

            if (foods.find(food => food.foodName === foodName)) {
                return {
                    status: 400,
                    message: 'This foodName is already exist!',
                }
            }

            foods.push(newFood)
            write('foods', foods)

            return {
                status: 201,
                message: 'The food added!',
                data: newFood
            }
        },

        deleteFood: (_, { foodId }, { read, write }) => {
            let foods = read('foods')

            const deletedFood = foods.filter(food => +food.foodId === +foodId)

            if (deletedFood.length) {
                foods = foods.filter(food => +food.foodId !== +foodId)
                write('foods', foods) 

                return {
                    status: 201,
                    message: 'The food deleted!',
                    data: deletedFood[0]
                }
            }

            return {
                status: 400,
                message: 'The food not found!',
            }
        },

        changeFood: (_, { foodId, foodName, foodImg }, {read, write}) => {
            let foods = read('foods')

            let editedFood = foods.find(food => food.foodId == foodId)

            if (editedFood) {
                editedFood.foodname = foodName, editedFood.foodImg = foodImg

                write('foods', foods)
                return {
                    status: 200,
                    message: 'The food edited!',
                    data: editedFood
                }
            }

            return {
                status: 400,
                message: 'The food not found!',
            }
        }
        
    }
}