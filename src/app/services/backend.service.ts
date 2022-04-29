import {Injectable} from "@angular/core";
import {Habit, HABIT_TYPE} from "../models/habit.model";
import {BehaviorSubject, Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

// Observable - мы можем на него подписаться и всё
// Subject - observable + положить туда что то

@Injectable({
  providedIn: "root"
})

export class BackendService {
  public habits: Habit[] = [
    {
      id: 1,
      name: "Бегать по утрам",
      type: HABIT_TYPE.GOOD,
      difficulty: 2
    },
    {
      id: 2,
      name: "Пить 2л воды в день",
      type: HABIT_TYPE.GOOD,
      difficulty: 2
    }
  ];

  public adding = false;
  public editing = false;
  public editingIndex: number = 0;

  public habitForm = new FormGroup({
    id: new FormControl(this.habits.length + 1),
    name: new FormControl(''),
    type: new FormControl(HABIT_TYPE.GOOD),
    difficulty: new FormControl(1)
  });

  public habits$: BehaviorSubject<Habit[]> = new BehaviorSubject<Habit[]>(this.habits);

  getHabits(): BehaviorSubject<Habit[]> {
    return this.habits$;
  }

  addHabit(habit: Habit) {
    habit.id = this.habits[this.habits.length - 1].id + 1;
    this.habits.push(habit);
    this.habits$.next(this.habits);
  }

  updateHabit(id: number) {
    this.habitForm.patchValue({
      name: this.habits[id].name,
      type: this.habits[id].type,
      difficulty: this.habits[id].difficulty,
    });
    this.editing = true;
    this.editingIndex = id;
    }

  deleteHabit(id: number) {
    this.habits = this.habits.filter(habit => habit.id !== id);
    this.habits$.next(this.habits);
  }


}
