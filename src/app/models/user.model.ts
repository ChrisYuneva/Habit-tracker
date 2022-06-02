import {Habit} from "./habit.model";

export interface User {
  login: string,
  password: string,
  habits: Habit[],
}
