import config from "./config"

import ManageUserTasks from "./classes/ManageUserTasks"

const userTasks = new ManageUserTasks(process.env.TRELLO_USERID)

userTasks.getUserIncompletedTasks()
