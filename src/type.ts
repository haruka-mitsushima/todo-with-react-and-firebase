export type State = { auth: { isAuth: boolean }, task: { tasks: Tasks } }

export type Tasks = Array<Task>

export type Task = {
  id: string
  task: string
  detail: string
  userId: string | undefined
  done: boolean
  deleted: boolean
  tags: string[]
}
