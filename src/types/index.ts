export interface User {
  id: string | number,
  name: string,
  username: string,
  email: string,
  [propName: string]: any
}

export interface Reactions {
  thumbsUp: number,
  wow: number,
  heart: number,
  rocket: number,
  coffee: number
}

export interface Post {
  id: string | number,
  title: string,
  body: string,
  userId: string | number,
  date?: string,
  reactions?: Reactions
}

export interface FormMessage {
  message: string
}
