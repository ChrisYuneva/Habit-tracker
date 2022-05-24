import {Injectable} from "@angular/core";
import {Habit} from "../models/habit.model";
import {User} from "../models/user.model";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

// Observable - мы можем на него подписаться и всё
// Subject - observable + положить туда что то

@Injectable({
  providedIn: "root"
})

export class BackendService {

  nullUser: boolean = false;
  keep: boolean = false;

  constructor(private router: Router) {
  }

  public habits: Habit[] = JSON.parse(localStorage.getItem('Habit') || '[]');
  public users: User[] = JSON.parse(localStorage.getItem('Users') || '[]');
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
    if (!!userEntry) {
      this.router.navigate(['/habits']);
      this.nullUser = false;
    } else {
      this.nullUser = true;
    }
  }

  addUser(user: User): void {
    if (this.users.find(u => u.login === user.login)) {
      this.keep = true;
    } else {
      this.keep = false;
      this.users.push(user);
      this.setUser();
      this.router.navigate(['/authorization']);
    }
  }

  setUser(): void {
    localStorage.setItem('Users', JSON.stringify(this.users));
  }
}
