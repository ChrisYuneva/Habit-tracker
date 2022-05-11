import {Injectable} from "@angular/core";
import {Habit, HABIT_TYPE} from "../models/habit.model";
import {BehaviorSubject} from "rxjs";

// Observable - мы можем на него подписаться и всё
// Subject - observable + положить туда что то

@Injectable({
  providedIn: "root"
})

export class BackendService {
  public habits: Habit[] = JSON.parse(localStorage.getItem('Habit') || '[]');
  //   {
  //     id: 1,
  //     name: "Бегать по утрам",
  //     type: HABIT_TYPE.GOOD,
  //     difficulty: 5
  //   },
  //   {
  //     id: 2,
  //     name: "Пить 2л воды в день",
  //     type: HABIT_TYPE.GOOD,
  //     difficulty: 2
  //   }
  // ];
  public habits$: BehaviorSubject<Habit[]> = new BehaviorSubject<Habit[]>(this.habits);

  getHabits(): BehaviorSubject<Habit[]> {
    return this.habits$;
  }

  addHabit(habit: Habit) {
    if (this.habits.length === 0) {
      habit.id = 1;
    } else {
      habit.id = this.habits[this.habits.length - 1].id + 1;
    }
    this.habits.push(habit);
    this.setHabit();
    this.habits$.next(this.habits);
  }

  updateHabit(habit: Habit) {
    const updatedHabit = this.habits.find(h => h.id === habit.id);
    updatedHabit!.name = habit.name;
    updatedHabit!.type = habit.type;
    updatedHabit!.difficulty = habit.difficulty;
    this.setHabit();
    this.habits$.next(this.habits);
  }

  deleteHabit(id: number) {
    this.habits = this.habits.filter(habit => habit.id !== id);
    this.setHabit();
    this.habits$.next(this.habits);
  }

  setHabit(): void {
    localStorage.setItem('Habit', JSON.stringify(this.habits));
  }
}
