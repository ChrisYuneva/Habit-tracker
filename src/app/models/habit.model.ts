export enum HABIT_TYPE {
  GOOD,
  BAD
}

export interface Habit {
  id: number;
  name: string;
  difficulty: number;
  type: HABIT_TYPE
}
