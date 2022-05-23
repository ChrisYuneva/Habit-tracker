import {Injectable} from "@angular/core";
import {Habit, HABIT_TYPE} from "../models/habit.model";
import {User} from "../models/user.model";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

// Observable - мы можем на него подписаться и всё
// Subject - observable + положить туда что то

@Injectable({
  providedIn: "root"
})

export class BackendService {

  constructor(private router: Router) {
  }

  public habits: Habit[] = JSON.parse(localStorage.getItem('Habit') || '[]');
  public users: User[] = [
    {
      login: 'test',
      password: 'Qazwsxedc_01022'
    },
    {
      login: 'root',
      password: 'Qazwsxedc_01022'
    }
  ]
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
  public users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);

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

  entrance(user: User): void {
    let userEntry = this.users.find((u => u.login === user.login && u.password === user.password));
    if(!!userEntry) {
      this.router.navigate(['/habits']);
    }
    else {
      console.log('hgjkl')
    }
    // this.users$.next(this.users)
  }
}
