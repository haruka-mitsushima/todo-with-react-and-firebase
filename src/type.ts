export type State = { auth: { isAuth: boolean }, task: { tasks: [] } }

export type Tasks = Array<Task>

export type Task = {
  id: string
  task: string
  detail: string
  userId: string
  tags: string[]
}
