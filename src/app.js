import config from "./config"

import ManageUserTasks from "./classes/ManageUserTasks"
const userId = process.env.TRELLO_USERID


let userTasks = new ManageUserTasks(userId)
userTasks
  .getUserIncompletedTasks()
//   .then(tasks => {
//     console.log(tasks)
//       tasks.map(task => {
//         task.labels = task.labels.map(label => label.name).join(",")
//         userTasks.showCardInfo(task)
//       })
//   })
//   .catch(err => console.log(err))
