const { createUser, readAllUser, readOneUser, updateUser, deleteUser } = require('../controllers/user')



const userRouter = require('express').Router()


userRouter.post(`/`, createUser)
userRouter.get(`/`, readAllUser)
userRouter.get(`/:id`, readOneUser)
userRouter.patch(`/:id`, updateUser)
userRouter.delete(`/:id`, deleteUser)


module.exports = userRouter