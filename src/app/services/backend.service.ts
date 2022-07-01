import {Injectable} from "@angular/core";
import {Habit, HABIT_TYPE} from "../models/habit.model";
import {User} from "../models/user.model";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
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

  public habits: Record<string, Habit[]> = JSON.parse(localStorage.getItem('Habit') || '{}');
  public users: User[] = JSON.parse(localStorage.getItem('Users') || '[]');
  public habits$: BehaviorSubject<Record<string, Habit[]>> = new BehaviorSubject<Record<string, Habit[]>>(this.habits);
  public localLogin: string = localStorage.getItem('Login');

  getHabitsByLogin(): Observable<Habit[]> {
    return this.habits$.pipe(
      map((habits: Record<string, Habit[]>) => habits[this.localLogin])
    );
  }

  addHabit(habit: Habit) {
    const habitsOfCurrentUser: Habit[] = this.habits[this.localLogin];
    if (habitsOfCurrentUser.length === 0) {
      habit.id = 1;
    } else {
      habit.id = habitsOfCurrentUser[habitsOfCurrentUser.length - 1].id + 1;
    }
    habitsOfCurrentUser.push(habit);
    this.habits[this.localLogin] = habitsOfCurrentUser;
    this.setHabit();
    this.habits$.next(this.habits);
  }

  updateHabit(habit: Habit) {
    const updatedHabit = this.habits[this.localLogin].find(h => h.id === habit.id);
    updatedHabit!.name = habit.name;
    updatedHabit!.type = habit.type;
    updatedHabit!.difficulty = habit.difficulty;
    this.setHabit();
    this.habits$.next(this.habits);
  }

  deleteHabit(id: number) {
    let habitsOfCurrentUser: Habit[] = this.habits[this.localLogin];
    habitsOfCurrentUser = habitsOfCurrentUser.filter(habit => habit.id !== id);
    this.habits[this.localLogin] = habitsOfCurrentUser;
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
      user.experience = 0;
      user.health = 50;
      user.level = 1;
      user.allExperience = 0;
      this.users.push(user);
      this.setUser();
      this.habits[user.login] = [];
      this.habits$.next(this.habits);
      this.setHabit();
      this.router.navigate(['/authorization']);
    }
  }

  setUser(): void {
    localStorage.setItem('Users', JSON.stringify(this.users));
  }

  setLogin(login: string): void {
    localStorage.setItem('Login', (login));
    this.localLogin = localStorage.getItem('Login');
  }
}
